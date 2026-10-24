"use client";

import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

export type ThemeVariant = "circle" | "circle-blur" | "rectangle" | "polygon";

export type ThemeStart =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

type ThemeToggleOptions = {
  variant?: ThemeVariant;
  start?: ThemeStart;
  blur?: boolean;
};

type AnimationResult = {
  name: string;
  css: string;
};

export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
}: ThemeToggleOptions) => {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const updateStyles = useCallback((css: string) => {
    if (typeof document === "undefined") return;

    let styleElement = document.getElementById("theme-transition-styles");

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "theme-transition-styles";
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const changeTheme = useCallback(
    (nextTheme: "light" | "dark") => {
      const animation = createAnimation(variant, start, blur);
      updateStyles(animation.css);

      const applyTheme = () => {
        flushSync(() => {
          setTheme(nextTheme);
        });
      };

      if (
        typeof document === "undefined" ||
        typeof document.startViewTransition !== "function"
      ) {
        setTheme(nextTheme);
        return;
      }

      document.startViewTransition(applyTheme);
    },
    [setTheme, variant, start, blur, updateStyles]
  );

  const toggleTheme = useCallback(() => {
    changeTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [changeTheme, resolvedTheme]);

  const setCrazyLightTheme = useCallback(() => {
    changeTheme("light");
  }, [changeTheme]);

  const setCrazyDarkTheme = useCallback(() => {
    changeTheme("dark");
  }, [changeTheme]);

  return {
    isDark,
    toggleTheme,
    setCrazyLightTheme,
    setCrazyDarkTheme,
  };
};

type ThemeToggleButtonProps = ThemeToggleOptions & {
  className?: string;
};

export const ThemeToggleButton = ({
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
}: ThemeToggleButtonProps) => {
  const { isDark, toggleTheme } = useThemeToggle({
    variant,
    start,
    blur,
  });
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={mounted ? isDark : false}
      className={cn(
        "group flex size-full cursor-pointer items-center justify-center",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <AnimatePresence mode="wait" initial={false}>
          {mounted &&
            (isDark ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Sun
                  className="text-neutral-300 transition-colors group-hover:text-indigo-400"
                  strokeWidth={1.5}
                />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 45, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -45, scale: 0.7 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Moon
                  className="text-neutral-500 transition-colors group-hover:text-orange-400"
                  strokeWidth={1.5}
                />
              </motion.span>
            ))}
        </AnimatePresence>
      </AnimatePresence>
    </button>
  );
};

const getPositionCoords = (
  position: ThemeStart
): { cx: string; cy: string } | undefined => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" };

    case "top-right":
      return { cx: "40", cy: "0" };

    case "bottom-left":
      return { cx: "0", cy: "40" };

    case "bottom-right":
      return { cx: "40", cy: "40" };

    case "top-center":
      return { cx: "20", cy: "0" };

    case "bottom-center":
      return { cx: "20", cy: "40" };

    // For directional positions, deafult to center

    case "bottom-up":

    case "top-down":

    case "left-right":

    case "right-left":
      return { cx: "20", cy: "20" };
  }
};

const generateSVG = (
  variant: ThemeVariant,
  start: ThemeStart
): string | undefined => {
  // circle-blur variant handles center case differently, so check it first

  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`;
    }

    const positionCoords = getPositionCoords(start);

    if (!positionCoords) {
      throw new Error(`Invalid start position: ${start}`);
    }

    const { cx, cy } = positionCoords;

    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === "center") return;

  // Rectangle variant doesn't use SVG masks, so return early

  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);

  if (!positionCoords) {
    throw new Error(`Invalid start position: ${start}`);
  }

  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return "";
};

const getTransformOrigin = (start: ThemeStart): string | undefined => {
  switch (start) {
    case "top-left":
      return "top left";

    case "top-right":
      return "top right";

    case "bottom-left":
      return "bottom left";

    case "bottom-right":
      return "bottom right";

    case "top-center":
      return "top center";

    case "bottom-center":
      return "bottom center";

    case "bottom-up":

    case "top-down":

    case "left-right":

    case "right-left":
      return "center";
  }
};

export const createAnimation = (
  variant: ThemeVariant,
  start: ThemeStart = "center",
  blur = false
): AnimationResult => {
  const svg = generateSVG(variant, start);

  const transformOrigin = getTransformOrigin(start);

  if (variant === "rectangle") {
    const getClipPath = (
      direction: ThemeStart
    ): { from: string; to: string } => {
      switch (direction) {
        case "bottom-up":
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        case "top-down":
          return {
            from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        case "left-right":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        case "right-left":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        case "top-left":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        case "top-right":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        case "bottom-left":
          return {
            from: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        case "bottom-right":
          return {
            from: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };

        default:
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",

            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
      }
    };

    const clipPath = getClipPath(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,

      css: `

       ::view-transition-group(root) {

        animation-duration: 0.7s;

        animation-timing-function: var(--expo-out);

      }

      ::view-transition-new(root) {

        animation-name: reveal-light-${start}${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      ::view-transition-old(root),

      .dark::view-transition-old(root) {

        animation: none;

        z-index: -1;

      }

      .dark::view-transition-new(root) {

        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {

        from {

          clip-path: ${clipPath.from};

          ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: ${clipPath.to};

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {

        from {

          clip-path: ${clipPath.from};

          ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: ${clipPath.to};

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      `,
    };
  }

  if (variant === "circle" && start === "center") {
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,

      css: `

       ::view-transition-group(root) {

        animation-duration: 0.7s;

        animation-timing-function: var(--expo-out);

      }

      ::view-transition-new(root) {

        animation-name: reveal-light${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      ::view-transition-old(root),

      .dark::view-transition-old(root) {

        animation: none;

        z-index: -1;

      }

      .dark::view-transition-new(root) {

        animation-name: reveal-dark${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      @keyframes reveal-dark${blur ? "-blur" : ""} {

        from {

          clip-path: circle(0% at 50% 50%);

          ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: circle(100.0% at 50% 50%);

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      @keyframes reveal-light${blur ? "-blur" : ""} {

        from {

           clip-path: circle(0% at 50% 50%);

           ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: circle(100.0% at 50% 50%);

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      `,
    };
  }

  if (variant === "circle-blur") {
    if (start === "center") {
      return {
        name: `${variant}-${start}`,

        css: `

        ::view-transition-group(root) {

          animation-timing-function: var(--expo-out);

        }

        ::view-transition-new(root) {

          mask: url('${svg}') center / 0 no-repeat;

          mask-origin: content-box;

          animation: scale 1s;

          transform-origin: center;

        }

        ::view-transition-old(root),

        .dark::view-transition-old(root) {

          animation: scale 1s;

          transform-origin: center;

          z-index: -1;

        }

        @keyframes scale {

          to {

            mask-size: 350vmax;

          }

        }

        `,
      };
    }

    return {
      name: `${variant}-${start}`,

      css: `

      ::view-transition-group(root) {

        animation-timing-function: var(--expo-out);

      }

      ::view-transition-new(root) {

        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;

        mask-origin: content-box;

        animation: scale 1s;

        transform-origin: ${transformOrigin};

      }

      ::view-transition-old(root),

      .dark::view-transition-old(root) {

        animation: scale 1s;

        transform-origin: ${transformOrigin};

        z-index: -1;

      }

      @keyframes scale {

        to {

          mask-size: 350vmax;

        }

      }

      `,
    };
  }

  if (variant === "polygon") {
    const getPolygonClipPaths = (
      position: ThemeStart
    ): {
      darkFrom: string;
      darkTo: string;
      lightFrom: string;
      lightTo: string;
    } => {
      switch (position) {
        case "top-left":
          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",

            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",

            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",

            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          };

        case "top-right":
          return {
            darkFrom: "polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)",

            darkTo: "polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)",

            lightFrom: "polygon(-71% 50%, 50% 171%, 50% 171%, -71% 50%)",

            lightTo: "polygon(-71% 50%, 50% 171%, 250% 71%, 150% -71%)",
          };

        default:
          // Default to top-left behavior

          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",

            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",

            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",

            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          };
      }
    };

    const clipPaths = getPolygonClipPaths(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,

      css: `

      ::view-transition-group(root) {

        animation-duration: 0.7s;

        animation-timing-function: var(--expo-out);

      }

      ::view-transition-new(root) {

        animation-name: reveal-light-${start}${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      ::view-transition-old(root),

      .dark::view-transition-old(root) {

        animation: none;

        z-index: -1;

      }

      .dark::view-transition-new(root) {

        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {

        from {

          clip-path: ${clipPaths.darkFrom};

          ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: ${clipPaths.darkTo};

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {

        from {

          clip-path: ${clipPaths.lightFrom};

          ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: ${clipPaths.lightTo};

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      `,
    };
  }

  // Handle circle variants with start positions using clip-path

  if (variant === "circle" && start !== "center") {
    const getClipPathPosition = (position: ThemeStart): string => {
      switch (position) {
        case "top-left":
          return "0% 0%";

        case "top-right":
          return "100% 0%";

        case "bottom-left":
          return "0% 100%";

        case "bottom-right":
          return "100% 100%";

        case "top-center":
          return "50% 0%";

        case "bottom-center":
          return "50% 100%";

        default:
          return "50% 50%";
      }
    };

    const clipPosition = getClipPathPosition(start);

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,

      css: `

       ::view-transition-group(root) {

        animation-duration: 1s;

        animation-timing-function: var(--expo-out);

      }

      ::view-transition-new(root) {

        animation-name: reveal-light-${start}${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      ::view-transition-old(root),

      .dark::view-transition-old(root) {

        animation: none;

        z-index: -1;

      }

      .dark::view-transition-new(root) {

        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};

        ${blur ? "filter: blur(2px);" : ""}

      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {

        from {

          clip-path: circle(0% at ${clipPosition});

          ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: circle(150.0% at ${clipPosition});

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {

        from {

           clip-path: circle(0% at ${clipPosition});

           ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          clip-path: circle(150.0% at ${clipPosition});

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

      `,
    };
  }

  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,

    css: `

      ::view-transition-group(root) {

        animation-timing-function: var(--expo-in);

      }

      ::view-transition-new(root) {

        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;

        mask-origin: content-box;

        animation: scale-${start}${blur ? "-blur" : ""} 1s;

        transform-origin: ${transformOrigin};

        ${blur ? "filter: blur(2px);" : ""}

      }

      ::view-transition-old(root),

      .dark::view-transition-old(root) {

        animation: scale-${start}${blur ? "-blur" : ""} 1s;

        transform-origin: ${transformOrigin};

        z-index: -1;

      }

      @keyframes scale-${start}${blur ? "-blur" : ""} {

        from {

          ${blur ? "filter: blur(8px);" : ""}

        }

        ${blur ? "50% { filter: blur(4px); }" : ""}

        to {

          mask-size: 2000vmax;

          ${blur ? "filter: blur(0px);" : ""}

        }

      }

    `,
  };
};

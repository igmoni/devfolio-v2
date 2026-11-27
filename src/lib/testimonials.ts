export type Testimonial = {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar?: string; // your own photo URL or /public path. Leave out for a generated one
  seed?: string; // change this to get a different generated avatar for the same name
  link?: string; // makes the whole card clickable
};

// Try: notionists, lorelei, adventurer, thumbs, bottts-neutral, fun-emoji
const AVATAR_STYLE = "notionists";

export const getAvatar = (item: Testimonial) =>
  item.avatar ??
  `https://api.dicebear.com/9.x/${AVATAR_STYLE}/png?seed=${encodeURIComponent(
    item.seed ?? item.name
  )}&size=96&backgroundColor=ffffff`;

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Samye Choedon",
    role: "Client · Samye Tibetan Medical Centre",
    text: "Mohan has been very attentive, quick to respond whenever I needed assistance regarding the website he created for Samye Tibetan Medical Centre both during and after the work was completed. It was great working with him.",
  },
  {
    id: 2,
    name: "Raiyan",
    role: "Redditor · r/WebDevJobs",
    text: "Bhai your portfolio design look fabulous man 🤌 I wanna know how do you actually make such websites",
    link: "https://www.reddit.com/r/WebDevJobs/s/Ng9a7hHugk",
  },
  {
    id: 3,
    name: "Aniqa",
    role: "@aniqatc on X",
    text: "really is a sick portfolio!",
    link: "https://x.com/aniqatc/status/2121989858499686706",
  },
  {
    id: 4,
    name: "Hkrene",
    role: "@0Xhkrene on X",
    text: "That's a good one",
    link: "https://x.com/0Xhkrene/status/2122027221837545553",
  },
  {
    id: 5,
    name: "Alejandro",
    role: "@0xA1ejandro on X",
    text: "Love it!",
    link: "https://x.com/0xA1ejandro/status/2122234024123113546",
  },
  {
    id: 6,
    name: "0xSheep",
    role: "@0xsheepdev on X",
    text: "very cool and technological website. learn from you！",
    link: "https://x.com/0xsheepdev/status/2122488836383273435",
  },
  {
    id: 7,
    name: "Sankalp Jha",
    role: "@SankalpJha_30 on X",
    text: "Dope🔥🔥🔥",
    link: "https://x.com/SankalpJha_30/status/2122320929363787946",
  },
  {
    id: 8,
    name: "Fardin",
    role: "@fardin_raafi on X",
    text: "Just saw it, its absolutely amazing!! King of curses 🔥🔥",
    link: "https://x.com/fardin_raafi/status/2122216328841072754",
  },
  {
    id: 9,
    name: "Rish",
    role: "@rishmakes on X",
    text: "Looks pretty cool brother",
    link: "https://x.com/rishmakes/status/2122160452411306425",
  },
  {
    id: 10,
    name: "Raiyan",
    role: "Redditor · r/webdesign",
    text: "Looks great. There are a few elements I haven't seen before, which is pretty cool.",
    link: "https://www.reddit.com/r/webdesign/s/DbJ738eVpg",
  },
  {
    id: 11,
    name: "Aayan",
    role: "@AayanShips on X",
    text: "just checked your portfolio out bro it was soo cool and clean",
    link: "https://x.com/AayanShips/status/2124851564011745430?a=qM5M7vTE0OF2_d4eURs&s=20",
  },
  {
    id: 12,
    name: "eldestchild",
    role: "@eldestchildx on X",
    text: "bruh it's more than just a portfolio, how did u vibe code this?",
    link: "https://x.com/eldestchildx/status/2126311249206227101?a=YnMCZ8Z6M-9rpGBiYCw&s=20",
  },
  {
    id: 13,
    name: "francis",
    role: "@coolbwunni on X",
    text: "está bonito, me gusta",
    link: "https://x.com/coolbwunni/status/2126337727083802675?a=ynX1fNrN35XD3vr5K2s&s=20"
  }
];

const AvailableBadge = () => {
  return (
    <div className="relative flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 ring ring-neutral-400 dark:bg-neutral-900 dark:ring-neutral-700">
      <span className="relative inline-flex">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
      </span>
      <p className="font-semibold">Available for freelance</p>
    </div>
  );
};

export { AvailableBadge };

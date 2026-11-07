import { instrumentSerif } from "@/config/font";

const OpenWork = () => {
  return (
    <div className="group my-5 overflow-hidden text-xl whitespace-nowrap text-neutral-500">
      <div className="animate-marquee flex w-max">
        {[1, 2].map((item) => (
          <span key={item} className={`${instrumentSerif.className} px-4`}>
            OPEN TO WORK • AVAILABLE FOR FREELANCE • OPEN TO WORK • AVAILABLE
            FOR FREELANCE • OPEN TO WORK • AVAILABLE FOR FREELANCE •
          </span>
        ))}
      </div>
    </div>
  );
};

export { OpenWork };

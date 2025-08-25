import { cn } from "../../shared/util/classname";
import { RESUME_DATA } from "../model/data";

interface CareerBandProps {
  company: string;
  className?: string;
  onClick?: () => void;
  isExpanded?: boolean;
}

const CareerBand = ({
  company,
  className,
  onClick,
  isExpanded,
}: CareerBandProps) => {
  const { position, period } =
    RESUME_DATA.find((item) => item.company === company) || {};

  return (
    <div
      className={cn(
        "grid grid-cols-3 border-t border-b border-black text-xl lg:text-4xl h-[120px] px-9 items-center mt-2 cursor-pointer hover:opacity-65 transition-colors duration-200 select-none",
        className
      )}
      onClick={onClick}
    >
      <div className="font-regular text-left flex items-center gap-3">
        {company}
        {onClick && (
          <span
            className={`text-lg lg:text-2xl font-light transition-transform duration-300 ease-in-out ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
          >
            ▶
          </span>
        )}
      </div>
      <div className="font-light text-center">{position}</div>
      <div className="font-light text-right">{period}</div>
    </div>
  );
};

export { CareerBand };

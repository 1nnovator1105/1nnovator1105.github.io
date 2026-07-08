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
        "group relative overflow-hidden grid grid-cols-3 border-t border-b border-line text-xl lg:text-4xl h-[120px] px-9 items-center mt-2 cursor-pointer select-none transition-all duration-300 hover:bg-surface hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      {/* Left accent bar grows on hover — echoes the company's jewel color */}
      <span className="pointer-events-none absolute left-0 top-0 h-full w-[6px] origin-top scale-y-0 bg-[var(--c-company)] transition-transform duration-300 ease-out group-hover:scale-y-100" />

      <div className="font-regular text-left flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2 text-body">
        {/* jewel dot */}
        <span
          className="inline-block size-3 shrink-0 rounded-full"
          style={{
            background: "var(--c-company)",
            boxShadow: "0 0 8px var(--c-company)",
          }}
        />
        {company}
        {onClick && (
          <span
            className={`text-lg lg:text-2xl font-light text-muted transition-transform duration-300 ease-in-out group-hover:scale-125 ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
          >
            ▶
          </span>
        )}
      </div>
      <div className="font-light text-center text-muted">{position}</div>
      <div className="font-light text-right text-muted">{period}</div>
    </div>
  );
};

export { CareerBand };

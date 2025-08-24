"use client";

import { useState } from "react";
import { CareerBand } from "./CareerBand";
import { Task } from "./Task";
import { TechStacks } from "./TechStacks";

interface CompanyProps {
  name: string;
  careerBandClassName?: string;
}

const Company = ({ name, careerBandClassName }: CompanyProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <CareerBand
        company={name}
        className={careerBandClassName}
        onClick={handleToggle}
        isExpanded={isExpanded}
      />
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="transform transition-transform duration-500 ease-in-out">
          <TechStacks company={name} />
          <Task company={name} />
        </div>
      </div>
    </>
  );
};

export { Company };

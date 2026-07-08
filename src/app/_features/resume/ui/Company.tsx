"use client";

import { useState } from "react";
import { Reveal } from "../../shared/ui";
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
      <Reveal>
        <CareerBand
          company={name}
          className={careerBandClassName}
          onClick={handleToggle}
          isExpanded={isExpanded}
        />
      </Reveal>
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <TechStacks company={name} />
          <Task company={name} />
        </div>
      </div>
    </>
  );
};

export { Company };

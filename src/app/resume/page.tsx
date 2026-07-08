import { CareerBand, Company, Hero, SayHello, Task } from "../_features/resume/ui";
import { Reveal, ScrollProgress } from "../_features/shared/ui";

export default function Resume() {
  return (
    <>
      <ScrollProgress />
      <div className="flex flex-col items-center min-h-screen bg-page text-body py-8 px-5 sm:px-8 lg:px-10 max-w-7xl mx-auto">
        <Hero />

        <div className="mt-16 w-full">
          <Reveal>
            <SayHello />
          </Reveal>
        </div>

        <div className="flex flex-col w-full mt-16">
          <Reveal as="h2" className="text-4xl font-regular text-body">
            경력
          </Reveal>

          <div id="company-newneek" className="scroll-mt-8">
            <Company name="뉴닉" careerBandClassName="mt-10" />
          </div>

          <div id="company-uinetworks" className="scroll-mt-8">
            <Company
              name="유아이네트웍스"
              careerBandClassName="mt-0 border-t-[0px]"
            />
          </div>

          <div id="company-side" className="scroll-mt-8">
            <Reveal>
              <CareerBand
                company="사이드프로젝트"
                className="mt-0 border-t-[0.5px]"
              />
              <Task company="사이드프로젝트" />
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
}

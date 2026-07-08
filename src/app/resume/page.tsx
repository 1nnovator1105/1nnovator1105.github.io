import {
  CareerBand,
  Company,
  Intro,
  SayHello,
  Task,
} from "../_features/resume/ui";
import { Reveal, ScrollProgress } from "../_features/shared/ui";

export default function Resume() {
  return (
    <>
      <ScrollProgress />
      <div className="flex flex-col items-center min-h-screen bg-gray-0 py-[60px] px-10 max-w-7xl mx-auto">
        <Intro />
        <SayHello />

        <div className="flex flex-col w-full mt-10">
          <Reveal as="h2" className="text-4xl font-regular">
            경력
          </Reveal>

          <Company name="뉴닉" careerBandClassName="mt-10 bg-orange-500" />

          <Company
            name="유아이네트웍스"
            careerBandClassName="mt-0 border-t-[0px] bg-gray-300"
          />

          <Reveal>
            <CareerBand
              company="사이드프로젝트"
              className="mt-0 border-t-[0.5px]"
            />
            <Task company="사이드프로젝트" />
          </Reveal>
        </div>
      </div>
    </>
  );
}

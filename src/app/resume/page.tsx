import {
  CareerBand,
  Company,
  Intro,
  SayHello,
  Task,
} from "../_features/resume/ui";

export default function Resume() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-0 py-[60px] px-10 max-w-7xl mx-auto">
      <Intro />
      <SayHello />

      <div className="flex flex-col w-full mt-10">
        <h2 className="text-4xl font-regular">경력</h2>

        <Company name="뉴닉" careerBandClassName="mt-10 bg-orange-500" />

        <Company
          name="유아이네트웍스"
          careerBandClassName="mt-0 border-t-[0px] bg-gray-300"
        />

        <CareerBand
          company="사이드프로젝트"
          className="mt-0 border-t-[0.5px]"
        />
        <Task company="사이드프로젝트" />
      </div>
    </div>
  );
}

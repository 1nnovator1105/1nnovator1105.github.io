export const RESUME_DATA = [
  {
    company: "뉴닉",
    position: "Front-End Engineer",
    period: "2022.10-재직 중",
    techStacks: [
      {
        title: "App",
        description: "React Native, React, Recoil, FastLane",
      },
      {
        title: "Web",
        description: "React, Next.js, Tailwind, Zustand, Vercel",
      },

      {
        title: "공통/기타",
        description: "Typescript, TanStack Query, LangChain",
      },
    ],
    tasks: [
      {
        section: "① 서비스 고도화",
        items: [
          {
            title: "AI 챗봇 프로토타이핑",
            techStacks: ["Next.js", "LangChain"],
            period: "2025.08",
            descriptionList: [
              "Supabase Vector DB와 LangChain을 활용하여, 뉴닉의 마스코트 ‘고슴이’의 말투로 뉴닉 아티클 기반의 답변을 하는 대화형 AI 챗봇 구현",
              "유저의 피드백(좋아요/아쉬워요)에서 높은 점수를 받은 답변을 저장하고, 추후 유사한 질문이 들어올 경우 Best Case를 사용하여 답변하는 프로세스 구축",
            ],
          },
          {
            title: "AI 댓글 검증·점수화 시스템 구현을 통한 어뷰징 대응 자동화",
            techStacks: [
              "React Native",
              "Next.js",
              "LangChain",
              "Django Framework",
            ],
            period: "2025.06",
            descriptionList: [
              "댓글 작성 시 OpenAI API를 통한 검증 및 정해진 프롬프트에 따라 위반 점수 산정",
              "위반 점수 단계별로 즉시 삭제, 가림, 보임 여부를 결정하여 어뷰징 댓글 관리",
            ],
          },
          {
            title: "AI 활용 아티클 연관 질문 기능 개발",
            techStacks: ["Next.js", "Django Framework"],
            period: "2025.04",
            descriptionList: [
              "아티클 페이지에 관련된 질문을 제시하는 기능을 제안 및 개발하여 웹과 앱에 구현",
              "아티클 발행 시 OpenAI API와 Few-shot prompting 기법을 사용한 프롬프트를 통해 아티클 기반 연관 질문 생성",
              "릴리즈 후 전체 댓글의 26%가 해당 기능을 통해 작성되며 성공적으로 정착",
            ],
          },
          {
            title:
              "Firebase Remote Config를 통한 앱 UI 실시간 제어 및 배포 효율화",
            techStacks: [
              "React Native",
              "WebView(Next.js 기반)",
              "Firebase Remote Config",
              "TanStack Query",
            ],
            period: "2025.04",
            descriptionList: [
              "변동 가능성이 큰 기능은 Firebase Remote Config로 데이터 형태를 관리하고, WebView를 통해 사용자의 앱 버전과 무관하게 동일 기능 제공",
              {
                item: "이벤트·제휴 페이지처럼 변경 주기가 짧은 화면은 Firebase Remote Config로 UI를 원격 제어하여 배포 없이 즉시 반영",
                subItems: [
                  "Form 구성 요소 및 Validation 변경 대응",
                  "실험적 기능 On/Off를 원격 변수로 관리해, 제품 내 기능 활성화 여부를 실시간 제어",
                ],
              },

              "Firebase Remote Config와 React Query를 사용해 상태 관리 및 데이터 반영 속도 최적화",
            ],
          },
          {
            title: "ChatGPT & CLOVA 기반 아티클 요약 음성화 시스템 구현",
            techStacks: [
              "React Native",
              "Next.js",
              "React Native Track Player",
              "S3 + CDN",
            ],
            period: "2024.11-2024.12",
            descriptionList: [
              "아티클을 ChatGPT API로 요약한 후 네이버 CLOVA API를 통해 음성화하는 기능 제안 및 개발",
              "생성된 음성을 AWS S3에 업로드하여 CDN으로 사용자에게 제공",
              "사용자 만족도 조사 결과 전체 평균 4.1점 달성",
            ],
          },
          {
            title:
              "React Native 아티클 상세 페이지 WebView 전환을 통한 관리 효율화",
            techStacks: ["React Native", "Next.js", "WebView"],
            period: "2024.08",
            descriptionList: [
              "기존에는 앱과 웹에서 동일한 콘텐츠 화면을 중복 관리하여, 수정 시 양쪽 모두 작업하는 비효율 발생",
              "앱의 콘텐츠 상세 화면을 WebView로 전환하고, 웹의 CSS 파일을 단일 관리 소스로 적용",
              "앱과 웹의 스타일을 동시에 조정 가능하게 하여 수정 리드 타임 단축 및 통일성 확보",
              "핵심 페이지(아티클 상세 페이지)의 오류, 개선 사항에 즉각 대응 및 개선 사항 도달 범위 확장",
            ],
          },
          {
            title:
              "K사 협업 페이지 프론트·백엔드 구축 및 무중단 배포 환경 구현",
            techStacks: ["Node.js + Express", "Next.js", "AWS CodeDeploy"],
            period: "2023.04-2023.05",
            descriptionList: [
              "AWS CodeDeploy의 Blue-Green 배포 옵션을 통한 무중단 배포 구현",
              "AWS EC2 Autoscale 환경에서 안정적인 배포를 위한 AWS CodeDeploy 활용",
              "서버 부하와 트래픽 증가에 따른 인스턴스 확장 시 새 인스턴스에 최신 코드 자동 배포",
            ],
          },
          {
            title: "인터랙티브 프로모션 페이지 개발",
            techStacks: ["Next.js", "Tailwind", "framer-motion"],
            period: "비정기",
            descriptionList: [
              "Next.js 기반의 다양한 마케팅·캠페인 프로모션 페이지 개발",
              "사용자의 관심과 참여를 극대화하는 인터랙티브 UI 구현",
            ],
          },
        ],
      },
      {
        section: "② 운영·배포<br/>&nbsp;&nbsp;&nbsp;&nbsp;자동/효율화",
        items: [
          {
            title: "노션 블록 렌더러 개발을 통해 발행 프로세스 자동화",
            techStacks: ["Next.js"],
            period: "2025.06",
            descriptionList: [
              "노션 블록에 매칭되는 컴포넌트 시스템화 및 React 컴포넌트 렌더링 플로우 구현",
              "원고 변경 시 개발 작업 없이 노션 내 콘텐츠를 직접 관리하여, 업무 효율화 및 커뮤니케이션 비용 감소",
              "디자인↔개발 간 협업 프로세스에서 소요되던 4-5일을 2일 이내로 60% 이상 단축",
              "비개발자 주도로 신속한 콘텐츠 업데이트가 가능한 환경을 마련하여, 발행 속도와 효율성 대폭 향상",
            ],
          },
          {
            title: "헤드라인 뉴스 크롤링 및 AI 요약 자동화",
            techStacks: ["Next.js", "cheerio", "LangChain"],
            period: "2025.02-2025.03",
            descriptionList: [
              "특정 사이트의 헤드라인 페이지 크롤링 및 AI 요약 시스템 개발",
              "자사 아티클 발행 가이드 기반의 프롬프트를 활용하여 자동 뉴스 발행 플로우 구축",
              "콘텐츠 발행 과정에서 소요 시간이 가장 큰 작업을 자동화하여 에디터의 업무 효율성 대폭 향상",
            ],
          },
          {
            title: "Fastlane을 도입하여 React Native 배포 자동화",
            techStacks: ["React Native", "Fastlane"],
            period: "2024.05",
            descriptionList: [
              "Fastlane 도입과 쉘 스크립트 작성으로, 버전 세팅과 배포 두 단계로 빌드 및 배포 과정 자동화",
              "배포 과정을 표준화 및 간소화하여, React Native 수동 배포의 복잡한 프로세스에 대한 부담 해소",
              "배포 시간 단축 및 휴먼 에러 감소로 운영 효율성 향상",
            ],
          },
          {
            title:
              "React Native 코드푸시 도입 및 UI 개선으로 OTA 업데이트 경험 향상",
            techStacks: ["React Native"],
            period: "2023.08",
            descriptionList: [
              "React Native 코드푸시 도입(현재는 hot-updater 라이브러리로 전환)",
              "자체 업데이트 체크 로직을 구현하여 필수 업데이트 전 사용자 행동 제어",
              "JS 번들 다운로드 Progress Bar 구현으로 사용자에게 명확한 업데이트 피드백 제공",
            ],
          },
          {
            title: "Python 크롤러 기반 데이터 기록 자동화",
            techStacks: ["Django Framework", "AWS Lambda"],
            period: "2023.02",
            descriptionList: [
              "스티비 대시보드 데이터를 읽는 크롤러를 개발하여 슬랙으로 전송",
              "매일 약 10분 정도 소요되던 데이터 기록 작업을 자동화하여 업무 효율화",
              "휴먼 에러 방지 및 일관된 기준의 데이터 기록 보장",
            ],
          },
        ],
      },
      {
        section: "③ 협업 프로세스<br/>&nbsp;&nbsp;&nbsp;&nbsp;개선",
        items: [
          {
            title:
              "커밋 플래그 연동 AI 코드 리뷰 및 PR 설명 자동화 시스템 구축",
            period: "2025.02, 2025.05",
            descriptionList: [
              "커밋 메시지 내 특정 플래그 삽입 시, AI가 자동으로 코드 리뷰 진행하는 Github Actions 개발",
              "PR 생성 및 커밋 시 작업 내용을 반영하여 AI가 PR Description을 자동으로 추가하는 자동화 파이프라인 구축",
              "1팀-1개발자 조직 구조에서도 일정 수준의 코드 리뷰 진행 및 PR 문서 수준을 일관성 있게 표준화",
            ],
          },
          {
            title:
              "QA 릴리즈 기준 3단계 체계화로 협업 효율성 및 릴리즈 속도 개선 🔗",
            link: "https://ms-nest.notion.site/QA-24c2db43d7fd809c98b9e8da10ad41c5?source=copy_link",
            period: "2024.11",
            descriptionList: [
              "릴리즈 기준을 3단계로 체계화하여 QA 효율성 향상 및 릴리즈 소요 시간 단축",
              "개발자, 디자이너, PM의 기준 차이로 인한 QA 시간 지연 문제 해결",
              "협업 이해관계자 간 소통 및 합의 강화로 릴리즈 품질과 일정 안정성 확보",
            ],
          },
          {
            title:
              "프론트엔드 주도 프로토타이핑 및 AI 기능 개발을 위한 Next.js 전용 서버 구축",
            period: "2024.09",
            descriptionList: [
              "백엔드 리소스 없이 프론트엔드만으로 아이디어 프로토타이핑과 실험적 기능을 독립적으로 구현할 수 있는 Next.js 기반 개발 환경 구축",
              "Firebase Remote Config 값을 간편하게 조작하는 등 인터랙티브한 헬퍼 기능 추가",
              "LangChain, AI API 연동과 같이 신기술 검토 후 빠르게 프로덕트에서 실험할 수 있는 환경 마련",
              "프론트엔드 개발의 자율성과 실험 속도 크게 향상",
            ],
          },
          {
            title:
              "릴리즈 노트 및 깃 태그 관리 프로세스 구축을 통한 OTA 버전 관리 효율화",
            period: "2024.09",
            descriptionList: [
              "OTA 업데이트 시 다양한 앱 버전을 효율적으로 관리할 수 있는 릴리즈 노트와 깃 태그 관리 프로세스 설계 및 정착",
              "팀 내 배포 관련 커뮤니케이션 및 협업 프로세스 개선으로 릴리즈 안정성 및 속도 향상",
            ],
          },
          {
            title:
              "디자인 시스템 개편을 통한 디자인↔컴포넌트 매칭 체계 구축 🔗",
            link: "https://ms-nest.notion.site/24c2db43d7fd81199285cf2e1f248b26?source=copy_link",
            period: "2024.08",
            descriptionList: [
              "디자인 시스템 관련 프론트엔드 의견을 정리 및 공유하여 디자인 시스템 개편 제안",
              "디자인 시스템을 점진적으로 적용하여 디자인↔컴포넌트 매칭 체계를 통일",
              "프로덕트 디자이너와 정기적인 상황 공유 회의체를 만들어 진행 상황 공유",
              "UI 일관성 및 개발 생산성 확보",
            ],
          },
        ],
      },
      {
        section: "기타 활동",
        items: [
          {
            title: "자사 개발 블로그 포스팅",
            period: "2023.12",
            descriptionList: [
              {
                item: "React Native 멘션 스타일링에 성공적으로 실패하기 🔗",
                link: "https://medium.com/newneek/react-native-%EB%A9%98%EC%85%98-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81%EC%97%90-%EC%84%B1%EA%B3%B5%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%8B%A4%ED%8C%A8%ED%95%98%EA%B8%B0-69fac9655e46",
              },
            ],
          },
          {
            title: "깃허브 이슈 등록",
            period: "2023.12",
            descriptionList: [
              {
                item: "[iOS] The styling does not change when the CJK character enter TextInput 🔗",
                link: "https://github.com/facebook/react-native/issues/41933",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    company: "유아이네트웍스",
    position: "Full-Stack Engineer",
    period: "2019.01-2022.06",
    techStacks: [
      {
        title: "Front-End",
        description: "Javascript, amCharts, d3.js",
      },
      {
        title: "Back-End",
        description: "Java, Spring, RDBMS(Oracle, MySQL, PostgreSQL)",
      },

      {
        title: "GIS",
        description: "OpenLayers, PostGIS, QGIS",
      },
    ],
    tasks: [
      {
        section: "",
        items: [
          {
            title: "도로 네트워크 편집 페이지 개발",
            techStacks: ["SpringBoot", "Javascript", "OpenLayers", "PostGIS"],
            period: "2022.05-2022.06",
            descriptionList: [
              "도로 네트워크 수정 및 속성 정보 편집이 가능한 웹 페이지 개발",
              {
                item: "공간 쿼리를 통한 성능 최적화 진행",
                subItems: [
                  "대량 데이터 출력 시 발생하는 웹 브라우저 Freezing 현상을 해결하기 위하여 사용자의 Display 영역 값과 PostGIS 공간 쿼리를 활용한 데이터 조회 방식 구현",
                  "Zoom Level에 따라 Feature 객체에 동적으로 Style을 적용하여 웹 브라우저 부하 최소화",
                ],
              },
            ],
          },
          {
            title: "Personal Mobility(전동킥보드) 교통안전 서비스 구축",
            techStacks: ["Spring", "Javascript", "OpenLayers", "PostGIS"],
            period: "2021.07-2022.02",
            descriptionList: [
              "웹에서 Geofence를 생성, 편집, 삭제할 수 있는 저작 시스템 개발",
              "GIS 라이브러리를 활용한 Geofence 내 PM 통계 데이터 표출",
              "PM GPS 데이터 표출 및 각 GPS 포인트에 대한 사고 신고 기능 구현",
            ],
          },
          {
            title: "S시 교통정보시스템 고도화",
            techStacks: ["Spring", "Java", "Javascript", "OpenLayers"],
            period: "2020.06-2020.10",
            descriptionList: [
              "S시 교통관련과의 수요를 사전 조사하여 이를 기반으로 신규 페이지 기획 및 개발",
              {
                item: "새로운 유형의 연계 데이터 발생에 따른 데이터 입력 프로그램 개발 및 자동화 프로세스 구축",
                subItems: [
                  "데이터 연계 문제 발생 시 FTP 연결, 데이터 다운로드, 가공을 수행하는 Java 기반 프로그램 개발",
                  "신규 연계 데이터의 일배치 가공 프로시저 작성을 통한 지표화",
                ],
              },
              "지도 및 차트 기반으로 데이터를 시각적으로 확인할 수 있는 대시보드 개발",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "사이드프로젝트",
    position: "Full-Stack Engineer",
    period: "2024.09-2024.10",

    tasks: [
      {
        section: "Drippin,<br/>Biscat",
        items: [
          {
            title: "MVP 리드 개발 및 아티클 기술파트 작성",
            descriptionList: [
              {
                item: "Drippin 디스콰이엇 🔗",
                link: "https://disquiet.io/product/drippin-1727678436337",
              },
              {
                item: "Biscat 디스콰이엇 🔗",
                link: "https://disquiet.io/product/biscat",
              },
              {
                item: "비스캣의 개발자가 빠르게 프로덕트를 구현하는 방법 🔗",
                link: "https://disquiet.io/@2yoonsunny/makerlog/%EB%B9%84%EC%8A%A4%EC%BA%A3%EC%9D%98-%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-%EB%B9%A0%EB%A5%B4%EA%B2%8C-%ED%94%84%EB%A1%9C%EB%8D%95%ED%8A%B8%EB%A5%BC-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95",
              },
            ],
          },
        ],
      },
    ],
  },
];

# Dailify

## 🖥️ 프로젝트 소개

Dailify는 Daily와 Simplify를 합친 단어로 학생, 취준생, 공시생 등의 사용자에게 할 일 관리와 타이머 및 스톱워치, 통계, 주간 랭킹 등의 기능을 제공해 동기 부여를 강화하고, 쉽고 편리하게 매일을 관리할 수 있도록 하는 서비스입니다.

## 🗃️ Overview

1. [Preview 및 Link](#section1)
2. [개발 기간 및 팀원](#section2)
3. [Tech Stacks](#section3)
4. [페이지별 주요 기능](#section4)
5. [트러블 슈팅](#section5)

<div id="section1" />

## 📀 Preview 및 Link

> ### 🎥 시연영상
![dailify-시연영상](https://github.com/user-attachments/assets/c7c6886d-3db3-4069-8f9a-e6ac22d374ba)

> ### 🔗 링크

- [Dailify 배포](https://dailify-blush.vercel.app/)
- [프로젝트 노션](https://www.notion.so/Dailify-1863357e7a4f80a59857e832b4b60c69)

<div id="secton2"/>

## 🕰️ 개발 기간 및 팀원

### 🗓️ 개발 기간: 25. 02. 01 ~ 25. 04. 13 (10주)

### 🧑‍💻 팀원: 조예린 (기여도 100%)

<br/>

<div id="secton3"/>

## 🛠️ Tech Stacks

<div>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
  <img alt="Typescript" src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/supabase-3FCF8E.svg?&style=for-the-badge&logo=supabase&logoColor=white"/>
  <img alt="Reactquery" src="https://img.shields.io/badge/reactquery-FF4154.svg?&style=for-the-badge"/>
  <img alt="Zustnad" src="https://img.shields.io/badge/zustand-3657C9.svg?&style=for-the-badge"/>
  <img alt="styledcomponents" src="https://img.shields.io/badge/styledcomponents-DB7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=white"/>
  <img alt="vercel" src="https://img.shields.io/badge/vercel-000000.svg?&style=for-the-badge&logo=vercel&logoColor=white"/>
</div>
<br/>

<div id="section4" />

## 📌 페이지별 주요 기능

> ### 🔑 회원가입, 로그인 페이지

```
// 이메일 & 비밀번호 회원가입
const { data, error } = await supabase.auth.signUp({
  email: formValues.email,
  password: formValues.password,
});

// 이메일 & 비밀번호 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: formValues.email,
  password: formValues.password,
});

// 소셜 로그인(카카오, 구글)
const { data, error } = await supabase.auth.signInWithOAuth({
  provider,
  options: {
    redirectTo: auth_callback_url,
  },
});

```

- Supabase Authentication을 이용한 이메일,비밀번호 회원가입/로그인
- Supabase Authentication을 이용한 카카오 소셜 로그인
- Supabase Authentication을 이용한 구글 소셜 로그인
- 이메일, 비밀번호, 비밀번호 확인 유효성 검사

> ### 🏠 홈 페이지

```
// 타이머
function intervalTimer(timeout) {
  const start = Date.now();
  endTime = start + remainingTime;

  timerId = setInterval(() => {
    const now = Date.now();
    const timeLeft = endTime - now;
    if (timeLeft <= 0) {
      postMessage({ type: "timer-end" });
      clearInterval(timerId);
      return;
    }
    remainingTime = timeLeft;
    postMessage({ type: "timer", timeLeft });
  }, timeout);
}

onmessage = function (e) {
  const { type, target } = e.data;
  switch (type) {
    case "start-timer":
      remainingTime = target;
      intervalTimer(1000);
      break;
    case "pause-timer":
      clearInterval(timerId);
      break;
    case "resume-timer":
      intervalTimer(1000);
      break;
  }
};

// 스톱워치
function intervalStopwatch(initialElapsedTime = 0) {
  if (isRunning) return;
  isRunning = true;
  elapsedTime = initialElapsedTime;
  startTime = Date.now() - elapsedTime;

  timerId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    if (elapsedTime > MAX_TIME) elapsedTime = MAX_TIME;
    postMessage({ type: "stopwatch", elapsedTime });
  }, 1000);
}

onmessage = function (e) {
  const { type, elapsedTime: initialElapsedTime } = e.data;
  switch (type) {
    case "start-stopwatch":
      intervalStopwatch(initialElapsedTime || elapsedTime);
      break;
    case "pause-stopwatch":
      clearInterval(timerId);
      isRunning = false;
      if (elapsedTime > MAX_TIME) elapsedTime = MAX_TIME;
      postMessage({ type: "stopwatch", elapsedTime });
      break;
  }
};
```

- Web worker를 이용한 타이머 및 스톱워치 기능
- Supabase DB를 이용한 오늘 목표 시간 설정 기능
- Supabase DB를 이용한 오늘 할 일, 먼슬리 이벤트 CRUD(생성, 수정, 삭제) 기능

> ### 🗓️ 위클리 페이지

- Supabase DB를 이용한 이번주 목표 시간 설정 기능
- Supabase Sql Editor를 이용한 이번주 총 공부 시간 계산 기능
- Supabase DB를 이용한 이번주 할 일, 먼슬리 이벤트 CRUD(생성, 수정, 삭제) 기능

> ### 📊 대시보드 페이지

- Supabase Sql Editor와 rpc를 이용한 통계 데이터(월간 통계, 주간 통계, 미완료 할 일 리스트) 정리 기능

> ### 🏆 주간 랭킹 페이지

```
// 자동화
SELECT cron.schedule(
  '함수명',
  '업데이트 날짜',
  $$ SELECT 실행할 함수명(); $$
);
```

- Supabase Sql Editor와 rpc를 이용한 필요 데이터(유저 랭킹 변동, 유저 주간 랭킹 내역, 주간 top10 내역) 정리 기능
- Supabase Sql Editor와 CronJob 이용한 주간 데이터 저장 자동화 기능

> ### 🧑 마이 페이지

```
// 로그아웃
await supabase.auth.signOut();

// 탈퇴
const { error } = await adminAuthClient.deleteUser(session.user.id);

```

- Supabase Sql Editor와 rpc를 이용한 필요 데이터(D-day이벤트 리스트, 종합 통계) 정리 기능
- Supabase를 이용한 로그아웃, 탈퇴 기능
- Supabase DB를 이용한 D-day 이벤트 CRUD(생성, 삭제) 기능
- Supabase DB를 이용한 유저 프로필 이미지, 닉네임 수정 기능
- 선택 이미지 미리보기 기능

<div id="section5"/>

## ⚠️ 트러블 슈팅

> ### 문제1. Next.js 15 + Styled-components에서 CSS적용이 늦는 문제 발생

```
// lig > registry.tsx
import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import GlobalStyle from "../../styles/global_style";

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {

  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined")
    return (
      <>
        <GlobalStyle />
        {children}
      </>
    );

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children as React.ReactElement}
    </StyleSheetManager>
  );
}

```

- 해결방법: \_documents.tsx → registry.tsx사용

> ### 문제2. 배포 시, MixedChart에서 "line"인식하지 못하는 문제 발생

```
ChartJS.register(
  ...
  LineController,
);
```

- 해결방법: ChartJS의 lineController 추가

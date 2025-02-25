"use client";

import Layout from "@/components/common/layout/layout";

export default function Home() {
  return (
    <Layout showSide={true}>
      <div className="main">메인 콘텐츠</div>
      <div className="side">사이드 콘텐츠</div>
    </Layout>
  );
}

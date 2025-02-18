import MainLayout from "@/components/common/layout/MainLayout";

export default function Home() {
  return (
    <MainLayout hasSide isVertical>
      <div>메인</div>
      <div>사이드 콘텐츠</div>
    </MainLayout>
  );
}

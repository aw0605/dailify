"use client";

import useMyQuery from "@/hooks/query/useMyQuery";
import Layout from "@/components/common/layout/layout";
import DdayList from "@/components/my/Dday/DdayList";
import TotalStatic from "@/components/my/TotalStatic/TotalStatic";
import Buttons from "@/components/my/UserInfo/Buttons";
import UserInfo from "@/components/my/UserInfo/UserInfo";
import Loading from "@/components/common/ui/Loading";

function MyPage() {
  const { myData, isLoading } = useMyQuery();

  if (isLoading) {
    return <Loading size="50" />;
  }

  return (
    <Layout showSide={true}>
      <div className="main">
        <UserInfo />
        <Buttons />
        <DdayList events={myData?.ddayEvents ?? []} />
      </div>
      <div className="side">
        <TotalStatic stat={myData?.totalStat ?? null} />
      </div>
    </Layout>
  );
}

export default MyPage;

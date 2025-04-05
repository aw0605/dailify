"use client";

import { useEffect } from "react";
import { useUserQuery } from "@/hooks/query/useUserQuery";
import useMyStore from "@/zustand/useMyStore";
import Layout from "@/components/common/layout/layout";
import DdayList from "@/components/my/Dday/DdayList";
import TotalStatic from "@/components/my/TotalStatic/TotalStatic";
import Buttons from "@/components/my/UserInfo/Buttons";
import UserInfo from "@/components/my/UserInfo/UserInfo";

function MyPage() {
  const { userId } = useUserQuery();

  const fetchMyData = useMyStore((state) => state.fetchMyData);

  useEffect(() => {
    if (userId) {
      fetchMyData(userId);
    }
  }, [userId]);

  return (
    <Layout showSide={true}>
      <div className="main">
        <UserInfo />
        <Buttons />
        <DdayList />
      </div>
      <div className="side">
        <TotalStatic />
      </div>
    </Layout>
  );
}

export default MyPage;

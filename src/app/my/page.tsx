"use client";

import Layout from "@/components/common/layout/layout";
import DdayList from "@/components/my/Dday/DdayList";
import TotalStatic from "@/components/my/TotalStatic/TotalStatic";
import Buttons from "@/components/my/UserInfo/Buttons";
import UserInfo from "@/components/my/UserInfo/UserInfo";
import useUser from "@/hooks/useUser";
import useMyStore from "@/zustand/useMyStore";
import { useEffect } from "react";

function MyPage() {
  const { userId } = useUser();

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

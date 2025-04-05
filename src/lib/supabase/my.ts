"use server";

import { createClientForServer } from "./server";

import { DdayEvent, DdayFormValuesProps } from "@/types/dday";
import { StatProps } from "@/types/dashboard";
import { UserInfo } from "@/types/user";

interface MyProps {
  ddayEvents: DdayEvent[];
  totalStat: StatProps;
}

const getMyData = async (uid: string): Promise<MyProps> => {
  const supabase = await createClientForServer();

  const { data, error } = await supabase.rpc("get_my_data", {
    uid,
  });

  if (error) {
    console.error("마이 데이터 불러오는 중 에러 발생!:", error);
    return {
      ddayEvents: [],
      totalStat: { total: 0, completed: 0, incompleted: 0, rate: 0 },
    };
  }

  console.log("마이 데이터!!:", data);

  return data;
};

const setDdayEvent = async (event: DdayFormValuesProps & { uid: string }) => {
  const supabase = await createClientForServer();

  const isoDate = event.date.toISOString();

  const { data, error } = await supabase
    .from("dday_events")
    .insert([
      {
        uid: event.uid,
        title: event.title,
        date: isoDate,
      },
    ])
    .select();

  if (error) throw error;

  return data[0];
};

const deleteDdayEvent = async (id: string) => {
  const supabase = await createClientForServer();

  const { error } = await supabase.from("dday_events").delete().eq("id", id);

  if (error) throw error;
};

const uploadImage = async (
  userId: string,
  file: File,
): Promise<string | null> => {
  const supabase = await createClientForServer();
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;
  const userFolder = `profile/${userId}/`;

  const imagePath = `${userFolder}${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(imagePath, file, { upsert: true });

  if (uploadError) {
    console.error("이미지 업로드 중 에러 발생:", uploadError);
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(imagePath);
  return data.publicUrl;
};

const updateUserInfo = async (
  userId: string,
  nickname: string,
  imageFile: File | null,
): Promise<UserInfo | null> => {
  const supabase = await createClientForServer();
  const bucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;
  const userFolder = `profile/${userId}/`;

  try {
    let newImageUrl: string | null = null;

    if (imageFile) {
      newImageUrl = await uploadImage(userId, imageFile);
      if (!newImageUrl) throw new Error("이미지 업로드 실패");
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from("usersinfo")
      .update({ nickname, image: newImageUrl })
      .eq("id", userId)
      .select()
      .single();

    if (updateError) {
      console.error("유저 정보 업데이트 중 에러 발생:", updateError.message);
      return null;
    }

    if (imageFile) {
      const { data: files, error: fetchError } = await supabase.storage
        .from(bucket)
        .list(userFolder);

      if (fetchError) {
        console.error("기존 이미지 목록 조회 실패:", fetchError);
      } else if (files.length > 0) {
        const filesToDelete = files
          .filter((file) => newImageUrl && !newImageUrl.includes(file.name))
          .map((file) => `${userFolder}${file.name}`);

        if (filesToDelete.length > 0) {
          const { error: deleteError } = await supabase.storage
            .from(bucket)
            .remove(filesToDelete);

          if (deleteError) console.error("기존 이미지 삭제 실패:", deleteError);
        }
      }
    }

    return updatedUser;
  } catch (error) {
    console.error("유저 정보 업데이트 중 에러 발생:", error);
    return null;
  }
};

export {
  getMyData,
  setDdayEvent,
  deleteDdayEvent,
  uploadImage,
  updateUserInfo,
};

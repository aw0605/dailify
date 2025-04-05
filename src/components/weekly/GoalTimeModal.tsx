import { useUserQuery } from "@/hooks/query/useUserQuery";
import useForm from "@/hooks/useForm";
import useWeeklyStore from "@/zustand/useWeeklyStore";
import useCalendarStore from "@/zustand/useCalendarStore";
import useModalStore from "@/zustand/useModalStore";
import { validateTime } from "@/utils/validate";
import { convertToMs } from "@/utils/convertToMs";
import Input from "@/components/common/ui/Input";
import ModalButtons from "@/components/common/ui/Modal/ModalButtons";
import styled, { css } from "styled-components";

function GoalTimeModal() {
  const { user, userId } = useUserQuery();
  const selectedWeek = useCalendarStore((state) => state.selectedWeek);
  const closeModal = useModalStore((state) => state.closeModal);

  const updateWeeklyTime = useWeeklyStore((state) => state.updateWeeklyTime);

  const {
    formValues: time,
    handleChange,
    handleSubmit,
    errors,
  } = useForm({
    initialValues: { h: 0, m: 0, s: 0 },
    validate: validateTime,
    onSubmit: async () => {
      if (!user) return;
      const goalTime = convertToMs(time);
      await updateWeeklyTime(userId!, selectedWeek!.start, goalTime);
      closeModal("weeklyGoalTimeModal");
    },
  });

  return (
    <ModalWrapper onSubmit={handleSubmit}>
      <Title>이번주 목표 시간</Title>
      <InputContainer>
        <Input
          type="number"
          name="h"
          value={time.h}
          onChange={handleChange}
          min={0}
          max={23}
        />
        h
        <Input
          type="number"
          name="m"
          value={time.m}
          onChange={handleChange}
          min={0}
          max={59}
        />
        m
      </InputContainer>
      {errors.time && <ErrorMsg>{errors.time}</ErrorMsg>}
      <ModalButtons modalId="weeklyGoalTimeModal" />
    </ModalWrapper>
  );
}

export default GoalTimeModal;

const ModalWrapper = styled.form`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ direction: "column" })}
    gap: 24px;
  `}
`;

const Title = styled.div`
  ${({ theme }) => css`
    ${theme.typography.title({ size: 24, color: theme.colors.orange })}
  `}
`;

const InputContainer = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})}
    gap: 10px;
    font-size: ${theme.pxToRem(18)};

    input {
      width: 50px;
      height: 40px;
      padding: 0;
      text-align: center;
      margin-right: 2px;
    }
  `}
`;

const ErrorMsg = styled.p`
  ${({ theme }) => css`
    ${theme.typography.p({ size: 12, color: theme.colors.orangeRed })}
    margin-bottom: 10px;
  `}
`;

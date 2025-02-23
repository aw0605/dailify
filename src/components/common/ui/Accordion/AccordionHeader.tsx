import styled, { css, useTheme } from "styled-components";
import { BsPinAngleFill } from "react-icons/bs";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import Button from "../Button";
import { TodoItem } from "@/types/todo";

interface AccordionHeaderProps {
  item: TodoItem;
  onCheck?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AccordionHeader({
  item,
  onCheck,
  onEdit,
  onDelete,
}: AccordionHeaderProps) {
  const { type, title, subject, date, checked } = item;

  const theme = useTheme();

  return (
    <AccordionHeaderWrapper>
      <LeftSection>
        {type !== "monthly" ? (
          <CheckBox type="checkbox" checked={checked} onChange={onCheck} />
        ) : (
          <PinIcon />
        )}
        <Title $type={type}>
          <div className="title">
            {type !== "monthly" && <span>[{subject}]</span>}
            {title}
          </div>
          {type === "monthly" && <DateText>{date}</DateText>}
        </Title>
      </LeftSection>
      <RightSection>
        <Button
          onClick={onEdit}
          size={20}
          variant="ghost"
          color={theme.colors.gray2}
          style={{ padding: "0" }}
        >
          <HiOutlinePencilAlt />
        </Button>
        <Button
          onClick={onDelete}
          size={20}
          variant="ghost"
          color={theme.colors.gray2}
          style={{ padding: "0" }}
        >
          <HiOutlineTrash />
        </Button>
      </RightSection>
    </AccordionHeaderWrapper>
  );
}

const AccordionHeaderWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    ${theme.mixins.flexBox({ justify: "space-between" })};
  `}
`;

const LeftSection = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "flex-start" })};
  `}
  flex: 1;
  gap: 10px;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const PinIcon = styled(BsPinAngleFill)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  margin-right: 10px;
`;

const Title = styled.div<{ $type: TodoItem["type"] }>`
  ${({ theme, $type }) => css`
    ${theme.mixins.flexBox({
      direction: $type === "monthly" ? "column" : "row",
      align: $type === "monthly" ? "flex-start" : "center",
      justify: $type === "monthly" ? "center" : "flex-start",
    })}
    gap: 3px;
    flex: 1;
    width: 0px;

    div {
      ${theme.typography.title({ size: $type === "monthly" ? 18 : 20 })};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      span {
        margin-right: 5px;
      }
    }
  `}
`;

const DateText = styled.span`
  ${({ theme }) => css`
    ${theme.typography.p({ size: 12, color: theme.colors.gray2 })};
  `}
`;

const RightSection = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({})};
    gap: 15px;
  `}
`;

import styled, { css, useTheme } from "styled-components";
import { BsPinAngleFill } from "react-icons/bs";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import Button from "../Button";
import { formatDateTime } from "@/utils/formatDate";

interface AccordionHeaderProps {
  item: any;
  type?: "monthly" | "todo";
  onCheck?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function AccordionHeader({
  item,
  type = "todo",
  onCheck,
  onEdit,
  onDelete,
}: AccordionHeaderProps) {
  const { subject, title, date, completed } = item;

  const theme = useTheme();

  return (
    <AccordionHeaderWrapper>
      <LeftSection>
        {type !== "monthly" ? (
          <CheckBox type="checkbox" checked={completed} onChange={onCheck} />
        ) : (
          <PinIcon />
        )}
        <Title $type={type}>
          <div className="title">
            {type !== "monthly" && <span>[{subject}]</span>}
            {title}
          </div>
          {type === "monthly" && <DateText>{formatDateTime(date)}</DateText>}
        </Title>
      </LeftSection>
      <RightSection $type={type}>
        <Button
          onClick={onEdit}
          size={type === "monthly" ? 18 : 20}
          variant="ghost"
          color={theme.colors.gray2}
          style={{ padding: "0" }}
        >
          <HiOutlinePencilAlt />
        </Button>
        <Button
          onClick={onDelete}
          size={type === "monthly" ? 18 : 20}
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
  accent-color: ${({ theme }) => theme.colors.primary};
`;

const PinIcon = styled(BsPinAngleFill)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  margin-right: 3px;
`;

const Title = styled.div<{ $type: string }>`
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
      ${theme.typography.title({ size: $type === "monthly" ? 14 : 18 })};
      width: 100%;
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

const RightSection = styled.div<{ $type: string }>`
  ${({ theme, $type }) => css`
    ${theme.mixins.flexBox({})};
    gap: ${$type === "monthly" ? "10px" : "15px"};
  `}
`;

import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled, { css, useTheme } from "styled-components";

interface AccordionProps {
  type?: "monthly" | "todo";
  header: React.ReactNode;
  children?: string;
  color?: string;
  style?: React.CSSProperties;
}

export default function Accordion({
  type = "todo",
  header,
  children,
  color,
  ...props
}: AccordionProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentHeight, setContentHight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const theme = useTheme();

  return (
    <AccordionWrapper
      $color={color || theme.colors.white}
      $type={type}
      {...props}
    >
      <Header>
        {header}
        {children && (
          <ToggleButton onClick={() => setIsOpen((prev) => !prev)} $type={type}>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </ToggleButton>
        )}
      </Header>
      <Content
        ref={contentRef}
        $type={type}
        $isOpen={isOpen}
        $height={contentHeight}
      >
        {children}
      </Content>
    </AccordionWrapper>
  );
}

const AccordionWrapper = styled.div<{ $color: string; $type: string }>`
  width: 100%;
  min-width: 280px;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
  overflow: hidden;
  box-shadow: ${({ $type }) =>
    $type === "monthly" ? "3px 3px 5px rgba(0, 0, 0, 0.1)" : "none"};
`;

const Header = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })};
    padding: 10px 20px;
  `}
`;

const ToggleButton = styled.button<{ $type: string }>`
  ${({ theme, $type }) => css`
    background-color: transparent;
    padding: 3px;
    color: ${theme.colors.gray2};
    font-size: ${$type === "todo" ? theme.pxToRem(18) : theme.pxToRem(14)};
    margin-left: ${$type === "todo" ? "10px" : "5px"};
    transition: all 0.3s ease-in-out;

    &:hover {
      color: ${theme.colors.darkOrange};
    }
  `}
`;

const Content = styled.div<{
  $type: string;
  $isOpen: boolean;
  $height: number;
}>`
  ${({ theme, $type, $isOpen, $height }) => css`
    ${$type == "todo"
      ? theme.typography.p({})
      : theme.typography.p({ size: 12 })}
    padding-left: ${$type == "todo" ? "60px" : "50px"};
    height: ${$isOpen ? `${$height + 10}px` : "0"};
    transform: ${$isOpen ? "translateY(0)" : "translateY(-10px)"};
    transition: all 0.3s ease;
    overflow: hidden;
  `}
`;

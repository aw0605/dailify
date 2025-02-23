import styled, { css, useTheme } from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

interface AccordionProps {
  header: React.ReactNode;
  children?: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export default function Accordion({
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
    <AccordionWrapper $color={color || theme.colors.white} {...props}>
      <Header>
        {header}
        <ToggleButton onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </ToggleButton>
      </Header>
      <Content ref={contentRef} $isOpen={isOpen} $height={contentHeight}>
        {children}
      </Content>
    </AccordionWrapper>
  );
}

const AccordionWrapper = styled.div<{ $color: string }>`
  width: 100%;
  min-width: 280px;
  border-radius: 10px;
  background-color: ${({ $color }) => $color};
  overflow: hidden;
`;

const Header = styled.div`
  ${({ theme }) => css`
    ${theme.mixins.flexBox({ justify: "space-between" })};
    padding: 10px 20px;
  `}
`;

const ToggleButton = styled.button`
  border: none;
  margin-left: 10px;
  font-size: 18px;
`;

const Content = styled.div<{ $isOpen: boolean; $height: number }>`
  ${({ theme, $isOpen, $height }) => css`
    ${theme.typography.p({})};
    padding: 0 20px 0 60px;
    height: ${$isOpen ? `${$height + 10}px` : "0"};
    transform: ${$isOpen ? "translateY(0)" : "translateY(-10px)"};
    transition: all 0.3s ease;
    overflow: hidden;
  `}
`;

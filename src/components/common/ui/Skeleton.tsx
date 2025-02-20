import styled, { css, keyframes } from "styled-components";

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
}

function Skeleton({
  width = "100%",
  height = "1.25rem",
  radius = "0.125rem",
  ...props
}: SkeletonProps) {
  return (
    <SkeletonDiv $width={width} $height={height} $radius={radius} {...props} />
  );
}

export default Skeleton;

const skeletonGradient = keyframes`
  0%{
    background-color: rgba(165,165,165,0.1)
  }
  50%{
    background-color: rgba(165, 165, 165, 0.3);
  }
  100%{
    background-color: rgba(165,165,165,0.1)
  }
`;

const SkeletonDiv = styled.div<{
  $width: string;
  $height: string;
  $radius: string;
}>`
  ${({ $width, $height, $radius }) => css`
    pointer-events: none;
    width: ${$width};
    height: ${$height};
    border-radius: ${$radius};
    animation: ${skeletonGradient} 1.8s infinite ease-in-out;
  `}
`;

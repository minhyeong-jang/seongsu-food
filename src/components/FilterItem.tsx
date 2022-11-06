import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FC, ReactNode } from "react";

interface Props {
  label?: string;
  fixLabel?: boolean;
  colSpan?: number;
  required?: boolean;
  justifyContent?: "flex-start" | "center" | "flex-end";
  children?: ReactNode;
}
export const FilterItem: FC<Props> = ({
  label,
  required = false,
  fixLabel = true,
  colSpan = 12,
  children,
  justifyContent = "left",
}) => {
  return (
    <StyledWrap colSpan={colSpan}>
      {label && (
        <StyledLabelWrap
          $fixLabel={fixLabel}
          $required={required}
          data-filter='label'
        >
          {label}
        </StyledLabelWrap>
      )}
      <StyledFieldWrap justifyContent={justifyContent}>
        {children}
      </StyledFieldWrap>
    </StyledWrap>
  );
};
const StyledWrap = styled.div<{ colSpan: number }>`
  display: inline-flex;
  width: ${({ colSpan }) => (colSpan / 12) * 100}%;
  padding: 10px;
`;
const StyledLabelWrap = styled.label<{
  $required: boolean;
  $fixLabel: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  min-width: 100px;
  max-width: 100px;
  padding: 0 15px 0 5px;
  font-weight: bold;
  font-size: 12px;

  ${({ $required }) =>
    $required &&
    css`
      &::before {
        position: absolute;
        top: 50%;
        left: -5px;
        color: red;
        font-size: 11px;
        transform: translateY(-50%);
        content: "*";
      }
    `}
  ${({ $fixLabel }) =>
    !$fixLabel &&
    css`
      width: initial !important;
      min-width: initial !important;
      max-width: initial !important;
    `};
`;
const StyledFieldWrap = styled.div<{ justifyContent: string }>`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : "flex-start"};
  overflow: hidden;
`;

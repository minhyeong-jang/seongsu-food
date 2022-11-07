import { FC, ReactNode } from "react";
import { Button } from "antd";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface Props {
  labelWidth?: number;
  isLoading?: boolean;
  submitLabel?: string;
  onSubmit?(): void;
  onReset?(): void;
  children?: ReactNode;
}
export const FilterLayout: FC<Props> = ({
  labelWidth,
  isLoading = false,
  children,
  submitLabel,
  onSubmit,
  onReset,
  ...props
}) => {
  return (
    <StyledContainer $labelWidth={labelWidth} {...props}>
      {children}
      <StyledActionWrap>
        {onSubmit && (
          <StyledActionButton
            disabled={isLoading}
            type='primary'
            onClick={() => onSubmit()}
          >
            {submitLabel || "검색"}
          </StyledActionButton>
        )}
        {onReset && (
          <StyledActionButton
            disabled={isLoading}
            type='primary'
            onClick={() => onReset()}
          >
            전체선택/해제
          </StyledActionButton>
        )}
      </StyledActionWrap>
    </StyledContainer>
  );
};
const StyledContainer = styled.div<{ $labelWidth?: number }>`
  margin: 0px;
  padding: 6px 6px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;

  ${({ $labelWidth }) =>
    $labelWidth &&
    css`
      label[data-filter="label"] {
        width: ${$labelWidth}px;
        min-width: ${$labelWidth}px;
        max-width: ${$labelWidth}px;
      }
    `}
`;
const StyledActionWrap = styled.div`
  text-align: right;
`;
const StyledActionButton = styled(Button)`
  margin: 4px 4px 8px;
  font-size: 12px;
  border-radius: 4px;
`;

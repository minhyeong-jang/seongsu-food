import { FC, ReactNode } from "react";
import { PageHeader } from "antd";
import { PageHeaderProps } from "antd/lib/page-header";
import styled from "@emotion/styled";

type Props = Omit<PageHeaderProps, "title"> & {
  title?: ReactNode | string;
};

export const PageTemplate: FC<Props> = ({ title, children, ...props }) => {
  return (
    <>
      <StyledPageHeader title={title || ""} {...props} />
      <StyledContent>{children}</StyledContent>
    </>
  );
};
const StyledPageHeader = styled(PageHeader)`
  & {
    border-bottom: 2px solid #eee;

    &.ant-page-header {
      padding: 10px 24px;
      background: #fff;

      & > div.ant-page-header-content {
        margin-top: 10px;
        border-top: 1px solid #eee;
      }
    }
  }
`;
const StyledContent = styled.div`
  max-width: 1280px;
  padding: 12px;
  margin: 0 auto;

  * {
    box-sizing: border-box;
  }
`;

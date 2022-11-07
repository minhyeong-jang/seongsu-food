import { Table } from "antd";
import Button, { ButtonProps } from "antd/lib/button";
import { PaginationProps } from "antd/lib/pagination";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import { FC, ReactNode, useMemo, useState } from "react";
import styled from "@emotion/styled";

interface Props extends Omit<TableProps<any>, "title"> {
  title?: ReactNode;
  pagination?: PaginationProps;
  defaultPageSize?: number;
  usePageSize?: boolean;
  loading?: boolean;
  buttons?: ButtonType[];
}
interface ButtonType extends ButtonProps {
  label: string;
}
export const DataTable: FC<Props> = ({
  title,
  buttons,
  pagination,
  defaultPageSize = 20,
  loading = false,
  ...props
}) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const paginationOption = useMemo(() => {
    if (pagination) {
      const config: TablePaginationConfig = {
        pageSize,
        showTotal: (total: number, range: [number, number]) =>
          `총 ${total.toLocaleString()} 개 ( ${range[0].toLocaleString()}-${range[1].toLocaleString()} )`,
        total: pagination.total,
        onChange: (_, pageSize) => setPageSize(pageSize),
      };
      if (typeof pagination.current === "number") {
        config.current = pagination.current + 1;
      }
      return config;
    }
    return false;
  }, [pagination, pageSize]);

  return (
    <StyledWrap $isScroll={!!props.scroll}>
      {(pagination || buttons) && (
        <StyledHeader>
          {title && <StyledTitle>{title}</StyledTitle>}

          {typeof pagination?.total === "number" && (
            <StyledTotal>
              Total: {pagination?.total.toLocaleString()}
            </StyledTotal>
          )}
          <StyledRightButtonWrap>
            {buttons?.map((button, index) => (
              <StyledButton
                key={index}
                type='primary'
                disabled={loading}
                onClick={button.onClick}
              >
                {button.label}
              </StyledButton>
            ))}
          </StyledRightButtonWrap>
        </StyledHeader>
      )}
      <StyledTableWrap>
        <Table
          loading={loading}
          pagination={paginationOption}
          bordered
          {...props}
        />
      </StyledTableWrap>
    </StyledWrap>
  );
};

const StyledWrap = styled.div<{ $isScroll: boolean }>`
  min-height: 32px;
  margin: 12px 0px;

  .ant-table-title {
    padding: 0 0 9px 0 !important;
    border: 0 !important;
  }
  .ant-table-thead th {
    font-size: 12px;
    padding: 10px 0 !important;
    font-weight: 400;
    border: 0;
    text-align: center !important;
  }
  .ant-table-tbody tr {
    td {
      padding: 12px 8px;
      font-size: 12px;
    }
  }
`;
const StyledTableWrap = styled.div`
  overflow: hidden;
  border-radius: 4px;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px 0;
`;
const StyledTotal = styled.span`
  display: inline-flex;
  align-self: center;
  font-weight: bold;
  font-size: 11px;
  white-space: break-spaces;
`;
const StyledRightButtonWrap = styled.div`
  margin-left: auto;
  text-align: right;

  button {
    margin-left: 8px;
  }
`;
const StyledButton = styled(Button)`
  font-size: 12px;
  border-radius: 4px;
`;
const StyledTitle = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

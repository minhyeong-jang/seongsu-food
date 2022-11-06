import { FC, useMemo } from "react";
import { DataTable } from "../components";
import { FoodDataItemModel } from "../types";
import { ColumnProps } from "antd/lib/table";

interface Props {
  categories: string[];
  list: FoodDataItemModel[];
}
export const NaverFoodPriceTableContainer: FC<Props> = ({
  categories,
  list,
}) => {
  const dataSource = useMemo(
    () =>
      list.filter(
        (item) =>
          item.category.findIndex((item) => categories.includes(item)) !== -1
      ),
    [categories, list]
  );
  const totalPrice = useMemo(() => {
    let price = 0;
    let removeListLength = 0;
    dataSource.map((item) => {
      let removeLength = 0;
      const list = item.menuInfo?.match(/\s([\d,]*)/gm) || [];
      const listPrice = list.reduce((prev, curr) => {
        const currPrice = parseInt(curr.replace(/[\s,]*/gm, ""));
        if (isNaN(currPrice) || !currPrice) {
          removeLength += 1;
          return prev;
        }
        return (prev += currPrice);
      }, 0);
      if (!(list.length - removeLength)) {
        removeListLength += 1;
        return null;
      }
      price += listPrice / (list.length - removeLength);
      return null;
    });
    return price / (dataSource.length - removeListLength || 1);
  }, [dataSource]);

  const columns: ColumnProps<FoodDataItemModel>[] = [
    {
      align: "center",
      dataIndex: "display",
      key: "display",
      render: (text: string, record) =>
        record.display.replace(/<\/?[^<]*>/gm, " "),
      title: "상호명",
      width: 140,
    },
    {
      align: "center",
      dataIndex: "category",
      key: "category",
      render: (_, record) => record.category.join(", "),
      title: "카테고리",
      width: 180,
    },
    {
      align: "center",
      dataIndex: "menu",
      key: "menu",
      render: (_, record) => record.menuInfo,
      title: "메뉴",
    },
  ];
  return (
    <DataTable
      buttons={[
        {
          label: `평균 : ${Math.floor(totalPrice).toLocaleString()}원`,
          onClick: () => {},
          type: "primary",
        },
      ]}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: 20,
        total: dataSource.length,
      }}
      rowKey={(record) => `${record.id}`}
    />
  );
};

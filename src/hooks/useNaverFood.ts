import { message } from "antd";
import { useCallback, useState } from "react";
import dataJson from "../construct/FoodData.json";
import { FoodDataItemModel, FoodDataModel } from "../types";

const MAX_LENGTH = 100;

export const useNaverFood = () => {
  const [list, setList] = useState<FoodDataItemModel[]>(dataJson.list);
  const [data, setData] = useState(dataJson as FoodDataModel);

  const getFoodList = useCallback(async (keyword: string, page: number) => {
    fetch(
      `https://map.naver.com/v5/api/search?caller=pcweb&query=${encodeURIComponent(
        keyword
      )}&type=place&searchCoord=127.05764445665966;37.54419892779697&boundary=127.05418904808732;37.54052935114869;127.06665072238349;37.54775829958898&lang=ko
      &displayCount=${MAX_LENGTH}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setList((prev) => [
            ...prev,
            ...data.result.place.list.map((item: FoodDataItemModel) => ({
              id: item.id,
              category: item.category,
              display: item.display,
              menuInfo: item.menuInfo,
            })),
          ]);
        }
      })
      .catch((e) => message.error(e));
  }, []);

  const onSubmit = (keyword: string) => {
    for (let i = 1; i < 4; i++) {
      setTimeout(() => {
        getFoodList(keyword, i);
      }, i * 1000);
    }
  };

  console.log(list);
  return {
    data,
    onSubmit,
  };
};

import { message } from "antd";
import { useCallback, useState } from "react";
import dataJson from "../construct/FoodData.json";
import { FoodDataModel } from "../types";

const MAX_LENGTH = 100;

export const useNaverFood = () => {
  const [keyword, setKeyword] = useState("음식점");
  const [data, setData] = useState(dataJson as FoodDataModel);

  const getFoodList = useCallback(async () => {
    fetch(
      `https://map.naver.com/v5/api/search?caller=pcweb&query=${encodeURIComponent(
        keyword
      )}&page=4&type=all&lang=ko&searchCoord=127.05236625223688;37.54474862776625&boundary=127.04842876940586;37.54023996465125;127.06488680392033;37.54908689522702&displayCount=${MAX_LENGTH}`
    )
      .then((res) => res.json())
      .catch((e) => message.error(e));
  }, [keyword]);

  return {
    data,
    keyword,
    getFoodList,
  };
};

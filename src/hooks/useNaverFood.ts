import { message } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SeongsuFoodDataJson from "../construct/SeongsuFoodData.json";
import SinsaFoodDataJson from "../construct/SinsaFoodData.json";
import { FoodDataItemModel } from "../types";

const MAX_LENGTH = 100;

export const placeList = [
  {
    key: "seongsu",
    name: "성수동",
    data: SeongsuFoodDataJson,
    keyword: "음식점",
  },
  {
    key: "sinsa",
    name: "신사동",
    data: SinsaFoodDataJson,
    keyword: "음식점",
  },
];
export const useNaverFood = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectPlace, setSelectPlace] = useState<string>();
  const list: FoodDataItemModel[] =
    placeList.find((place) => place.key === selectPlace)?.data.list || [];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
          // setList((prev) => [
          //   ...prev||[],
          //   ...data.result.place.list.map((item: FoodDataItemModel) => ({
          //     id: item.id,
          //     category: item.category,
          //     display: item.display,
          //     menuInfo: item.menuInfo,
          //   })),
          // ]);
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

  const onCheckAll = useCallback((place: string) => {
    const selectedPlaceData =
      placeList.find((item) => item.key === place)?.data.list || [];
    const allCategories = selectedPlaceData.reduce((acc: string[], item) => {
      item.category.forEach((cat: string) => {
        if (!acc.includes(cat)) {
          acc.push(cat);
        }
      });
      return acc;
    }, []);
    setSelectedCategories(allCategories);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const localeParam = searchParams.get("locale");
    const categoriesParam = searchParams.get("categories");

    const matchedPlace =
      placeList.find((place) => place.key === localeParam) || placeList[0];

    setSelectPlace(matchedPlace.key);
    console.log("🚀 ~ useEffect ~ categoriesParam:", categoriesParam);
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split("|"));
    } else {
      onCheckAll(matchedPlace.key);
    }
  }, [onCheckAll]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (selectedCategories.length > 0) {
      searchParams.set("categories", selectedCategories.join("|"));
    } else {
      searchParams.delete("categories");
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  }, [selectedCategories, navigate, location.pathname, location.search]);

  return {
    list: list || [],
    onSubmit,
    selectPlace,
    setSelectPlace,
    selectedCategories,
    setSelectedCategories,
    onCheckAll,
  };
};

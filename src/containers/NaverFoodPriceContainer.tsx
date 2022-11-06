import { FC, useState } from "react";
import { PageTemplate } from "../components";
import { useNaverFood } from "../hooks";
import { FOOD_CATEGORY } from "../construct";
import { NaverFoodPriceTableContainer } from "./NaverFoodPriceTableContainer";
import { NaverFoodPriceFilterContainer } from "./NaverFoodPriceFilterContainer";

export const NaverFoodPriceContainer: FC = () => {
  const { data, keyword } = useNaverFood();
  const [categories, setCategories] = useState<string[]>(FOOD_CATEGORY);

  return (
    <PageTemplate
      subTitle='네이버 맵 기반 음식점 수집'
      title='성수역 음식점 수집'
    >
      <NaverFoodPriceFilterContainer
        keyword={keyword}
        list={data.list}
        categories={categories}
        onCategoryChange={setCategories}
      />
      <NaverFoodPriceTableContainer categories={categories} list={data.list} />
    </PageTemplate>
  );
};

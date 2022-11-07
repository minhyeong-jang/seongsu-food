import { FC, useState } from "react";
import { PageTemplate } from "../components";
import { useNaverFood } from "../hooks";
import { NaverFoodPriceTableContainer } from "./NaverFoodPriceTableContainer";
import { NaverFoodPriceFilterContainer } from "./NaverFoodPriceFilterContainer";

export const NaverFoodPriceContainer: FC = () => {
  const { data, onSubmit } = useNaverFood();
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <PageTemplate
      subTitle='네이버 맵 기반 음식점 수집'
      title='성수역 음식점 수집'
    >
      <NaverFoodPriceFilterContainer
        list={data.list}
        categories={categories}
        onSubmit={onSubmit}
        onCategoryChange={setCategories}
      />
      <NaverFoodPriceTableContainer categories={categories} list={data.list} />
    </PageTemplate>
  );
};

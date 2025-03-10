import { FC, useMemo } from "react";
import { PageTemplate } from "../components";
import { useNaverFood } from "../hooks";
import { NaverFoodPriceTableContainer } from "./NaverFoodPriceTableContainer";
import { NaverFoodPriceFilterContainer } from "./NaverFoodPriceFilterContainer";
import { CAFE_CATEGORY, DINNER_CATEGORY } from "../construct";


export const NaverFoodPriceContainer: FC = () => {
  const { list, onSubmit, selectPlace, setSelectPlace, onCheckAll, selectedCategories, setSelectedCategories } = useNaverFood();  
  const categoryUniq = useMemo(() => {
    let category: string[] = [];
    list.forEach((item) =>
      item.category.map((item) => category.push(item as string))
    );
    const uniqCategory = Array.from(new Set([...category])).sort();
    return uniqCategory.map((item) => ({
      label: item,
      value: item,
    }));
  }, [list]);

  const categories = useMemo(() => {
    return {
      foodCategory: categoryUniq.filter(
        (category) =>
          !CAFE_CATEGORY.includes(category.label) &&
          !DINNER_CATEGORY.includes(category.label)
      ),
      cafeCategory: categoryUniq.filter((category) => CAFE_CATEGORY.includes(category.label)),
      dinnerCategory: categoryUniq.filter((category) =>
        DINNER_CATEGORY.includes(category.label)
      ),
    }
  }, [categoryUniq]);

  return (
    <PageTemplate
      subTitle='네이버 맵 기반으로 음식점 평균 가격을 비교해보세요'
      title='음식점 평균 가격'
    >
      <NaverFoodPriceFilterContainer
        selectPlace={selectPlace || ""}
        setSelectPlace={setSelectPlace}
        list={list}
        categoryUniq={categoryUniq}
        categories={categories}
        onSubmit={onSubmit}
        onCategoryChange={setSelectedCategories}
        selectedCategories={selectedCategories}
        onCheckAll={onCheckAll}
      />
      <NaverFoodPriceTableContainer categories={selectedCategories} list={list} />
    </PageTemplate>
  );
};

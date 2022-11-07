import { FC, useEffect, useMemo, useState } from "react";
import {
  FilterCheckboxGroup,
  FilterInput,
  FilterItem,
  FilterLayout,
} from "../components";
import { CAFE_CATEGORY, DINNER_CATEGORY } from "../construct";
import { FoodDataItemModel } from "../types";

interface Props {
  list: FoodDataItemModel[];
  categories: string[];
  onCategoryChange(value: string[]): void;
  onSubmit(keyword: string): void;
}
const initCategory = {
  foodCategory: [],
  cafeCategory: [],
  dinnerCategory: [],
} as { [key: string]: string[] };
export const NaverFoodPriceFilterContainer: FC<Props> = ({
  list,
  categories,
  onCategoryChange,
  onSubmit,
}) => {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initCategory);

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

  const [foodCategory, cafeCategory, dinnerCategory] = useMemo(() => {
    return [
      categoryUniq.filter(
        (category) =>
          !CAFE_CATEGORY.includes(category.label) &&
          !DINNER_CATEGORY.includes(category.label)
      ),
      categoryUniq.filter((category) => CAFE_CATEGORY.includes(category.label)),
      categoryUniq.filter((category) =>
        DINNER_CATEGORY.includes(category.label)
      ),
    ];
  }, [categoryUniq]);

  const onChange = (key: string, categories: string[]) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [key]: categories,
    }));
  };

  const onAllClick = () => {
    if (categories.length === categoryUniq.length) {
      setSelectedCategory(initCategory);
    } else {
      setSelectedCategory({
        foodCategory: foodCategory.map((item) => item.value),
        cafeCategory: cafeCategory.map((item) => item.value),
        dinnerCategory: dinnerCategory.map((item) => item.value),
      });
    }
  };

  useEffect(() => {
    onCategoryChange([
      ...selectedCategory.foodCategory,
      ...selectedCategory.cafeCategory,
      ...selectedCategory.dinnerCategory,
    ]);
  }, [onCategoryChange, selectedCategory]);

  useEffect(() => {
    onAllClick();
  }, []);

  return (
    <FilterLayout onReset={onAllClick} onSubmit={() => onSubmit(keyword)}>
      <FilterItem colSpan={3} label='검색어'>
        <FilterInput
          placeholder='음식점'
          value={keyword}
          disabled
          onChange={setKeyword}
        />
      </FilterItem>
      <FilterItem label='음식점'>
        <FilterCheckboxGroup
          items={foodCategory}
          value={selectedCategory.foodCategory}
          onChange={(value: string[]) => onChange("foodCategory", value)}
        />
      </FilterItem>
      <FilterItem label='카페/샐러드'>
        <FilterCheckboxGroup
          items={cafeCategory}
          value={selectedCategory.cafeCategory}
          onChange={(value: string[]) => onChange("cafeCategory", value)}
        />
      </FilterItem>
      <FilterItem label='저녁메뉴'>
        <FilterCheckboxGroup
          items={dinnerCategory}
          value={selectedCategory.dinnerCategory}
          onChange={(value: string[]) => onChange("dinnerCategory", value)}
        />
      </FilterItem>
    </FilterLayout>
  );
};

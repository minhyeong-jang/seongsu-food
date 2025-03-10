import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  FilterCheckboxGroup,
  FilterInput,
  FilterItem,
  FilterLayout,
  FilterSelect,
} from "../components";
import { CAFE_CATEGORY, DINNER_CATEGORY } from "../construct";
import { FoodDataItemModel } from "../types";
import { placeList } from "../hooks";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  list: FoodDataItemModel[];
  categories: {
    foodCategory: { label: string; value: string }[];
    cafeCategory: { label: string; value: string }[];
    dinnerCategory: { label: string; value: string }[];
  };
  categoryUniq: { label: string; value: string }[];
  onCategoryChange(value: string[]): void;
  onSubmit(keyword: string): void;
  selectPlace: string;
  setSelectPlace(place: string): void;
  selectedCategories: string[];
  onCheckAll(place: string): void;
}
export const NaverFoodPriceFilterContainer: FC<Props> = ({
  list,
  categories,
  categoryUniq,
  onCategoryChange,
  onSubmit,
  selectPlace,
  setSelectPlace,
  selectedCategories,
  onCheckAll,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (
    categoryType: "foodCategory" | "cafeCategory" | "dinnerCategory",
    newValues: string[]
  ) => {
    const currentFoodCategories =
      categoryType === "foodCategory"
        ? newValues
        : selectedCategories.filter((cat) =>
            categories.foodCategory.some((f) => f.value === cat)
          );
    const currentCafeCategories =
      categoryType === "cafeCategory"
        ? newValues
        : selectedCategories.filter((cat) =>
            categories.cafeCategory.some((c) => c.value === cat)
          );
    const currentDinnerCategories =
      categoryType === "dinnerCategory"
        ? newValues
        : selectedCategories.filter((cat) =>
            categories.dinnerCategory.some((d) => d.value === cat)
          );

    const allCategories = [
      ...currentFoodCategories,
      ...currentCafeCategories,
      ...currentDinnerCategories,
    ];

    onCategoryChange(allCategories);
  };

  const onAllChecked = useCallback(() => {
    onCategoryChange([
      ...categories.foodCategory.map((item) => item.value),
      ...categories.cafeCategory.map((item) => item.value),
      ...categories.dinnerCategory.map((item) => item.value),
    ]);
  }, [
    categories.cafeCategory,
    categories.dinnerCategory,
    categories.foodCategory,
    onCategoryChange,
  ]);

  const onAllClick = () => {
    if (selectedCategories.length === categoryUniq.length) {
      onCategoryChange([]);
    } else {
      onAllChecked();
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [onCategoryChange, selectedCategories]);

  return (
    <FilterLayout onReset={onAllClick}>
      <FilterItem colSpan={3} label="검색어">
        <FilterSelect
          options={placeList.map((item) => ({
            label: `${item.name} (검색어 : ${item.keyword})`,
            value: item.key,
          }))}
          value={selectPlace}
          onChange={(value) => {
            setSelectPlace(value);
            onCheckAll(value);
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("locale", value);
            navigate(`${location.pathname}?${searchParams.toString()}`, {
              replace: true,
            });
          }}
        />
      </FilterItem>
      <FilterItem label="음식점">
        <FilterCheckboxGroup
          items={categories.foodCategory}
          value={selectedCategories.filter((cat) =>
            categories.foodCategory.some((f) => f.value === cat)
          )}
          onChange={(value: string[]) => onChange("foodCategory", value)}
        />
      </FilterItem>
      <FilterItem label="카페/샐러드">
        <FilterCheckboxGroup
          items={categories.cafeCategory}
          value={selectedCategories.filter((cat) =>
            categories.cafeCategory.some((c) => c.value === cat)
          )}
          onChange={(value: string[]) => onChange("cafeCategory", value)}
        />
      </FilterItem>
      <FilterItem label="저녁메뉴">
        <FilterCheckboxGroup
          items={categories.dinnerCategory}
          value={selectedCategories.filter((cat) =>
            categories.dinnerCategory.some((d) => d.value === cat)
          )}
          onChange={(value: string[]) => onChange("dinnerCategory", value)}
        />
      </FilterItem>
    </FilterLayout>
  );
};

import styled from "@emotion/styled";
import { Button } from "antd";
import { FC, useMemo } from "react";
import {
  FilterCheckboxGroup,
  FilterInput,
  FilterItem,
  FilterLayout,
} from "../components";
import { FoodDataItemModel } from "../types";

interface Props {
  keyword: string;
  list: FoodDataItemModel[];
  categories: string[];
  onCategoryChange(value: string[]): void;
}
export const NaverFoodPriceFilterContainer: FC<Props> = ({
  keyword,
  list,
  categories,
  onCategoryChange,
}) => {
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
  const onAllClick = () => {
    if (categories.length === categoryUniq.length) {
      onCategoryChange([]);
    } else {
      onCategoryChange(categoryUniq.map((item) => item.value));
    }
  };
  return (
    <FilterLayout>
      <FilterItem colSpan={3} label='검색어'>
        <FilterInput
          disabled={true}
          placeholder='음식점'
          value={keyword}
          // onChange={setKeyword}
        />
      </FilterItem>
      <FilterItem label='카테고리'>
        <FilterCheckboxGroup
          items={categoryUniq}
          value={categories}
          onChange={onCategoryChange}
        />
        <StyledButton type='primary' size='small' onClick={onAllClick}>
          전체 선택/해제
        </StyledButton>
      </FilterItem>
    </FilterLayout>
  );
};

const StyledButton = styled(Button)`
  font-size: 11px;
  border-radius: 4px;
`;

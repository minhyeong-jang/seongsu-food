export interface FoodDataModel {
  list: FoodDataItemModel[];
}
export interface FoodDataItemModel {
  category: string[];
  display: string;
  menuInfo: string | null;
}

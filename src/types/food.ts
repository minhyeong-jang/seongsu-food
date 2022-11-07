export interface FoodDataModel {
  list: FoodDataItemModel[];
}
export interface FoodDataItemModel {
  id: string;
  category: string[];
  display: string;
  menuInfo: string | null;
}

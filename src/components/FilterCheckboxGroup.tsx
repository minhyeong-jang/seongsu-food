import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import styled from "@emotion/styled";

const CheckboxGroup = Checkbox.Group;

interface Props<T> {
  items: {
    value: T;
    label: string;
  }[];
  value: CheckboxValueType[];
  isMutiple?: boolean;
  onChange(value: CheckboxValueType[]): void;
}
export const FilterCheckboxGroup = <T extends string | number>({
  items,
  value,
  onChange,
  ...props
}: Props<T>) => {
  return (
    <StyledCheckboxGroup
      options={items}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const StyledCheckboxGroup = styled(CheckboxGroup)`
  label {
    font-size: 12px !important;
  }
`;

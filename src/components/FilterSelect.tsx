import { Select } from "antd";
import { FC } from "react";


interface Props {
  options: { label: string; value: string }[];
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange?(keyword: string): void;
}
export const FilterSelect: FC<Props> = ({
  placeholder,
  value,
  disabled = false,
  onChange,
  ...props
}) => {
  return (
    <Select
      {...props}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e)}
    />
  );
};

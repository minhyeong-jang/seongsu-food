import { FC } from "react";
import { Input } from "antd";

interface Props {
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange?(keyword: string): void;
}
export const FilterInput: FC<Props> = ({
  placeholder,
  value,
  disabled = false,
  onChange,
  ...props
}) => {
  return (
    <Input
      {...props}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
    />
  );
};

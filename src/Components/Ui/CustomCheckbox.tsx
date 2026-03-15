import type { ReactNode } from "react";
import type { CheckboxChangeEvent } from "primereact/checkbox";
import { Checkbox } from "primereact/checkbox";

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (e: CheckboxChangeEvent) => void;
  label: ReactNode;
}

export default function CustomCheckbox({
  id,
  checked,
  onChange,
  label,
}: CustomCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        inputId={id}
        checked={checked}
        onChange={onChange}
        className="custom-orange-checkbox"
      />
      <label htmlFor={id} className="cursor-pointer">
        {label}
      </label>
    </div>
  );
}

import {
  TextInput as TextInputPrimitive,
  type TextInputProps as TextInputPrimitiveProps,
} from "@mantine/core";

type InputPrimitive2Props = React.InputHTMLAttributes<HTMLInputElement>;

export type TextInputProps = {
  label?: string;
  autoComplete?: string;
  error?: string;
};

export function TextInput({ label, autoComplete, error }: TextInputProps) {
  return (
    <TextInputPrimitive
      label={label}
      autoComplete={autoComplete}
      error={error}
    />
  );
}

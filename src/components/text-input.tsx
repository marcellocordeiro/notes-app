import {
  TextInput as TextInputPrimitive,
  type TextInputProps as TextInputPrimitiveProps,
} from "@mantine/core";
import { forwardRef } from "react";

type Ref = React.ElementRef<typeof TextInputPrimitive>;

export type TextInputProps = TextInputPrimitiveProps;

export const TextInput = forwardRef<Ref, TextInputProps>(
  ({ ...props }, ref) => {
    return <TextInputPrimitive ref={ref} {...props} />;
  },
);

TextInput.displayName = "TextInput";

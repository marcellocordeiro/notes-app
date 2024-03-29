import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type {
  UseFormReturn,
  UseFormProps,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import type { ZodType, ZodTypeDef } from "zod";

type FormProps<TFormValues extends FieldValues, Schema> = {
  id?: string;
  schema?: Schema;
  options?: UseFormProps<TFormValues>;
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

export function Form<
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >,
>({
  id,
  schema,
  options,
  className,
  onSubmit,
  children,
}: FormProps<TFormValues, Schema>) {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema != null ? zodResolver(schema) : undefined,
  });

  return (
    <form
      id={id}
      className={className}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      {children(methods)}
    </form>
  );
}

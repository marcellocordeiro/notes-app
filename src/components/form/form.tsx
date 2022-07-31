import { useForm } from "react-hook-form";

import type {
  UseFormReturn,
  UseFormProps,
  SubmitHandler,
} from "react-hook-form";

type FormProps<TFormValues> = {
  id?: string;
  options?: UseFormProps<TFormValues>;
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>
>({
  id,
  options,
  className,
  onSubmit,
  children,
}: FormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });

  return (
    <form
      id={id}
      className={className}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      {children(methods)}
    </form>
  );
};

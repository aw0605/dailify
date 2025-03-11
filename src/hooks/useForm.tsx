import { useState, useMemo, useCallback, ChangeEvent } from "react";
import { ValidationErrors } from "@/utils/validate";

interface UseFormProps<T> {
  initialValues: T;
  validate?: (values: T) => ValidationErrors;
  onSubmit: (values: T) => void;
}

function useForm<T>({ initialValues, validate, onSubmit }: UseFormProps<T>) {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [dirty, setDirty] = useState<Partial<T>>({});

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDirty((prev) => ({
        ...prev,
        [e.target.name]: true,
      }));
    },
    [],
  );

  const errors = useMemo(
    () => (validate ? validate(formValues) : {}),
    [formValues, validate],
  );
  const isAble = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAble) onSubmit(formValues);
  };

  return {
    formValues,
    setFormValues,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    dirty,
    isAble,
  };
}

export default useForm;

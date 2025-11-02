import * as React from "react";

/**
 * Field validator interface.
 */
export interface FieldValidator<T = any> {
  validate: (value: T, formValues?: Record<string, any>) => string | null;
  message?: string;
}

/**
 * Built-in validators for common validation scenarios.
 */
export const validators = {
  /**
   * Validates that a field is not empty.
   */
  required: (message = "This field is required"): FieldValidator => ({
    validate: (value) => {
      if (value === null || value === undefined || value === "") {
        return message;
      }
      if (Array.isArray(value) && value.length === 0) {
        return message;
      }
      return null;
    },
  }),

  /**
   * Validates email format.
   */
  email: (message = "Invalid email address"): FieldValidator => ({
    validate: (value) => {
      if (!value) return null; // Only validate if value exists
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(String(value)) ? null : message;
    },
  }),

  /**
   * Validates minimum string length or number value.
   */
  min: (min: number, message?: string): FieldValidator => ({
    validate: (value) => {
      if (value === null || value === undefined) return null;

      if (typeof value === "string") {
        return value.length >= min
          ? null
          : message || `Minimum length is ${min} characters`;
      }

      if (typeof value === "number") {
        return value >= min ? null : message || `Minimum value is ${min}`;
      }

      return null;
    },
  }),

  /**
   * Validates maximum string length or number value.
   */
  max: (max: number, message?: string): FieldValidator => ({
    validate: (value) => {
      if (value === null || value === undefined) return null;

      if (typeof value === "string") {
        return value.length <= max
          ? null
          : message || `Maximum length is ${max} characters`;
      }

      if (typeof value === "number") {
        return value <= max ? null : message || `Maximum value is ${max}`;
      }

      return null;
    },
  }),

  /**
   * Validates against a regex pattern.
   */
  pattern: (pattern: RegExp, message = "Invalid format"): FieldValidator => ({
    validate: (value) => {
      if (!value) return null;
      return pattern.test(String(value)) ? null : message;
    },
  }),

  /**
   * Validates that a value matches another field (e.g., password confirmation).
   */
  match: (fieldName: string, message?: string): FieldValidator => ({
    validate: (value, formValues) => {
      if (!formValues) return null;
      return value === formValues[fieldName]
        ? null
        : message || `Must match ${fieldName}`;
    },
  }),

  /**
   * Validates URL format.
   */
  url: (message = "Invalid URL"): FieldValidator => ({
    validate: (value) => {
      if (!value) return null;
      try {
        new URL(String(value));
        return null;
      } catch {
        return message;
      }
    },
  }),

  /**
   * Validates number is an integer.
   */
  integer: (message = "Must be an integer"): FieldValidator => ({
    validate: (value) => {
      if (value === null || value === undefined) return null;
      return Number.isInteger(Number(value)) ? null : message;
    },
  }),

  /**
   * Custom validator function.
   */
  custom: (
    validate: (value: any, formValues?: Record<string, any>) => boolean,
    message = "Invalid value"
  ): FieldValidator => ({
    validate: (value, formValues) => {
      return validate(value, formValues) ? null : message;
    },
  }),
};

/**
 * Field configuration for useForm.
 */
export interface FieldConfig<T = any> {
  initialValue?: T;
  validators?: FieldValidator<T>[];
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Form configuration for useForm.
 */
export interface FormConfig<T extends Record<string, any>> {
  initialValues?: Partial<T>;
  fields?: Record<keyof T, FieldConfig>;
  onSubmit?: (values: T) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

/**
 * Form state returned by useForm.
 */
export interface FormState<T extends Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValidating: boolean;
  isDirty: boolean;
}

/**
 * Form actions returned by useForm.
 */
export interface FormActions<T extends Record<string, any>> {
  setValue: (name: keyof T, value: any) => void;
  setError: (name: keyof T, error: string) => void;
  setTouched: (name: keyof T, touched: boolean) => void;
  validateField: (name: keyof T) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  handleChange: (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (name: keyof T) => () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

/**
 * Custom form hook with validation support.
 * No external dependencies - built entirely in-house.
 *
 * @param config - Form configuration
 * @returns Form state and actions
 *
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm({
 *   initialValues: { email: '', password: '' },
 *   fields: {
 *     email: {
 *       validators: [validators.required(), validators.email()],
 *     },
 *     password: {
 *       validators: [validators.required(), validators.min(8)],
 *     },
 *   },
 *   onSubmit: async (values) => {
 *     await login(values);
 *   },
 * });
 */
export function useForm<T extends Record<string, any>>(
  config: FormConfig<T> = {}
): FormState<T> & FormActions<T> {
  const {
    initialValues = {} as T,
    fields = {},
    onSubmit,
    validateOnChange = false,
    validateOnBlur = true,
  } = config;

  // State
  const [values, setValues] = React.useState<T>(initialValues as T);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouchedState] = React.useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isValidating, setIsValidating] = React.useState(false);

  // Calculate isDirty
  const isDirty = React.useMemo(() => {
    return Object.keys(values as object).some(
      (key) => (values as any)[key] !== (initialValues as any)[key]
    );
  }, [values, initialValues]);

  // Actions
  const setValue = React.useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setError = React.useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const setTouched = React.useCallback((name: keyof T, touchedValue: boolean) => {
    setTouchedState((prev) => ({ ...prev, [name]: touchedValue }));
  }, []);

  const validateField = React.useCallback(
    async (name: keyof T): Promise<boolean> => {
      const fieldConfig = (fields as any)[name];
      if (!fieldConfig?.validators) return true;

      const value = (values as any)[name];
      let error: string | null = null;

      for (const validator of fieldConfig.validators) {
        error = validator.validate(value, values);
        if (error) break;
      }

      if (error) {
        setError(name, error);
        return false;
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
        return true;
      }
    },
    [fields, values, setError]
  );

  const validateForm = React.useCallback(async (): Promise<boolean> => {
    setIsValidating(true);

    const validationPromises = Object.keys(fields as object).map((name) =>
      validateField(name as keyof T)
    );

    const results = await Promise.all(validationPromises);
    setIsValidating(false);

    return results.every((result) => result === true);
  }, [fields, validateField]);

  const handleChange = React.useCallback(
    (name: keyof T) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

        setValue(name, value);

        const fieldConfig = (fields as any)[name];
        const shouldValidate = fieldConfig?.validateOnChange ?? validateOnChange;

        if (shouldValidate) {
          validateField(name);
        }
      },
    [setValue, fields, validateOnChange, validateField]
  );

  const handleBlur = React.useCallback(
    (name: keyof T) => () => {
      setTouched(name, true);

      const fieldConfig = (fields as any)[name];
      const shouldValidate = fieldConfig?.validateOnBlur ?? validateOnBlur;

      if (shouldValidate) {
        validateField(name);
      }
    },
    [setTouched, fields, validateOnBlur, validateField]
  );

  const handleSubmit = React.useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();

      // Mark all fields as touched
      const allTouched: Partial<Record<keyof T, boolean>> = {};
      Object.keys(fields).forEach((key) => {
        allTouched[key as keyof T] = true;
      });
      setTouchedState(allTouched);

      // Validate form
      const isValid = await validateForm();

      if (!isValid) return;

      // Submit
      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } catch (error) {
          console.error("Form submission error:", error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [fields, validateForm, onSubmit, values]
  );

  const reset = React.useCallback(() => {
    setValues(initialValues as T);
    setErrors({});
    setTouchedState({});
  }, [initialValues]);

  return {
    // State
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    isDirty,

    // Actions
    setValue,
    setError,
    setTouched,
    validateField,
    validateForm,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

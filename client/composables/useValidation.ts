import { z, type ZodRawShape } from 'zod';

export const useValidation = () => {
  const { t } = useI18n();

  const validators = {
    minLength: (min: number) =>
      z
        .string({
          required_error: t('validators.required'),
          invalid_type_error: t('validators.required'),
        })
        .min(min, t('validators.minLength', { min })),
    email: z
      .string({
        required_error: t('validators.required'),
        invalid_type_error: t('validators.required'),
      })
      .min(1, t('validators.required'))
      .email(t('validators.email')),
    required: z
      .string({
        required_error: t('validators.required'),
        invalid_type_error: t('validators.required'),
      })
      .min(1, t('validators.required')),
  };

  const getValidationSchema = (validationSchemaObject: ZodRawShape) =>
    toTypedSchema(z.object(validationSchemaObject));

  return {
    validators,
    getValidationSchema,
  };
};

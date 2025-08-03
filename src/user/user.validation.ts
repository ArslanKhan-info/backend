import * as yup from 'yup';

export const otpValidationSchema = yup.object({
  mobile: yup
    .string()
    .transform(val => String(val))
    .required('Mobile number is required')
    .min(9, 'Mobile number must be at least 9 digits')
    .max(12, 'Mobile number must be at most 12 digits')
    .matches(/^\d+$/, 'Mobile number must be numeric'),

  country_code: yup
    .string()
    .required('Country code is required')
    .matches(/^\+\d+$/, 'Invalid country code'),
});


export const otpVerifyValidationSchema = yup.object({
  otp: yup
    .string()
    .transform(val => String(val))
    .required('Otp is required')
    .length(4, 'Otp must be of 4 digits')
    .matches(/^\d+$/, 'Otp number must be numeric'),
  mobile: yup
    .string()
    .transform(val => String(val))
    .required('Mobile number is required')
    .min(9, 'Mobile number must be at least 9 digits')
    .max(12, 'Mobile number must be at most 12 digits')
    .matches(/^\d+$/, 'Mobile number must be numeric'),
  country_code: yup
    .string()
    .required('Country code is required')
    .matches(/^\+\d+$/, 'Invalid country code'),
})
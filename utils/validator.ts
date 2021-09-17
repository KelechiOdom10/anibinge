import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required("Username is a required field"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(6, "Password must have a min length of 6"),
});

export async function validation(schema, data) {
  try {
    await schema.validate(data, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (error) {
    const { errors } = error;
    return { isValid: false, errors };
  }
}

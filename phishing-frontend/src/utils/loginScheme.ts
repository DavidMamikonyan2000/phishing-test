import { object, string } from "yup";

const loginScheme = object().shape({
  email: string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/^\S+@\S+\.\S+$/, "Email should not contain spaces"),
  password: string().required("Password is required").min(4, "Min length 4"),
});

export default loginScheme;

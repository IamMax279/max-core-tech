import * as yup from "yup"

const password = yup.string()
.min(8, "Password must have at least 8 characters.")
.max(50, "Password cannot have more than 40 characters.")
.required("This field cannot be empty.")
.matches(/[a-zA-Z]/, "Password must have a letter.")
.matches(/\d/, "Password must have at least one digit.")
.matches(/[^\w\s]/, "Password must have a special character.")

const confirmPassword = yup.string()
.oneOf([yup.ref("password", undefined)], "Passwords must match.")
.required("Please confirm your password.")

export const passwordChangeSchema = yup.object().shape({
    password,
    confirmPassword
})
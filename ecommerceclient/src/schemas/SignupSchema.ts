import * as yup from "yup"

const firstName = yup.string()
.min(2, "Enter a proper first name.")
.max(50, "This field cannot have more than 50 characters")
.required("This field cannot be empty.")

const lastName = yup.string()
.min(2, "Enter a proper first name.")
.max(50, "This field cannot have more than 50 characters")
.required("This field cannot be empty.")

const userPassword = yup.string()
.min(8, "Password must have at least 8 characters.")
.max(50, "Password cannot have more than 40 characters.")
.required("This field cannot be empty.")
.matches(/[a-zA-Z]/, "Password must have a letter.")
.matches(/\d/, "Password must have at least one digit.")
.matches(/[^\w\s]/, "Password must have a special character.")

const confirmPassword = yup.string()
.oneOf([yup.ref("password", undefined)], "Passwords must match.")
.required("Please confirm your password.")

const userEmail = yup.string()
.email("Wrong e-mail format.")
.required("This field cannot be empty.")

export const signupSchema = yup.object().shape({
    firstName: firstName,
    lastName: lastName,
    email: userEmail,
    password: userPassword,
    confirmPassword: confirmPassword
})
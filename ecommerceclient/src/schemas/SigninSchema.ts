import * as yup from "yup"

const email = yup.string()
.email("Wrong email format.")
.required("This field cannot be empty.")

const password = yup.string()
.required("This field cannot be empty")

export const signinSchema = yup.object().shape({
    email: email,
    password: password
})
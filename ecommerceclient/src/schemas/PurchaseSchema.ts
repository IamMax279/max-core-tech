import * as yup from "yup"

const street = yup.string()
.min(4, "Enter a valid street name.")
.max(60, "This field cannot have more than 60 characters")
.required("This field cannot be empty.")

const apt = yup.number()
.typeError("Please enter a valid number")
.required("This field cannot be empty.")

const unit = yup.number()
.required("This field cannot be empty.")

const phone = yup.string()
.matches(
    /^(\+\d{1,3}[-.]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    "Please enter a valid phone number."
)
.required("This field cannot be empty.")

const zipCode = yup.string()
.matches(
    /^\d{2}(-\d{3})?$/,
    "Please enter a valid zip code"
)
.required("This field cannot be empty.")

const city = yup.string()
.min(3, "Enter a valid city")
.max(40, "This field cannot have more than 40 characters")
.required("This field cannot be empty.")

export const purchaseDataSchema = yup.object().shape({
    street,
    apt,
    unit,
    phone,
    zipCode,
    city
})
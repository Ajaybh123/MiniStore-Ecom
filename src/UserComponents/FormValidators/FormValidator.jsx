import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase(1)                             // Must have uppercase 1 letters
.has().lowercase(1)                             // Must have lowercase 1 letters
.has().digits(1)                                // Must have at least 1 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export default function FormValidator(event) {
    let { name, value } = event.target
    switch (name) {
        case "name":
        case "color":
        case "username":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 50)
                return name + "Length Must Be 3-50 Character"
            else
                return ""

        case "email":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 13 || value.length > 100)
                return name + "Length Must Be 13-100 Character"
            else
                return ""

        case "phone":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length > 10 || value.length < 10)
                return name + "Length Must Be 10 Character"
            else if (value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9"))
                return ""
            else
                return "Invalid Phone Number"

                case "password":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (!(schema.validate(value)))
                return name + "Invalid password ! It must be contain at lesat 1 uppercase, 1 lowercase and 8-50 characters"
            else
                return ""

        case "size":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length > 10)
                return name + "Length Must Be Less than 10 Character"
            else
                return ""

        case "basePrice":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value < 1)
                return "Base Price Must be Greator than 0"
            else
                return ""

        case "discount":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value < 0 || value > 100)
                return "discount Must be 0-100"
            else
                return ""

        case "quantity":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value < 0)
                return "Quantity Must be greater than 0"
            else
                return ""

        case "message":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 50)
                return name + "Length Must Be greater then or equale to 50 Character"
            else
                return ""

        default:
            return ""
    }
}

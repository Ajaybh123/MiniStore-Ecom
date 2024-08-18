export default function FormValidator(event) {
    let { name, value } = event.target
    switch (name) {
        case "name":
        case "color":
            if (value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 50)
                return name + "Length Must Be 3-50 Character"
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

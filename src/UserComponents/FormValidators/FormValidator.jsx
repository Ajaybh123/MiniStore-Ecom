
export default function FormValidator(event) {
    let {name,value} = event.target
    switch(name){
        case "name":
            if(value.length===0)
                return name + " Field is Mendatory"
            else if(value.length<3||value.length>50)
                return name + "Length Must Be 3-50 Character"
            return ""

        default:
            return ""
    }
}

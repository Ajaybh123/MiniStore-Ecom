export default function ImageValidator(event) {
    let { files } = event.target
    if (files.length === 1) {
        if (files[0].size > 1048576)
            return "Pic size is more then 1 MB please upload an image upto 1MB"
        else if (files[0].type === "image/jpg" || files[0].type === "image/jpeg" || files[0].type === "image/png" || files[0].type === "image/gif")
            return ""
        else
            return "Invalid Pic Type Please Upload .jpg .jpeg .png or .gif image"
    }
    else {
        return ""
    }

}

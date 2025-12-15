import Swal from "sweetalert2";

type AlertSweetProps={
    title:string
    text:string
    icon:"success" | "error" | "warning" | "info" | "question";
    confirmButtonText:string
}
export const mostrarAlerta=({title,text,icon,confirmButtonText}:AlertSweetProps)=>{
    Swal.fire({
        title:title,
        text:text,
        icon:icon,
        confirmButtonText:confirmButtonText
    })
}
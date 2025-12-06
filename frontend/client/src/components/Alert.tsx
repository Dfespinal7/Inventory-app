export type AlertProps={
    style:string
    description:string
}
export default function Alert({style,description}:AlertProps) {
  return (
    <div className={style}>{description}</div>
  )
}

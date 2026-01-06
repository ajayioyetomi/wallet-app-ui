import React from "react"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode
} 

const Label = ({ children, className }: LabelProps) => {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>{children}</label>
  )
}

export default Label
import type { LabelProps } from '../types'

const Label = ({ children, className }: LabelProps) => {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>{children}</label>
  )
}

export default Label
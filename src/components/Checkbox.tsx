import React from 'react'

import EmptyCheckIcon from '../icons/check-blank-icon.svg?react';
import FilledCheckIcon from '../icons/check-fill-icon.svg?react';

type CheckboxProps =  React.InputHTMLAttributes<HTMLInputElement> & {
    checked:boolean | undefined,
    onChange: () => void,
}

const Checkbox = (props:CheckboxProps) => {
  const checked = props?.checked;
  const onChange = props?.onChange 
  return (
    <>
        <span>
            {
                checked?
                <FilledCheckIcon className='active-icon-primary' /> :
                <EmptyCheckIcon />
            }
        </span>
        <input type="checkbox" className='absolute opacity-0' checked={checked} onChange={onChange}/>
    </>
  )
}

export default Checkbox
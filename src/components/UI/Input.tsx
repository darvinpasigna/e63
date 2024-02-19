import { type FC, type ComponentPropsWithoutRef, forwardRef } from "react";

// interface InputProps{
//     label: string;
//     id: string;
// } 
type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<'input'>; // binds the other properties of input element, only works on type, does not support interface.

const Input = forwardRef<HTMLInputElement, InputProps>(
    function Input({label,id, ...props}, ref){ //...props collects all other props
    return (
      <p>
          <label htmlFor={id}>{label}</label>
          <input id={id} name={id} {...props} ref={ref}/>
      </p>
    )
    }
);


export default Input;
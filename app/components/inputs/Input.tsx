'use client'

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps{
    label:string;
    id:string;
    type?:string;
    required?:boolean;
    register:UseFormRegister<FieldValues>,
    errors:FieldErrors,
    disabled?:boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input:React.FC<InputProps>=({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled,
    onChange
})=> {
  return (
    <div>
        <label className="block text-sm font-medium leading-6 text-gray-900" htmlFor={id}>
              {label}
        </label>
        <div className="mt-2">
            <input id={id} disabled={disabled}  autoComplete={id} type={type}   {...register(id,{required})} onChange={onChange}
            className={clsx(' form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-200 sm:text-sm sm:leading-6 focus:ring-sky-700',errors[id] && 'focus:ring-rose-500',disabled &&'opacity-50 cursor-default')} />
        </div>
    </div>
  )
}

export default Input
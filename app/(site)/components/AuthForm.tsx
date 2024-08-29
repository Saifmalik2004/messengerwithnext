"use client";
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BsEye, BsGithub, BsGoogle } from 'react-icons/bs';
import { FiEyeOff } from 'react-icons/fi';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Variant = 'LOGIN' | 'REGISTER';

function AuthForm() {
    const [variant, setVariant] = useState<Variant>("REGISTER");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(''); // Track password value

    const toggleVariant = useCallback(() => {
        if (variant === "LOGIN") {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            axios.post("/api/register",data)
            .catch(()=> toast.error("Something Went Wrong!"))
            .finally(()=> setIsLoading(false))
        }


        if (variant === 'LOGIN') {
           signIn('credentials',{
            ...data,
            redirect:false
           })
           .then((callback)=>{
            if(callback?.error){
                toast.error("Invalid credentials");
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logged in !')
                
            }
           })
           .finally(()=> setIsLoading(false))
        }

        
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action,{redirect:false})
        .then((callback)=>{
            if(callback?.error){
                toast.error("Invalid credentials");
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logged in !')
                
            }
        })
        .finally(()=> setIsLoading(false))
    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0'> 
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input
                            id='name'
                            label='Name'
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id='email'
                        label='Email'
                        type='text'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div className="relative">
                        <Input
                            id='password'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)} // Track password input
                        />
                        {password.length > 0 && ( // Conditionally render the eye button
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-3/4 transform -translate-y-1/2"
                            >
                                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <BsEye className="w-5 h-5" />}
                            </button>
                        )}
                    </div>
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type='submit'
                        >
                            {variant === "LOGIN" ? 'Sign in' : "Register"}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className='relative flex justify-center text-gray-500 text-sm'>
                            <span className='bg-white px-2 text-gray-500'>
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton Icon={BsGithub} onClick={() => socialAction('github')} />
                        <AuthSocialButton Icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-600">
                    <div>
                        {variant === "LOGIN" ? "New to Zylo" : "Already have an account?"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer text-sky-500">
                        {variant === "LOGIN" ? "Create an account" : "Login"}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AuthForm;

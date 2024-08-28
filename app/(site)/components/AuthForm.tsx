"use client";
import Input from '@/app/components/inputs/Input';
import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Variant = 'LOGIN' | 'REGISTER';

function AuthForm() {
    const [variant, setVariant] = useState<Variant>("REGISTER");
    const [isLoading, setIsLoading] = useState(false);

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
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            age: '',
            gender: '',
            password: ''
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (variant === 'REGISTER') {
            // axios register
        }
        if (variant === 'LOGIN') {
            // next auth sign in
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);
    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <>
                            <Input
                                id='name'
                                label='Name'
                                register={register}
                                errors={errors}
                            />
                            <div className="flex space-x-4 justify-between">
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700 mt-5 mb-2">
                                        Gender
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="male"
                                                {...register('gender', { required: true })}
                                                className="form-radio h-4 w-4 text-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Male</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="female"
                                                {...register('gender', { required: true })}
                                                className="form-radio h-4 w-4 text-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Female</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="other"
                                                {...register('gender', { required: true })}
                                                className="form-radio h-4 w-4 text-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Other</span>
                                        </label>
                                    </div>
                                    {errors.gender && <p className="text-red-500 text-xs mt-1">Gender is required</p>}
                                </div>

                                <div className="w-1/5">
                                    <Input
                                        id='age'
                                        label='Age'
                                        type='number'
                                        register={register}
                                        errors={errors}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AuthForm;

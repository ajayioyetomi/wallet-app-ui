import { useState } from 'react';

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Label, Button } from '../../components';

import Logo from '../../icons/logo.svg?react';
import LoginImage from '../../assets/login-image.webp';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

type LoginFormInputs = {
  password: string;
}


const login_schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
}).required();


const Password = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
   const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(login_schema),
    defaultValues:{
      password: ''
    }
  })

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  return (
    <section className='dark:bg-black bg-white flex flex-col md:flex-row  w-screen h-screen'>
      <div className="dark:bg-purple-900 bg-purple-50 w-full md:w-1/2 h-full md:h-screen flex flex-col align-center overflow-hidden">
        <div className='flex justify-center items-center py-3 md:py-4'>
          <Logo/>
        </div>
        <div className='flex justify-center items-center flex-1 origin-center zoom_in_out'>
          <picture>
            <img src={LoginImage} alt="mobile wallet" className='w-full md:w-screen max-w-full md:max-w-[188px] h-auto aspect-188/191'/>
          </picture>
        </div>
      </div>
      <div className="dark:bg-black w-full md:w-1/2 h-full md:h-screen bg-white flex flex-col p-4 md:p-6">
        <h1 className='dark:text-white text-black md:text-xl text-left sm:text-center font-bold'>Enter your mobile number</h1>
        <div className='flex flex-1 flex-col gap-4 justify-center items-center'>
          <form className='w-full max-w-[450px] flex flex-col items-center gap-6'
            onSubmit={handleSubmit(onSubmit)}>
              <Label className='w-full max-w-[400px]'>
                <span className='dark:text-white text-black text-xs'>Mobile number</span>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) =>      
                    <input
                      type="password"
                      placeholder="Enter your password"  
                      {...field}
                    />
                  }
                />
                <span className='text-red-500 text-xs text-center'>{errors?.password?.message}</span>
              </Label>
              <Button type="submit" isLoading={isLoading} className="bg-purple-400 text-white w-full max-w-[400px] text-semi-bold text-sm p-2 rounded-sm cursor-pointer text-center flex justify-center items-center">
                Login
              </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Password
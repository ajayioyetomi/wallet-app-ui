import { useState } from 'react';

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Label, Button } from '../../components';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { PhoneInput} from 'react-international-phone';

import 'react-international-phone/style.css';
import Logo from '../../icons/logo.svg?react';
import FacebookLogo from '../../icons/facebook-icon.svg?react';
import GoogleLogo from '../../icons/google-icon.svg?react';
import AppleLogo from '../../icons/apple-icon.svg?react';
import LoginImage from '../../assets/login-image.webp';

type LoginFormInputs = {
  phone: string;
}


const login_schema = yup.object({
  phone: yup
    .string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Incomplete or invalid phone number', (value) => {
      if (!value) return false;
      return (
        parsePhoneNumberFromString(value)?.isValid() ?? false
      );}),
}).required();


const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
   const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(login_schema),
    defaultValues:{
      phone: ''
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
                    name="phone"
                    control={control}
                    render={({ field }) =>      
                      <PhoneInput
                        defaultCountry={'ng'}
                        placeholder="7X-XXXXXXX"
                        inputStyle={{width:'100%',height: '45px'}}
                        style={{height: '45px'}}
                        {...field}
                        inputProps={{
                          id:'phone'
                        }}
                      />  
                    }
                  />
                  <span className='text-red-500 text-xs text-center'>{errors?.phone?.message}</span>
              </Label>
              <Button type="submit" isLoading={isLoading} className="bg-purple-400 text-white w-full max-w-[400px] text-semi-bold text-sm p-2 rounded-sm cursor-pointer text-center flex justify-center items-center">
                Continue
              </Button>
          </form>
          <div className='w-full max-w-[400px] flex gap-2 flex-col items-center justify-center'>
            <div className='w-full flex gap-4 items-center'>
              <span className='flex flex-1 border-gray-100 [border-block-end-width:1px] [border-block-end-style:solid]'></span>
              <span className='text-xs text-gray-300'>or continue using</span>
              <span className='flex flex-1 border-gray-100 [border-block-end-width:1px] [border-block-end-style:solid]'></span>
            </div>
            <div className="w-full flex justify-between items-center">
              <Button className='rounded-sm min-w-18 border-gray-100 border flex justify-center items-center py-2 px-2 cursor-pointer'>
                <FacebookLogo/>
              </Button>
              <Button className='rounded-sm min-w-18 border-gray-100 border flex justify-center items-center py-2 px-2 cursor-pointer'>
                <GoogleLogo/>
              </Button>
              <Button className='rounded-sm min-w-18 border-gray-100 border flex justify-center items-center py-2 px-2 cursor-pointer'>
                <AppleLogo/> 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
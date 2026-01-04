import { useState } from "react";

import { Link, useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { useForm, Controller } from "react-hook-form"

import { Label, Button, PasswordStrength, Checkbox } from "../../components";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { PhoneInput} from 'react-international-phone';

import 'react-international-phone/style.css';

import FacebookLogo from '../../icons/facebook-icon.svg?react';
import GoogleLogo from '../../icons/google-icon.svg?react';
import AppleLogo from '../../icons/apple-icon.svg?react';
import BackArrowIcon from '../../icons/back-arrow-icon.svg?react';
import PasswordIcon from '../../icons/password-icon.svg?react';
import TextIcon from '../../icons/text-icon.svg?react';
import Logo from '../../icons/logo.svg?react';


type RegisterInputs = {
  name: string;
  email: string;
  password: string;
  accept:boolean | undefined;
  phone:string;
}

const regiser_schema = yup.object({
  phone: yup
    .string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      if (!value) return false;
      return (
        parsePhoneNumberFromString(value)?.isValid() ?? false
      );
  }),
  name:yup
  .string()
  .required('Name is required')
  .test('is-valid-name','Please enter full name',(value)=>{
    if(!value) return false;
    let first_name = value.split(' ')[0];
    let last_name = value.split(' ')[1];
    if(!first_name || first_name.length < 2)
        return false
    if(!last_name || last_name.length < 2)
        return false
    return true;
  }),
  email: yup
    .string()
    .required('Email is required')
    .test('is-valid-email','Invalid email address',(value)=>{
      if(!value) return false;
      let is_valid_email = value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
      );
      return is_valid_email ? true : false;

    }),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 8 characters'),
  accept: yup.boolean()
  .required('You must accept the terms')
  .test('is-accepted','Kindly accept terms and condition',(value) =>{
    return Boolean(value);
  })

}).required();

const Register = () => {
  const [show_password, set_show_password] = useState<boolean>(false);
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(regiser_schema),
    defaultValues:{
      name: '',
      phone:'',
      email:'',
      password:'',
      accept: window.localStorage.getItem('wallet-password') ? true : false,
    }
  })
  const password = watch('password');
  const accept = watch('accept');

    const onSubmit = (data: RegisterInputs) => {
    console.log(data,accept,'data');
    set_is_loading(true);
    // Simulate an async operation
    window.localStorage.setItem('wallet-app-data',JSON.stringify({
      name:data.name,
      phone:data.phone,
      email:data.email
    }))
    setTimeout(() => {
      navigate(`/otp?phone=${data.phone}`);
    }, 2000);
  }

  return (
    <section className="dark:bg-black bg-white w-screen h-screen flex flex-col">
        <div className='relative flex justify-center items-center pt-1'>
          <Link to="/login" className='absolute flex mt-1 font-semibold items-center left-4 text-blue-400 text-sm leading-none'>
            <BackArrowIcon className='active-icon-blue-400' />
            <span className='h-[24px] flex justify-center items-center pt-[2px]'>Back</span>
          </Link>
          <Logo className='m'/>
        </div>
        <div className="flex-1 w-full flex justify-center items-end sm:items-center">
          <div className="w-full max-w-[500px] h-[fit-content] p-4 sm:p-2 ">
            <h1 className="dark:text-white text-black mb-4 sm:mb-2 text-md sm:text-xl font-semibold sm:font-bold sm:text-center">Create Account</h1>
            <form className="flex flex-col gap-2" 
              onSubmit={handleSubmit(onSubmit)}
            >
              <Label className="w-full">
                <span className='dark:text-white text-black text-xs'>Name</span>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) =>   
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="e.g. john doe"  
                      className='border-1 border-gray-150 h-[45px] w-full rounded-sm dark:text-white text-black text-sm px-3 py-2 cursor-pointer '
                      {...field}
                    />
                  }
                />
                <span className='text-red-500 text-xs text-center'>{errors?.name?.message}</span>   
              </Label>
              <Label className='w-full max-w-[450px]'>
                  <span className='dark:text-white text-black text-xs'>Mobile number</span>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) =>      
                      <PhoneInput
                        defaultCountry={'ng'}
                        placeholder="7X-XXXXXXX"
                        inputStyle={{width:'100%',height: '45px'}}
                        style={{height: '45px', border:'1px solid #E1E3ED'}}
                        {...field}
                        inputProps={{
                          id:'phone'
                        }}
                      />  
                    }
                  />
                  <span className='text-red-500 text-xs text-center'>{errors?.phone?.message}</span>
              </Label>
              <Label className="w-full">
                <span className='dark:text-white text-black text-xs'>Email</span>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) =>   
                    <input
                      autoComplete="off"
                      type="email"
                      placeholder="e.g. email@example.com"  
                      className='border-1 border-gray-150 h-[45px] w-full rounded-sm dark:text-white text-black text-sm px-3 py-2 cursor-pointer '
                      {...field}
                    />
                  }
                />
                <span className='text-red-500 text-xs text-center'>{errors?.email?.message}</span>   
              </Label>
              <Label className='relative w-full'>
                <span className='dark:text-white text-black text-xs'>Password</span>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) =>   
                    <div className='w-full relative'>
                      <input
                        autoComplete="off"
                        type={show_password ? 'text' : 'password'}
                        placeholder="Enter your password"  
                        className='border-1 border-gray-150 h-[45px] w-full rounded-sm dark:text-white text-black text-sm px-3 py-2 cursor-pointer '
                        {...field}
                      />
                      <Button type="button" className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer' onClick={()=> set_show_password(!show_password)}>
                        {show_password ? 
                          <TextIcon 
                          />:
                          <PasswordIcon />
                        }
                      </Button>
                    </div>   
                    
                  }
                />
                <PasswordStrength password={password}/>
                <span className='text-red-500 text-xs text-center'>{errors?.password?.message}</span>
              </Label>
              <Label className="flex-row items-center cursor-pointer">
                <Controller
                  name="accept"
                  control={control}
                  render={() =>   
                    <Checkbox checked={accept} onChange={() => setValue('accept',!accept)} />
                  }
                />
                <p className="dark:text-white text-black text-xs">
                  I accept <Link to="#" className="text-blue-400 text-xs">terms and conditions</Link> and <Link to="#" className="text-blue-400 text-xs">privacy policy</Link>
                </p>
              </Label>
              <p className="text-xs text-red-500 text-left sm:text-center -mt-2">{errors?.accept?.message}</p>
              <div className="w-full mt-3">
                <Button isLoading={is_loading} className="w-full bg-purple-400 text-white text-sm py-2 rounded-sm cursor-pointer flex justify-center items-center">Create a new account</Button>
                <div className='w-full max-w-[450px] mt-4 flex gap-2 flex-col items-center justify-center'>
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
                <p className="w-full mt-2 text-sm text-center text-black dark:text-white"><Link to="/login" className="w-full text-sm text-blue-400 text-semibold">I already have an account?</Link></p>

              </div>
              
            </form>
          </div>
        </div>
        

    </section>
  )
}

export default Register
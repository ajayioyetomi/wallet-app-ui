import { Link, useNavigate, useSearchParams } from "react-router-dom"
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';

import { Button } from "../../components";

import BackArrowIcon from '../../icons/back-arrow-icon.svg?react';
import BigCheckboxCircleIcon from '../../icons/big-checkbox-circle.svg?react';
import DeleteIcon from '../../icons/delete-icon.svg?react';
import Logo from '../../icons/logo.svg?react';
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNotification } from "../../hooks/useNotification";

const otp_scheme = yup.object({
  otp: yup
  .string()
  .required("Six digit OTP is required")
}).required();

type OTPFormInputs = {
  otp: string;
}

let startTimer = false;

const OTP = () => {
  const [all_check, set_all_check] = useState<boolean>(false);
  const [temp_otp, set_temp_otp] = useState<string>('');
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {setOpenNotification,setNotification} = useNotification()
  const [searchParams] = useSearchParams();
  const temp_data = JSON.parse(window.localStorage.getItem('wellet-app-data') || '{}');
  let temp_phone = '+23480';
  if(temp_data?.phone)temp_phone = temp_data?.phone;
  const temp_email = searchParams.get('email');
  const temp_mobile = searchParams.get('phone')
  
  const {
    handleSubmit,
    formState:{errors},
    control,
    setValue
  } = useForm({
    resolver: yupResolver(otp_scheme),
    defaultValues:{
      otp:''
    }
  })

  // const otp = watch('otp');

  const handleScreenKeyboard = (val: string) =>{
      if(!isNaN(Number(val)))
      set_temp_otp((former) => {
        if(former.length === 7) return former;
        let value = `${former + val}`
        if(value.length === 3) value = value+'-';
        return value;
      })
    else set_temp_otp((former) => {
      if(former.length === 0) return '';
      if(former.length === 4) return former.slice(0,-2);
      return former.slice(0,-1);
    })
  }
  
  const onSubmit = (data: OTPFormInputs) =>{
    const otp = data.otp;
    if(otp.length === 7 && otp.charAt(3) === '-'){
      set_is_loading(true);
      setTimeout(()=>{
        setNotification({status:"success",message:`Succesful, no action required on you end`})
      },1000)
      setTimeout(()=>{
        set_is_loading(false);
        navigate('/dashboard')
      },2000)
    }

  }
  useEffect(()=>{
    setValue('otp',temp_otp)
    if(temp_otp.length === 7) set_all_check(true);
    else set_all_check(false);
  },[temp_otp])
  useEffect(()=>{
    const handleChangeOTP = (e:KeyboardEvent) =>{
      const key = e.key;
      if(!isNaN(Number(key)) && temp_otp.length < 7){
        set_temp_otp((former) => {
          if(former.length === 7) return former;
          let value = `${former + key}`;
          if(value.length === 3) value = value+'-';
          return value;
        })
      }
      if(key && key.toLowerCase() === 'backspace'){
          set_temp_otp((former) => {
          if(former.length === 0) return '';
          if(former.length === 4) return former.slice(0,-2);
          return former.slice(0,-1);
        })
      }
    }
    window.addEventListener('keydown',handleChangeOTP);
    return () => window.removeEventListener('keydown',handleChangeOTP);
  },[])
  return (
    <section className="dark:bg-black bg-white w-screen h-screen flex flex-col">
        <div className='w-full relative flex justify-center items-center py-2'>
          <Link to="/password" className='absolute flex font-semibold items-center left-4 text-blue-400 text-sm leading-none'>
            <BackArrowIcon className='active-icon-blue-400' />
            <span className='h-[24px] flex justify-center items-center pt-[2px]'>Back</span>
          </Link>
          <Logo/>
        </div>
        <div className="w-screen flex flex-1 flex-col justify-between sm:justify-center items-center ">
          <div className="w-full max-w-[500px] h-[fit-content] sm:h-full flex flex-col items-center">
            <p className="m-0 dark:text-white text-black text-center text-sm font-semibold mt-4">An {temp_mobile ?'SMS':'Email'} sent to your {temp_mobile ? 'mobile number' :'email'}</p>
            <p className="m-0 dark:text-white text-black text-center text-sm font-semibold"> {temp_mobile ? `${temp_phone.slice(0,8)}-XXX-XXXX`:`${temp_email?.slice(0,6)}XXXXXXXXXX@XXX`}</p>
            
            <div className="relative w-full flex flex-col items-center px-4 mt-8 mb-0 sm:mt-auto sm:mb-auto top:0 sm:-top-10">
              <p className="m-0 text-gray-300 text-xs text-center mb-5">Enter six-digit code</p>
              <form id="otp-form" onSubmit={handleSubmit(onSubmit)} className={`flex w-[fit-content] max-w-[280] justify-center items-center border-b-2  px-2 pb-2 ${!all_check ?'border-blue-400' : 'border-green-200'} `}>
                <Controller 
                  name="otp"
                  control={control}
                  render={({field})=>
                    <>
                      <input disabled className="max-w-[230px] sm:max-w-[220px] text-center text-black text-4xl" 
                        type="text" placeholder="XXX-XXX"  maxLength={7} 
                        {...field} value={field.value ?? ''} 
                      />
                      {
                        all_check?
                        <BigCheckboxCircleIcon />:
                        <></>
                      }
                    </>
                  
                  }
                />                
              </form>
              <OTPTimer />
              <span className="text-red-500">{errors.otp?.message}</span>
            </div>
            
          </div>
          <div className="w-full max-w-[500px] p-4 pb-6 mt-4 sm:mt-0 keyboard-shadow">
            <div className="w-full mb-6 grid sm:hidden grid-cols-3 gap-1 ">
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('1')}>
                1
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('2')}>
                2
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('3')}>
                3
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('4')}>
                4
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('5')}>
                5
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('6')}>
                6
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('7')}>
                7
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('8')}>
                8
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('9')}>
                9
              </Button>
              <Button className="py-2 text-black">
              </Button>
              <Button className="dark:text-white text-black py-2" onClick={()=>handleScreenKeyboard('0')}>
                0
              </Button>
              <Button className="flex justify-center items-center py-2 text-center" onClick={()=>handleScreenKeyboard('del')}>
                <DeleteIcon />
              </Button>
            </div>
            <Button isLoading={is_loading} type="submit" form="otp-form" className="w-full py-2 bg-purple-400 rounded-sm font-semibold flex justify-center items-center text-center text-white text-sm cursor-pointer">
              Done
            </Button>
          </div>
        </div>


    </section>
  )
}

const OTPTimer = () =>{
  const [seconds,set_seconds] = useState<number>(59);
  const handleReset = () =>{
    if(seconds > 0) return;
    set_seconds(59);
    const timer = setInterval(()=>{
        set_seconds((pre)=>{
          console.log(pre,'pre')
          if(pre === 0){
            clearInterval(timer)
            return 0;
          }
          const value = pre - 1;
          return value;
        })
      },1000)
  }
  useEffect(()=>{
    if(!startTimer){
        startTimer = true;
        const timer = setInterval(()=>{
        set_seconds((pre)=>{
        
          if(pre === 0){
            clearInterval(timer)
            return 0;
          }
          const value = pre - 1;
          return value;
        })
      },1000)
    }
    
  },[])
  return <div className="flex justify-center items-center gap-2 mt-2">
    <Button onClick={handleReset} className={`${seconds > 0 ? `text-gray-200` :` text-blue-400 font-semibold`}`}>Resend code</Button>
    <span className="text-black flex items-center">{
      seconds > 58 ? 
      `${seconds}:00`:
      `00:${seconds > 9 ? seconds : `0${seconds}`}`
    }</span>
  
  </div>
}

export default OTP
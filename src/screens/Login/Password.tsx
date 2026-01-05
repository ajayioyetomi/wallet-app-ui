import { useEffect, useState } from 'react';

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate } from 'react-router-dom';
import { usePopup } from '../../hooks/usePopup';
import { Label, Button, ForgotPassword } from '../../components';

import Logo from '../../icons/logo.svg?react';
import PasswordIcon from '../../icons/password-icon.svg?react';
import TextIcon from '../../icons/text-icon.svg?react';
import EmptyCheckIcon from '../../icons/check-blank-icon.svg?react';
import FilledCheckIcon from '../../icons/check-fill-icon.svg?react';
import BackArrowIcon from '../../icons/back-arrow-icon.svg?react';
import PasswordImage from '../../assets/password-image.webp';
import { useNotification } from '../../hooks/useNotification';



type LoginFormInputs = {
  password: string;
}


const login_schema = yup.object({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 8 characters'),
}).required();


const Password = () => {
  const puesdo_password = window.localStorage.getItem('wallet-password');
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const [show_password, set_show_password] = useState<boolean>(false);
  const [remember_me, set_remember_me] = useState<boolean>(Boolean(puesdo_password));
  const navigate = useNavigate();

  const {setOpen,setPopUp} = usePopup();
  const {setOpenNotification,setNotification} = useNotification();

   const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm({
    resolver: yupResolver(login_schema),
    defaultValues:{
      password: ''
    }
  })
  const password = watch('password','')
  const updateRememberMe = () =>{
    set_remember_me(!remember_me);
    if(!remember_me){
      window.localStorage.setItem('wallet-password',password);
      return;
    }
    window.localStorage.removeItem('wallet-password');
  }
  const handleForgotPassword = () =>{
    console.log('testing popup')
    setPopUp(<ForgotPassword type="email" />);
    setOpen(true);
  }
  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    set_is_loading(true);
    // Simulate an async operation
    setTimeout(()=>{
      setNotification({status:'success',message:"Log in successfully"});
      setOpenNotification(true);
    },1000)
    setTimeout(() => {
      set_is_loading(false);
      if(remember_me){
        window.localStorage.setItem('wallet-password',password);
      }
      else window.localStorage.removeItem('wallet-password');
      localStorage.setItem('token', 'fake-token');
      navigate('/dashboard', { replace: true });
    }, 2000);
  }

  useEffect(()=>{
    if(puesdo_password){
      navigate('/dashboard');
    }
  },[])
  return (
    <section className='dark:bg-black bg-white flex flex-col md:flex-row  w-screen h-screen'>
      <div className="dark:bg-purple-900 bg-purple-50 w-full md:w-1/2 h-full md:h-screen flex flex-col align-center overflow-hidden">
        <div className='relative flex justify-center items-center py-2'>
          <Link to="/login" className='absolute flex font-semibold items-center left-4 text-blue-400 text-sm leading-none'>
            <BackArrowIcon className='active-icon-blue-400' />
            <span className='h-[24px] flex justify-center items-center pt-[2px]'>Back</span>
          </Link>
          <Logo />
        </div>
        <div className='flex justify-center items-center flex-1 origin-center zoom_in_out'>
          <picture>
            <img src={PasswordImage} alt="mobile wallet" className='w-full md:w-screen max-w-full md:max-w-[156px] h-auto aspect-156/194'/>
          </picture>
        </div>
      </div>
      <div className="dark:bg-black w-full md:w-1/2 h-full md:h-screen bg-white flex gap-4 flex-col p-4 md:p-6">
        <h1 className='dark:text-white text-black md:text-xl text-left sm:text-center font-bold'>Enter your password</h1>
        <div className='flex flex-1 flex-col gap-4 justify-center items-center'>
          <form className='w-full max-w-[450px] h-full sm:max-h-50 flex flex-col items-between gap-6 pb-4'
            onSubmit={handleSubmit(onSubmit)}>
              <Label className='relative w-full max-w-[450px]'>
                <span className='dark:text-white text-black text-xs'>Password</span>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) =>   
                    <div className='w-full relative'>
                      <input
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
                <span className='text-red-500 text-xs text-center'>{errors?.password?.message}</span>
              </Label>
                <div className='-mt-5 w-full max-w-[450px] flex justify-between items-center'>
                  <label className='relative flex items-center gap-2 cursor-pointer'>
                    <span>
                      {remember_me ? 
                        <FilledCheckIcon className='active-icon-primary' />:
                        <EmptyCheckIcon />
                      }
                    </span>
                    <input type="checkbox" className='absolute opacity-0' checked={remember_me} onChange={updateRememberMe}/>
                    <span className='dark:text-white text-black text-xs'>Remember me</span>
                  </label>
                  <Button onClick={handleForgotPassword} type="button" className='text-blue-400 text-600 text-xs cursor-pointer'>Forgot password?</Button>
                </div>
              <Button type="submit" isLoading={is_loading} className="bg-purple-400 text-white w-full max-w-[450px] text-semi-bold text-sm p-2 rounded-sm cursor-pointer text-center flex justify-center items-center mt-auto">
                Login
              </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Password
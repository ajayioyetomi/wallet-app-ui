import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { PhoneInput} from 'react-international-phone';
import { Label, Button } from './';

import 'react-international-phone/style.css';
import { usePopup } from "../hooks/usePopup";




type EmailPhoneInputs = {
  inp: string;
}

const email_schema = yup.object({
  inp: yup
    .string()
    .required('Email is required')
    .test('is-valid-email','Invalid email address',(value)=>{
      if(!value) return false;
      let is_valid_email = value.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
      );
      return is_valid_email ? true : false;

    })
}).required();

const phone_schema = yup.object({
  inp: yup
    .string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', (value) => {
      if (!value) return false;
      return (
        parsePhoneNumberFromString(value)?.isValid() ?? false
      );}),
}).required();


type ForgotPasswordProps = {
  type:string;
}


const ForgotPassword = ({type = "email"}:ForgotPasswordProps) => {
  const [password_type, set_password_type] = useState(type || "email"); 
  const [is_loading, set_is_loading] = useState<boolean>(false);
  const [is_loading_type, set_is_loading_type] = useState<boolean>(false);
  const {setOpen,setPopUp} = usePopup();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(password_type === "email" ? email_schema : phone_schema),
    defaultValues:{
      inp: ''
    }
  })
  const inp = watch('inp')
    const handleToggleType = () =>{
    set_is_loading_type(true);
    let waiting = setTimeout(()=>{
      set_password_type(password_type === "email" ? "mobile" : "email");
      set_is_loading_type(false);
      setValue('inp','');
      clearTimeout(waiting);
    },1500)
  }
  const onSubmit = (data: EmailPhoneInputs) => {
    console.log(data,'data');
    set_is_loading(true);
    setTimeout(()=>{
      set_is_loading(false);
      setOpen(false);
      setPopUp(<></>)
      if(password_type === 'email')
      navigate(`/otp?email=${inp}`)
      else navigate(`/otp?phone=${inp}`);

    },2000)
  }

  return (
    <div className="dark:bg-gray-600 bg-white dark:text-white text-black max-w-[500px] w-full w-screen p-3  rounded-t-lg sm:rounded-b-lg ">
        <div className='w-full flex justify-between items-center'>
            <p className='m-0 font-semibold text-md'>Forgot your password?</p>
            <Button className='text-sm text-semibold text-blue-400 cursor-pointer' 
              onClick={()=>{
                setOpen(false);
                setPopUp(<></>)
              }} 
            >
              Done
            </Button>
        </div>
        <form className="w-full flex flex-col items-center mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {
            password_type === "email" ?
            <Label className="w-full mb-10">
              <span className='dark:text-white text-black text-xs'>Email</span>
              <Controller
                name="inp"
                control={control}
                render={({ field }) =>   
                  <input
                    type="email"
                    placeholder="e.g. email@example.com"  
                    className='border-1 border-gray-150 h-[45px] w-full rounded-sm dark:text-white text-black text-sm px-3 py-2 cursor-pointer '
                    {...field}
                  />
                }
              />
              <span className='text-red-500 text-xs text-center'>{errors?.inp?.message}</span>   
            </Label>:
            <Label className='w-full mb-10'>
              <span className='dark:text-white text-black text-xs'>Mobile number</span>
              <Controller
                name="inp"
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
              <span className='text-red-500 text-xs text-center'>{errors?.inp?.message}</span>
            </Label>
          }
          <Button type="submit" isLoading={is_loading} className="bg-purple-400 text-white w-full text-semi-bold text-sm p-2 rounded-sm cursor-pointer text-center flex justify-center items-center">
            Send reset link
          </Button>
          <Button type="button" onClick={handleToggleType} isLoading={is_loading_type} className="bg-transparent text-blue-400 font-semibold w-full text-semi-bold text-sm p-2 cursor-pointer text-center flex justify-center items-center mt-4">
            {
              password_type === "email" ?
              "Use mobile instead":
              "Use email instead"
            }
          </Button>
        </form>
    </div>
  )
}

export default ForgotPassword
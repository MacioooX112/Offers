"use client";
import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import loadingIMG from "@assets/images/loading.gif";
import Image from "next/image";
import axios from 'axios';
import cookie from "js-cookie";
import { useRouter } from 'next/navigation'

const loginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState("")
  const [loading, setLoading] = useState(false)

  const login = async() =>{
    setLoading(true);
    
    try{
      const response = await axios.post("/api/users/login", {
        email: email,
        password: password
        
      });
      setLoginError("");
      console.log(response.data);
      router.push('/')
      
    }
    catch(error){
      let msg = "";
      if(typeof error.response.data.verify !== 'undefined'){
        router.push('/verifyEmailInfo/' + email);
      }
      if(typeof error.response.data.error !== 'undefined'){
          msg = error.response.data.error;
      }
      else{
        msg = "Wystąpił błąd. Spróbuj ponownie.";
      }
      setLoginError(msg);
      console.log("Signup failed: ", error);
      
      
      
    }
    finally{
      setLoading(false);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await validationSchema.validate({email: email, password: password}, {abortEarly: false});
      setErrors({});
      console.log("Form passed");

      login();
    }
    catch(error){
      console.log(error);
      let newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
    
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Podaj poprawny adres e-mail").required("Adres e-mail jest wymagany"),
    password: Yup.string()
      .required("Hasło jest wymagane")
      .min(8, "Hasło musi zawierać conajmniej 8 znaków")
  })

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center mb-5 sm:mb-10">Zaloguj Się</h1>
        <br className="max-md:hidden"/>

        <div className='w-full sm:w-2/3'>

          <label htmlFor="email" className="font-sans text-3xl ml-8 select-none inline-block">
              E-mail
          </label>

          <div className="relative w-full mt-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
              </svg>
              </div>
            <input type="text" 
            name='email' 
            className="bg-gray-300 text-gray-300 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" 
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          {errors.email && <p className='text-red-600'>{errors.email}</p>}

          <label htmlFor="password" className="font-sans text-3xl ml-8 mt-6 inline-block select-none">
              Hasło
          </label>
          <div className="relative w-full mt-2">
            {displayPassword ? (
              <>
              <FontAwesomeIcon icon={faEye} size="sm" className='text-gray-400 absolute top-1/3 ml-3' onClick={()=>setDisplayPassword((prev)=>!prev)}/>
              <input type="text" 
                name='password' 
                className="bg-gray-300 text-gray-300 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" 
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </>
            ) : (
              <>
              <FontAwesomeIcon icon={faEyeSlash} size="sm" className='text-gray-400 absolute top-1/3 ml-3' onClick={()=>setDisplayPassword((prev)=>!prev)}/>
              <input type="password" 
                name='password' 
                className="bg-gray-300 text-gray-300 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" 
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
            </div>
            {errors.password && <p className='text-red-600'>{errors.password}</p>}

            <button className='black_btn mt-6 ml-6' onClick={handleSubmit}>Zaloguj</button>

            {loginError && <p className='text-sm text-red-600 mt-5'>{loginError}</p>}
            {loading && <div className="flex justify-center items-center"><Image src={loadingIMG} width={60} height={60} alt="Loading..." className="m-0 mt-10"></Image></div>}
        </div>  
    </section>
  )
}
{/*<input type='text' name='email' onChange={(e) => setEmail(e.target.value)} className='form_input bg-blue-200 text-white'/>*/}

export default loginPage
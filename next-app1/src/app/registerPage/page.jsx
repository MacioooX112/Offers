"use client";
import React from 'react'
import Image from "next/image";
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import loadingIMG from "@assets/images/loading.gif";



const registerPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: ""
  })
  const [errors, setErrors] = useState({})
  const [registerError, setRegisterError] = useState("")
  const [loading, setLoading] = useState(false)

  const register = async () =>{
    setLoading(true);
    
    try{
      const response = await axios.post("/api/users/register", {
        email: formData.email,
        password: formData.password
        
      });
      setRegisterError("");
      console.log(response.data);
      router.push('/verifyEmailInfo/' + formData.email);
      
    }
    catch(error){
      let msg;
      if(error.response.data.error){
        msg = error.response.data.error;
      }
      else{
        msg = "Wystąpił błąd. Spróbuj ponownie.";
      }
      setRegisterError(msg);
      console.log("Signup failed: ", msg);
      
    }
    finally{
      setLoading(false);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      await validationSchema.validate(formData, {abortEarly: false});
      //console.log("Form submitted", formData);
      setErrors({});
      register();
      //GetResponse();
    }catch(error){
      console.log(error);
      let newErrors = {};
      error.inner.forEach(err => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
    
  }
  const handleChange = (e) =>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Podaj poprawny adres e-mail").required("Adres e-mail jest wymagany"),
    password: Yup.string()
      .required("Hasło jest wymagane")
      .min(8, "Hasło musi zawierać conajmniej 8 znaków")
      .matches(/[0-9]/, "Hasło musi zawierać conajmniej jedną cyfrę")
      .matches(/[A-Z]/, "Hasło musi zawierać conajmniej jedną wielką literę")
      .matches(/[a-z]/, "Hasło musi zawierać conajmniej jedną małą literę"),
    password2: Yup.string().oneOf(
      [Yup.ref("password")],
      "Hasła muszą być takie same")
      .required("Powtórzone hasło jest wymagane")
  })

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center mb-5 sm:mb-10">Zarejestruj Się</h1>
      <br className="max-md:hidden"/>
      <div className='w-full sm:w-2/3'>
        <form onSubmit={handleSubmit}>
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
              value={formData.email}
              onChange={handleChange}/>
            </div>
            {errors.email && <p className='text-red-600'>{errors.email}</p>}

            <label htmlFor="password" className="font-sans text-3xl ml-8 mt-6 inline-block select-none">
              Hasło
            </label>
            <div className="relative w-full mt-2">
            <FontAwesomeIcon icon={faKey} size="sm" className='text-gray-400 absolute top-1/3 ml-3'/>
              <input type="password" 
                name='password' 
                className="bg-gray-300 text-gray-300 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" 
                placeholder="*****"
                value={formData.password}
                onChange={handleChange}/>
            </div>
            {errors.password && <p className='text-red-600'>{errors.password}</p>}

            <label htmlFor="password2" className="font-sans text-3xl ml-8 mt-6 inline-block select-none">
              Powtórz hasło
            </label>
            <div className="relative w-full mt-2">
            <FontAwesomeIcon icon={faKey} size="sm" className='text-gray-400 absolute top-1/3 ml-3'/>
              <input type="password" 
                name='password2' 
                className="bg-gray-300 text-gray-300 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" 
                placeholder="*****"
                value={formData.password2}
                onChange={handleChange}/>
            </div>
            {errors.password2 && <p className='text-red-600'>{errors.password2}</p>}
            <input type="submit" value="Zarejestruj" className="black_btn mt-6 ml-6"/>
            {registerError && <p className='text-sm text-red-600 mt-5'>{registerError}</p>}
            {loading && <div className="flex justify-center items-center"><Image src={loadingIMG} width={60} height={60} alt="Loading..." className="m-0 mt-10"></Image></div>}
        </form>

      </div>
    </section>
  )
}

export default registerPage
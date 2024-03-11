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
import textInput from '../components/textInput';



const formPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    adres: "",
    nrDomu: "",
    nrMieszkania: "",
    kodPocztowy: "",
    miejscowosc: "",
    NIP: ""
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState("")
  const [loading, setLoading] = useState(false)

  const submitted = async () =>{
    setLoading(true);
    
    try{
      console.log("Submitted");
      setRegisterError("");
      //console.log(response.data);
      //router.push('/verifyEmailInfo/' + formData.email);
      
    }
    catch(error){
      /*let msg;
      if(error.response.data.error){
        msg = error.response.data.error;
      }
      else{
        msg = "Wystąpił błąd. Spróbuj ponownie.";
      }
      setRegisterError(msg);*/
      console.log("Submit failed: ", error);
      
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
      submitted();
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
    imie: Yup.string().required("Imię jest wymagane"),
    nazwisko: Yup.string().required("Nazwisko jest wymagane"),
    adres: Yup.string().required("Adres jest wymagany"),
    nrDomu: Yup.number().required("Numer domu jest wymagany"),
    nrMieszkania: Yup.number(),
    kodPocztowy: Yup.string().required("Kod pocztowy jest wymagany").matches(/[0-9]{2}-[0-9]{3}/, "Nieprawidłowy kod pocztowy"),
    miejscowosc: Yup.string().required("Miejscowość jest wymagana"),
    NIP: Yup.number().min(10, "NIP musi mieć długość 10 znaków").max(10, "NIP musi mieć długość 10 znaków").required("NIP jest wymagany")
  });

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center mb-5 sm:mb-10">Wypełnij swoje dane</h1>
      <br className="max-md:hidden"/>
      <div className='w-full sm:w-2/3'>
        <form onSubmit={handleSubmit}>
          <textInput name={"Imie"} handle_change={handleChange} form_data={formData} error={errors.imie}/>

            
            
        </form>

      </div>
    </section>
  )
}
{/*
            <input type="submit" value="Zarejestruj" className="black_btn mt-6 ml-6"/>
            {registerError && <p className='text-sm text-red-600 mt-5'>{registerError}</p>}
            {loading && <div className="flex justify-center items-center"><Image src={loadingIMG} width={60} height={60} alt="Loading..." className="m-0 mt-10"></Image></div>}*/}
export default formPage
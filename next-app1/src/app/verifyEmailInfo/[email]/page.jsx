"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
//import { sendEmail } from '@src/app/helpers/mailer'
import axios from 'axios';

const verifyEmailInfo = ({params}) => {
  const router = useRouter()
  const correctEmail = params.email.replace("%40", "@");
  const [error, setError] = useState("");

  const SendMail = async () => {
      try{
        const response = await axios.post("/api/users/sendMail", {
          email: correctEmail,   
        });
        //console.log("resp: ", response);
        //console.log("wysłano maila na ", correctEmail);
      }
      catch(error){
        //console.log();
        setError(error.response.data.error);
      }
      
  }

  useEffect(()=>{
    if(!correctEmail){
      router.push('/loginPage');
    }
    SendMail();
  }, []);
  return (
    <div className='flex flex-col items-center'>
        <h1 className="blue_gradient head_text text-center m-10 p-3">Weryfikacja</h1>
        <h4 className='p-4'>Aby zweryfikować swoje konto kliknij w link, który otrzymałaś/eś w wiadomości na podany adres email.
        </h4>
        <button className='black_btn mt-5' onClick={() => {SendMail(); console.log("clicked trigerred")}}>Wyślij ponownie</button>
        {error && <p className='text-red-500 mt-10 text-center'><b>{error}</b></p>}
    </div>
  )
}

export default verifyEmailInfo
"use client";
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import loadingIMG from "@assets/images/loading.gif";
import Image from "next/image";
import { useRouter } from 'next/navigation'


const verifyEmail = () => {
    const router = useRouter()
    const [token, setToken] = useState("");
    //const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const verifyToken = async () => {
        try{
            const response = await axios.post("/api/users/verifyEmail", {
                token: token,   
            });
            router.push('/loginPage');

        }catch(error){
            //console.log(error.response.data.error);
            setError(error.response.data.error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, []);

    useEffect(() => {
        verifyToken();
    }, [token]);
    return (
        <div className='flex flex-col items-center'>
        
        <h1 className="blue_gradient head_text text-center m-10 p-3">Weryfikacja</h1>
        {error && <p className='text-red-500 mt-3 text-center'>{error}</p>}
        {loading && <div className="flex justify-center items-center"><Image src={loadingIMG} width={60} height={60} alt="Loading..." className="m-0 mt-10"></Image></div>}
       
    </div>
    )
}

export default verifyEmail
"use client";
import React from 'react'
import  { useState, useEffect } from 'react';
import axios from 'axios';
const Home = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({ email: ""})

  useEffect(() => {
    async function getUser(){
      try{
        const res = await axios.get('/api/users/getCurrentUser');
        console.log(res.data.message);
        setUser({
          ...user,
          email: res.data.email,
        });
      }
      catch(error){
        console.log(error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    if(user.email === ""){
      setIsLogged(false);
    }
    else{
      setIsLogged(true);
    }
  }, [user]);

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Main Page</h1>
        <br className="max-md:hidden"/>
        <span className="blue_gradient text-center mobileView">
            cos tam 
        </span>
        {isLogged && <h1>User: {user.email}</h1>}
    </section>
  )
}

export default Home
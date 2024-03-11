"use client";
import Link from "next/link";
import Image from "next/image";
import userImg from "@assets/images/user.png";
import logo from "@assets/images/diamond.png";
import { useState, useEffect } from 'react';
import axios from "axios";
import loadingIMG from "@assets/images/loading.gif";
import { useRouter, usePathname } from 'next/navigation'
import LoggedMenu from "./LoggedMenu";
import NotLoggedMenu from "./NotLoggedMenu";

const Nav = () => {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({ email: ""});
  const [loading, setLoading] = useState(true);
  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const path = usePathname();

  useEffect(() => {
    async function CheckPath(){
      setIsSigning(path === "/loginPage" || path === "/registerPage");
    } 
    CheckPath();
  }, [path]);

  useEffect(() => {
    async function getUser(){
      try{
        const res = await axios.get('/api/users/getCurrentUser');
        setUser({
          ...user,
          email: res.data.email,
        });
        setLoading(false);
      }
      catch(error){
        console.log(error);
      }
    }
    getUser();
    
  }, [path]);

  useEffect(() => {
    if(user.email === ""){
      setIsLogged(false);
    }
    else{
      setIsLogged(true);
    }
  }, [user]);

  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        router.push('/loginPage')
    }catch (error) {
        console.log(error.message);
    }
  }

  if(!loading){
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
      <Image src={logo} width={60} height={60} alt="user" className="object-contain"/>
      </Link>
      {isSigning ? (
        <>
          <NotLoggedMenu/>
        </>
      ) : (
        <>
          {isLogged ? (
            <>
              <LoggedMenu logout={logout}/>
            </>
          ) : (
            <>
              <NotLoggedMenu/>
            </>
          )}
        </>
      )}
    </nav>
  )
  }
  else{
    return (
    <nav className="mb-16 pt-3">
      <div className="flex justify-center items-center">
        <Image src={loadingIMG} width={60} height={60} alt="Loading..." className="m-0"></Image>
      </div>
    </nav>
    );
  }
}

export default Nav
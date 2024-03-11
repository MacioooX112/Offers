import React from 'react'
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import userImg from "@assets/images/user.png";

const LoggedMenu = ({ logout }) => {
  const [toggleDropDown, setToggleDropDown] = useState(false);
  return (
    <>
     {/* -- DESKTOP -- */}
     <div className='desktopView'>
        <div className="flex gap-10 md:gap-15">
            <Link href="/create-post">
            <button className="black_btn m-2">Dodaj ogłoszenie</button>
            </Link>
            <button type="button"
            onClick={logout}
            className="black_btn m-2">Wyloguj się</button>

            <Link href="/profile">
            <Image src={userImg} width={30} height={30} alt="user" className="object-contain mt-2"/>
            </Link>
        </div>
      </div>
      {/* -- MOBILE -- */}
      <div className='mobileView relative'>
        <div className='flex'>
          <Image src={userImg} width={30} height={30} alt="user" className="object-contain" onClick={() => setToggleDropDown((prev) => !prev)}/>
          {toggleDropDown && (
            <div className="dropdown !bg-blue-100 !bg-opacity-90">

              <Link
              href="/profile"
              className="dropdown_link"
              onClick={()=> setToggleDropDown(false)}>
                My Profile
              </Link>

              <Link
              href="/create-post"
              className="dropdown_link"
              onClick={()=> setToggleDropDown(false)}>
                Create Post
              </Link>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setToggleDropDown(false);
                }}
                className="mt-5 w-full black_btn">
                  Wyloguj się
              </button>

            </div>
          )}
        </div>
      </div>
    </>


  )
}

export default LoggedMenu
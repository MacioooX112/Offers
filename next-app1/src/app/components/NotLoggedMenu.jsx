import React from 'react'
import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import userImg from "@assets/images/user.png";

const NotLoggedMenu = () => {
    const [toggleDropDown, setToggleDropDown] = useState(false);
    return (
        <>
            {/* -- DESKTOP -- */}
            <div className="desktopView">
                <Link href="/loginPage">
                    <button className="black_btn m-3" onClick={() => console.log("Signing In")}>
                    Zaloguj
                    </button>
                </Link>
                
                <Link href="/registerPage">
                    <button className="black_btn m-3" onClick={() => console.log("Registering In")}>
                    Zarejestruj
                    </button>
                </Link>
            </div>

            {/* -- MOBILE -- */}
            <div className="mobileView relative">
                <div className="flex">
                    <Image src={userImg} width={30} height={30} alt="user" className="object-contain" onClick={() => setToggleDropDown((prev) => !prev)}/>
                    {toggleDropDown && (
                    <div className="dropdown !bg-blue-600 !bg-opacity-25">
                        <Link
                        href="/loginPage"
                        className="dropdown_link"
                        onClick={()=> setToggleDropDown(false)}>
                        Zaloguj się
                        </Link>
                        <Link
                        href="/registerPage"
                        className="dropdown_link"
                        onClick={()=> setToggleDropDown(false)}>
                        Zarejestruj się
                        </Link>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default NotLoggedMenu
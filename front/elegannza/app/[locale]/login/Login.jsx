'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import '../ui/login.css'
import { useTranslations } from 'next-intl';

import { useCookies } from 'react-cookie';
import { Alert } from '@mui/material';


function login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [CurrentUrl, setCurrentUrl] = useState("");
  const [CurrentPage, setCurrentPage] = useState("");
  const [data, setData] = useState({});
  const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);

  const pathname = usePathname();
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    
    
    console.log(pathname);
    console.log(locale);
    setCurrentUrl(pathname);
    setCurrentPage(pathname.slice(4));

    

  }, [])

  const switchLanguage = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const locale = e.target.value;
  //  router.push('/','/', { locale });
    if(cookie.NEXT_LOCALE !== locale){
    await setCookie("NEXT_LOCALE", locale, { path: "/" });
    }
    console.log(cookie.NEXT_LOCALE);
    console.log(locale);
    console.log(CurrentPage);

    router.push(`/`);
  }

  const t = useTranslations();
  

  const handleUsername = (e) =>
  {
    setUserName(e.target.value);
    console.log(e.target.value);
  }

  const handlePassword = (e) =>
  {
    setPassword(e.target.value);
    console.log(e.target.value);
  }

  const handleLogIn = async (e) =>
  {
    e.preventDefault();
    console.log("login");

    try {

     const res = await fetch("https://elegannza.onrender.com/login",
      {
        method:"POST",

        headers:{
          'Content-Type':'application/json',
        },

        body: JSON.stringify({
          user_name:userName,
          password:password
        })
      })

      const data = await res.json();
      console.log(data);
      localStorage.setItem("JWT", data.authorization);
      console.log(localStorage.getItem("JWT"));

      if(localStorage.getItem("JWT"))
        {
          router.push(`/${cookie.NEXT_LOCALE}/dashboard`);
        }
      
    } catch (error) {
      console.error(error);
    }
   
  }



  return (
    <div className="bg">

    <div className='bg-banner'></div>

    <div className='bg-logo'></div>
    
    <div className='user-logo'>
    <p></p>
    </div>

    <div className='login-form'>

    <button type='button' value={'en'} onClick={(e) => switchLanguage(e)}>Inglés</button>
      <button  value={'es'} onClick={(e) => switchLanguage(e)}>Español</button>

      <input className='userFieldLogin' onChange={(e)=>{handleUsername(e)}} placeholder={t("username_placeholder")} id='userField'></input>
     
      <input type='password' className='userFieldLogin' onChange={(e)=>{handlePassword(e)}} placeholder={t("password_placeholder")} id='pwdField'></input>

      <button onClick={(e) => {handleLogIn(e)}} className='login-Button'>{t("login")}</button>

      </div>

  

    </div>
  )
}

export default login
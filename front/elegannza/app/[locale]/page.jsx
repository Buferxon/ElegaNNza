
"use client"
import { useRouter} from "next/navigation";
import { useEffect } from "react";
import styles from "./ui/home.module.css"
import { useCookies } from 'react-cookie';



export default function Home() {

 
    const router = useRouter();
    const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);
  
  useEffect(() => {
    router.push(`/${cookie.NEXT_LOCALE}/login`);
  }, [])
  

  return null
}

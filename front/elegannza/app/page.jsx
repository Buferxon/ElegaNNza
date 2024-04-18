
"use client"
import { useRouter} from "next/navigation";
import { useEffect } from "react";
import styles from "./ui/home.module.css"

export default function Home() {

 
    const router = useRouter();
  
  useEffect(() => {
    router.push("./login");
  }, [])
  

  return (
    <p className={styles.texto}></p>
  );
}

import React from 'react'
import Box from "@mui/material/Box";
import Image from 'next/image'
import styles from '../ui/login.module.css'
function login() {
  return (
    <div className={styles.bg}>

    <Box 
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        sx={{
        background: `url(${"/OIG1.lLr1p_1VvuwA7rYMep.jpeg"}) center / cover no-repeat`,
        opacity: `5%`,
        backgroundSize: '50%',
    }}  
    /> 

      <div>

        <div>
          <Image
            src={'/user-example.png'}
            width={100}
            height={100}
          />
        </div>
      </div>

    </div>
  )
}

export default login
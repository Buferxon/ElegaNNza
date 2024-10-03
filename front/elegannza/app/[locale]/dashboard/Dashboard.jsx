'use client'
import React from 'react'
import '../ui/dashboard.css'
import Sidebar from '../Components/Sidebar.jsx'

import { useTranslations } from 'next-intl';
import { useCookies } from 'react-cookie';

function Dashboard() {
  return (
    <div className="bg">

    <div className='bg-logo'></div>

    <div>
    <Sidebar />
    </div>
    

    </div>
  )
}

export default Dashboard
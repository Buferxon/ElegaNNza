"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import dynamic from "next/dynamic";
import './Sidebar.css'
import { useTranslations } from 'next-intl';

// import image_logo from '../../public/ID-PROGRESA-UC-2020-BLANCO.png'
// import Image from "next/image";

function Sidebar() {

    const t = useTranslations();
	//Rutas del menú
	const sidebarItems = [
		{
			name: t("home"),
			href: "./dashboard",
			icon: <i className="bi bi-house"></i>,
		},
        {
            name: t("clients"),
            href: "./clients",
            icon: <i className="bi bi-people"></i>,
        },
        {
			name: t("products"),
			href: "./products",
			icon: <i className="bi bi-archive"></i>,
		},
        {
			name: t("sellings"),
			href: "./sellings",
			icon: <i className="bi bi-coin"></i>,
		},
        {
			name: t("admin"),
			href: "./management",
			icon: <i className="bi bi-key-fill"></i>,
		}
		
	];

	const [isCollapsed, SetIsCollapsedSidebar] = useState(true);

	const ToggleSidebarCollapseHandler = () => {
		SetIsCollapsedSidebar((prev) => !prev);
	};

	useEffect(() => {
		if (window.innerWidth <= 600) { SetIsCollapsedSidebar(true) }
		window.addEventListener('resize', function(event){
			if(event.target.innerWidth <= 600){
				SetIsCollapsedSidebar(true)
			}
		  });

	}, [])

	return (
		<div className='sidebar__wrapper'>
        <button className="btn222" data-btn={isCollapsed} onClick={ToggleSidebarCollapseHandler} >
		<i className="bi bi-caret-left-fill"></i>
		</button>
        <aside className='sidebar' data-collapse={isCollapsed}>
            <div className='sidebar__top' >
                <img               
                src="../LOGO.png"
                // width={80}
                // height={80}
                className='sidebar__logo'
                alt="logo"
                />
                <p className='sidebar_logo_name'>ElegaNNza</p>
            </div>
        <ul className='sidebar__list'>

          {sidebarItems.map(({name, href, icon: icon}, index) => (  
          <li key={index} className='sidebar__item'>
            <Link href={href} className='sidebar__link'>
           
                    <span className='siderbar__icon'>
                    {icon}
                    </span>
                    <span className='sidebar__name'>{name}</span>
            </Link>

            </li>))}

        </ul>

        </aside>
    </div>
	);
}

export default dynamic(() => Promise.resolve(Sidebar), { ssr: false });
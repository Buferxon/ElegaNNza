'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import '../ui/Management.css'
import '../Utilities/functions.jsx'
import { datapostputdelget } from '../Utilities/functions.jsx'
import { useTranslations } from 'next-intl';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from 'next/navigation'

function Admins() {

  const [data, setData] = useState([]);
  const router = useRouter();
  const t = useTranslations();

  const getClients = async () => {
		try {

			const query = await datapostputdelget("user?user_type=1","0", "GET");
			console.log(query);
      setData(query);
		} catch (err) {
			console.error(err.message);
		}
	};

  const handleEdit = (e, username) =>
    {
      e.preventDefault();
      router.push(`./editar?username=${username}`);

    }

      useEffect(() => {

        getClients();
      }, [])
    
  return (
    <div className="bg">

        <div className='bg-logo'></div>


            <div className='ContentBox'>
                <Sidebar />

                <div className='Content'>

                  <div className='Title'>
                    <h1>{t("adminsTitle")}</h1>
                  </div>

                  <div className='TableContainer'>
                        <table className='TableAdmins'>
                            <thead>
                            <tr>
                                <th>{t("nameLN")}</th>
                                <th>{t("user_name")}</th>
                                <th>{t("identification")}</th>
                                <th>{t("actions")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            

                            {Array.isArray(data) &&
                              data.map((admin, index) => (
                                <tr>	
                                  
                                  <td>{admin.name} {admin.last_name}</td>
                                  <td>{admin.user_name}</td>
                                  <td>{admin.identification_number}</td>
                                  <td>
                                    <button className='EditBtn' type='button' onClick={(e)=>{handleEdit(e, admin.user_name)}}>
                                    <i className="bi bi-pencil-square"></i>
                                    </button>
                                  </td>

                                </tr>
                              ))}

                            
                            </tbody>

                        </table>

                        </div>
      
                </div>
                
            </div>

 

       
    

    </div>
  )
}

export default Admins
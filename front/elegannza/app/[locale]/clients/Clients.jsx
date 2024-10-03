'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import '../ui/Clients.css'
import '../Utilities/functions.jsx'
import { datapostputdelget } from '../Utilities/functions.jsx'
import { useTranslations } from 'next-intl';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from 'next/navigation'

function Clients() {

  const [data, setData] = useState([]);
  const router = useRouter();
  const t = useTranslations();

  const getClients = async () => {
		try {

			const query = await datapostputdelget("user?user_type=0","0", "GET");
			console.log(query);
      setData(query);
		} catch (err) {
			console.error(err.message);
		}
	};

  const handleEdit = (e, username) =>
    {
      e.preventDefault();
      router.push(`./EditClient?username=${username}`);

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
                    <h1>{t("clientsTitle")}</h1>
                  </div>

                  <div className='TableContainer'>
                        <table className='TableClients'>
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
                              data.map((client, index) => (
                                <tr>	
                                  
                                  <td>{client.name} {client.last_name}</td>
                                  <td>{client.user_name}</td>
                                  <td>{client.identification_number}</td>
                                  <td>
                                    <button className='EditBtn' type='button' onClick={(e)=>{handleEdit(e, client.user_name)}}>
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

export default Clients
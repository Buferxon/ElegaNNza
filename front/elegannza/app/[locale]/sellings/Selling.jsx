'use client'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import { useTranslations } from 'next-intl'
import '../ui/Sellings.css'
import '../Utilities/functions.jsx'
import { datapostputdelget } from '../Utilities/functions.jsx'

function Selling() {

    function formData(fechaString) {
        const fecha = new Date(fechaString);
        const año = fecha.getFullYear().toString().padStart(4, "0");
        const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
        const dia = fecha.getDate().toString().padStart(2, "0");
    
        return `${dia}-${mes}-${año}`;
    }

    const t = useTranslations();

    const [data, setData] = useState([]);

    const getSales = async () => {
		try {

			const query = await datapostputdelget("sales","0", "GET");
			console.log(query);
      setData(query);
		} catch (err) {
			console.error(err.message);
		}
	};
    useEffect(() => {

        getSales();
      }, [])

  return (
  
    <div className="bg">

        <div className='bg-logo'></div>


            <div className='ContentBox'>
                <Sidebar />

                <div className='Content'>

                  <div className='Title'>
                    <h1>{t("SellingsTitle")}</h1>
                  </div>

                  <div className='TableContainer'>
                        <table className='TableClients'>
                            <thead>
                            <tr>
                                <th>{t("nameLN")}</th>
                                <th>{t("user_name")}</th>
                                <th>{t("cost")}</th>
                                <th>{t("SaleDate")}</th>
                            </tr>
                            </thead>
                            <tbody>
                            

                            {Array.isArray(data) &&
                              data.map((sale, index) => (
                                <tr>	
                                  
                                  <td>{sale.name} {sale.last_name}</td>
                                  <td>{sale.name_user}</td>
                                  <td>{sale.total}</td>
                                  <td>{formData(sale.registration_date)}</td>

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

export default Selling
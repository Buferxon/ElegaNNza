'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { datapostputdelget } from '../Utilities/functions';
import '../ui/EditClients.css'
import Sidebar from '../Components/Sidebar';
import { useTranslations } from 'next-intl';

function EditClient() {

    const t = useTranslations();

    const params = useSearchParams();

    const user_name = params.get("username");

    const [Data, setData] = useState();

    const [newData, setNewData] = useState({});

    const getData = async () =>
        {
            const query = await datapostputdelget(`user?user_name=${user_name}`,"0", "GET");
            console.log(query[0]);
            setData(query[0]);
        }

    useEffect(()=>
    {
        getData();
    },[])

    const [ClientAddress,setClientAddress] = useState("");
    const [ClientIdentificationNro,setClientIdentificationNro] = useState("");
    const [ClientIdentificationType,setClientIdentificationType] = useState("");
    const [ClientLastName, setClientLastName] = useState("");
    const [ClientName ,setClientName] = useState("");
    const [ClientPhone, setClientPhone] = useState("");
    const [ClientStatus, setClientStatus] = useState();
    const [ClientuserName, setClientUserName] = useState("");


    useEffect(()=>
        {
            if(Data!= null)
                {
                    setClientAddress(Data.address);
                    setClientIdentificationNro(Data.identification_number);
                    setClientIdentificationType(Data.identification_type);
                    setClientLastName(Data.last_name);
                    setClientName(Data.name);
                    setClientPhone(Data.phone);
                    setClientStatus(Data.status);
                    setClientUserName(Data.user_name);
                }
            
        },[Data])

        const handleName = (newName)=>
            {
                setClientName(newName);
            }
        const handleLastName = (newLastName)=>
            {
                setClientLastName(newLastName);
            }
        const handleUserName = (newUserName)=>
            {
                setClientUserName(newUserName);
            }
        const handleIdentificationType =(newIdentificationType)=>
            {
                setClientIdentificationType(newIdentificationType);
            }
        const handleIdentificationNro =(newIdentificationNro)=>
            {
                setClientIdentificationNro(newIdentificationNro);
            }
        const handleAddress =(newAddress)=>
            {
                setClientAddress(newAddress);
            }
        const handlePhone =(newPhone)=>
            {
                setClientPhone(newPhone);
            }
        const handleItemStatus =(newStatus)=>
            {
                setClientStatus(newStatus);
            }

            const handleSubmit = (e) =>
                {
                  e.preventDefault();
                  setNewData({
                    "name": ClientName,
                    "last_name": ClientLastName,
                    "user_name": ClientuserName,
                    "identification_type": ClientIdentificationType,
                    "identification_number": ClientIdentificationNro,
                    "address": ClientAddress,
                    "phone": ClientPhone,
                    "status": ClientStatus
                  });
                }

                const putData =()=>
                    {
                        try {

                            const query = datapostputdelget(`user/updateUser?user_name=${user_name}`,newData,"PUT");
                            
                        } catch (error) {
                            console.log(error);
                        }
                    }

                useEffect(()=>
                    {
                        if(newData!= null)
                            {
                                putData();
                            }
                        
                    },[newData])
  return (
    <div className="bg">

    <div className='bg-logo'></div>


        <div className='ContentBox'>
            <Sidebar />

            <div className='Content'>

              <div className='Title'>
                <h1>{t("EditclientsTitle")}</h1>
              </div>

                <div className='FormBox'>
                    <form className='AddForm' onSubmit={(e)=>{handleSubmit(e)}} >

                    <div className='FirstHalf'>

                    <label htmlFor='ClientName'>Nombre:</label>
                    <input onChange={(e)=>{handleName(e.target.value)}} className='FormClientInputs' id='ClientName' type='text' value={ClientName}></input>
                    <label htmlFor='ClientLastName'>Apellido:</label>
                    <input onChange={(e)=>{handleLastName(e.target.value)}} className='FormClientInputs' id='ClientLastName' type='text' value={ClientLastName}></input>
                    <label htmlFor='ClientUserName'>Nombre de usuario:</label>
                    <input onChange={(e)=>{handleUserName(e.target.value)}} className='FormClientInputs' id='ClientUserName' type='text' value={ClientuserName}></input>      
                    <label htmlFor='ClientIdentificationType'>Tipo de identificación:</label>
                    <input onChange={(e)=>{handleIdentificationType(e.target.value)}} className='FormClientInputs' id='ClientIdentificationType' type='text' value={ClientIdentificationType}></input>
                    <label htmlFor='ClientIdentificationNro'># de identificación:</label>
                    <input onChange={(e)=>{handleIdentificationNro(e.target.value)}} className='FormClientInputs' id='ClientIdentificationNro' type='number' value={ClientIdentificationNro}></input>
                    <label htmlFor='ClientAddress'>Dirección:</label>
                    <input onChange={(e)=>{handleAddress(e.target.value)}} className='FormClientInputs' id='ClientAddress' type='text' value={ClientAddress}></input>
                    <label htmlFor='ClientPhone'>Teléfono:</label>
                    <input onChange={(e)=>{handlePhone(e.target.value)}} className='FormClientInputs' id='ClientPhone' type='number' value={ClientPhone}></input>
                    <label htmlFor='ClientStatus'>Estado:</label>
                    <select id='ClientStatus' onChange  ={(e)=>{handleItemStatus(e.target.value)}} className='FormDataInputs' value={ClientStatus} >
                            <option value={null}>Seleccione un estado</option>
                            <option value={1}>Disponible</option>
                            <option value={0}>No Disponible</option>
                    </select>
                    
                    </div>

                    <button className='UploadBtn' type='submit'>Guardar cambios</button>

                    </form>
                </div>

                    
            </div>           
        </div>
</div>
  )
}

export default EditClient
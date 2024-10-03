'use client'
import React, { useState, useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import '../ui/AddProduct.css'
import '../Utilities/functions.jsx'
import { datapostputdelget } from '../Utilities/functions.jsx'
import { useTranslations } from 'next-intl';
import "bootstrap-icons/font/bootstrap-icons.css";


function AddProduct() {

    const t= useTranslations();

    const [ItemName, setItemName] = useState("");
    const [ItemImage, setItemImage] = useState("");
    const [ItemCode, setItemCode] = useState("");
    const [ItemPrice, setItemPrice] =  useState("");
    const [ItemType, setItemType] = useState("");
    const [ItemDescription, setItemDescription] = useState("");
    const [ItemStatus, setItemStatus] = useState("");
    const [XS, setXS] = useState("");
    const [S, setS] = useState("");
    const [M, setM] = useState("");
    const [L, setL] = useState("");
    const [XL, setXL] = useState("");
    const [ItemStock, setItemStock] = useState({});

    const [newData, setNewData] = useState({});

    const handleItemName = (ItemName) =>
      {
        console.log(ItemName);
        setItemName(ItemName);
      }

    const handleItemImage = (ItemImage) =>
      {
        console.log(ItemImage);
        setItemImage(ItemImage);
      }

    const handleItemCode = (ItemCode) =>
      {
        console.log(ItemCode);
        setItemCode(ItemCode);
      }

    const handleItemPrice = (ItemPrice) =>
      {
        console.log(ItemPrice);
        setItemPrice(ItemPrice);
      }
    
    const handleItemType = (ItemType) =>
      {
        console.log(ItemType);
        setItemType(ItemType);
      }
    
    const handleItemDescription = (ItemDescription) =>
      {
        console.log(ItemDescription);
        setItemDescription(ItemDescription);
      }

    const handleItemStatus = (ItemStatus) =>
      {
        console.log(ItemStatus);
        setItemStatus(ItemStatus);
      }

    const handleXS = (XS) =>
      {
        console.log(XS);
        setXS(XS);
      }
    const handleS = (S)=>
      {
        console.log(S);
        setS(S);
      }
    const handleM = (M) =>
      {
        console.log(M);
        setM(M);
      }
    const handleL = (L)=>
      {
        console.log(L);
        setL(L);
      }
    const handleXL = (XL) =>
      {
        console.log(XL);
        setXL(XL);
      }   
    const handleItemStock =  () =>
      {
       setItemStock(
        {
          "xs": XS,
          "s": S,
          "m": M,
          "l": L,
          "xl": XL
        }
      );
      }

    const handleSubmit = (e) =>
      {
        e.preventDefault();
        handleItemStock();
      }

    const BuildBody =()=>
      {
        setNewData(
          [{
            "name":ItemName,
            "code":ItemCode,
            "price":ItemPrice,
            "detail":ItemDescription,
            "type_product":ItemType,
            "status":ItemStatus,
            "stock":ItemStock,
            "image":ItemImage
          }]
        );
      }

      useEffect(() => {
        
        if(ItemStock)
          {
            BuildBody();
          }

      }, [ItemStock])

      useEffect(() => {
        
        if(newData)
          {
            console.log(newData);
            addProduct();
          }

      }, [newData])
      

    const addProduct = async () => {
      try {
  
              console.log("ENTRO A DATAPOST");
              const query = await datapostputdelget("product/insert",newData, "POST");
            
       

      } catch (err) {
        console.error(err.message);
      }
	  };


  return (
    <div className="bg">

    <div className='bg-logo'></div>


        <div className='ContentBox'>
            <Sidebar />

            <div className='Content'>

              <div className='Title'>
                <h1>{t("AddProductTitle")}</h1>
              </div>
              
              <div className='FormContainer' >
                <form className='AddForm' onSubmit={(e)=>{handleSubmit(e)}} >

                    <div className='FirstHalf'>
                        <input onChange={(e)=>{handleItemName(e.target.value)}} className='FormDataInputs' type='text' placeholder='Nombre del producto'></input>
                        <input onChange={(e)=>{handleItemImage(e.target.value)}} className='FormDataInputs' type='url' placeholder='Url de imagen'></input>
                        <input onChange={(e)=>{handleItemCode(e.target.value)}} className='FormDataInputs' type='text' placeholder='Código: CD00#'></input>
                        <input onChange={(e)=>{handleItemPrice(e.target.value)}} className='FormDataInputs' type='number' placeholder='precio'></input>

                        <select onChange={(e)=>{handleItemType(e.target.value)}} className='FormDataInputs' value={null} >
                            <option value={null}>Seleccione un tipo</option>
                            <option value={0}>Prenda superior</option>
                            <option value={1}>Prenda inferior</option>
                            <option value={2}>Calzado</option>
                            <option value={3}>Ropa interior</option>
                        </select>

                        <textarea onChange={(e)=>{handleItemDescription(e.target.value)}} className='FormDataInputs' placeholder='Descripción'></textarea>

                        <select onChange  ={(e)=>{handleItemStatus(e.target.value)}} className='FormDataInputs' value={null} >
                            <option value={null}>Seleccione un estado</option>
                            <option value={1}>Disponible</option>
                            <option value={0}>No Disponible</option>
                        </select>
                    </div>

                    <div className='SecondHalf'>

                        <label htmlFor='XSStock'>XS:</label>
                        <input onChange={(e)=>{handleXS(e.target.value)}} className='FormSizesInputs' id='XSStock' type='number' placeholder='#'></input>
                        <label htmlFor='SStock'>S:</label>
                        <input onChange={(e)=>{handleS(e.target.value)}} className='FormSizesInputs' id='SStock' type='number' placeholder='#'></input>
                        <label htmlFor='MStock'>M:</label>
                        <input onChange={(e)=>{handleM(e.target.value)}} className='FormSizesInputs' id='MStock' type='number' placeholder='#'></input>
                        <label htmlFor='LStock'>L:</label>
                        <input onChange={(e)=>{handleL(e.target.value)}} className='FormSizesInputs' id='LStock' type='number' placeholder='#'></input>
                        <label htmlFor='XLStock'>XL:</label>
                        <input onChange={(e)=>{handleXL(e.target.value)}} className='FormSizesInputs' id='XLStock' type='number' placeholder='#'></input>
                    </div>

                    <button className='UploadBtn' type='submit'>Añadir producto</button>
                </form>
              </div>           
            </div>      
        </div>
</div>
  )
}

export default AddProduct
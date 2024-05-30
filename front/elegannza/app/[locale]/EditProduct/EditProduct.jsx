'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar'
import { useTranslations } from 'next-intl';
import '../ui/EditProducts.css'
import { datapostputdelget } from '../Utilities/functions.jsx'
import { useSearchParams } from 'next/navigation'

function EditProduct() {

    const t = useTranslations();

    const params = useSearchParams();

    const code = params.get("code");

    const [Data, setData] = useState();

    const [newName,setNewName] = useState("");
    const [newCode, setNewCode] = useState("");
    const [newDetail, setNewDetail] = useState("");
    const [newImage, setNewImage] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newProductType, setNewProductType] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newXS, setNewXS] = useState("");
    const [newS, setNewS] = useState("");
    const [newM, setNewM] = useState("");
    const [newL, setNewL] = useState("");
    const [newXL, setNewXL] = useState("");
    const [newStock, setNewStock] = useState(""); 

    const [newData, setNewData] = useState(null);

    const getData = async () =>
        {
            const query = await datapostputdelget(`product?code=${code}`,"0", "GET");
            console.log(query[0]);
            setData(query[0]);
        }

    useEffect(()=>
    {
        getData();
    },[])

    useEffect(()=>
        {
            if(Data!= null)
                {
                    setNewName(Data.name);
                    setNewImage(Data.image);
                    setNewCode(Data.code);
                    setNewPrice(Data.price);
                    setNewProductType(Data.type_product);
                    setNewDetail(Data.detail);
                    setNewStatus(Data.status);
                    setNewXS(Data.stock.xs);
                    setNewS(Data.stock.s);
                    setNewM(Data.stock.m);
                    setNewL(Data.stock.l);
                    setNewXL(Data.stock.xl);

                }
            
        },[Data])

    const handleNewName = (NewName) =>
        {
          console.log(NewName);
          setNewName(NewName);
        }

    const handleNewImage = (newImage) =>
        {
          console.log(newImage);
          setNewImage(newImage);
        }
    const handleNewCode = (newCode) =>
        {
          console.log(newCode);
          setNewCode(newCode);
        }
    const handleNewPrice = (newPrice) =>
        {
          console.log(newPrice);
          setNewPrice(newPrice);
        }
    const handleNewType = (newType) =>
        {
          console.log(newType);
          setNewProductType(newType);
        }
    const handleNewDescription = (newDescription) =>
        {
          console.log(newDescription);
          setNewDetail(newDescription);
        }
    const handleNewStatus = (newStatus) =>
        {
          console.log(newStatus);
          setNewStatus(newStatus);
        }
    const handleNewXS = (newXs) =>
        {
          console.log(newXs);
          setNewXS(newXs);
        }
    const handleNewS = (newS) =>
        {
          console.log(newS);
          setNewS(newS);
        }
    const handleNewM = (newM) =>
        {
          console.log(newM);
          setNewM(newM);
        }
    const handleNewL = (newL) =>
        {
          console.log(newL);
          setNewL(newL);
        }
    const handleNewXL = (newXL) =>
        {
          console.log(newXL);
          setNewXL(newXL);
        }

        const handleItemStock =  () =>
            {
             setNewStock(
              {
                "xs": newXS,
                "s": newS,
                "m": newM,
                "l": newL,
                "xl": newXL
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
                    {
                      "name":newName,
                      "price":newPrice,
                      "detail":newDetail,
                      "type_product":newProductType,
                      "status":newStatus,
                      "stock":newStock,
                      "image":newImage
                    }
                  );
                }
          
                useEffect(() => {
                  
                  if(newStock)
                    {
                      BuildBody();
                    }
          
                }, [newStock])

                useEffect(() => {
        
                    if(newData)
                      {
                        console.log(newData);
                        EditProduct();
                      }
            
                  }, [newData])
                  
            
                const EditProduct = async () => {
                  try {

                    if(newData != null)
                        {
                            console.log("ENTRO A DATAPOST");
                            const query = await datapostputdelget(`product/updateProduct?code=${code}`,newData, "PUT");
                        }
        
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
                        <input onChange={(e)=>{handleNewName(e.target.value)}} className='FormDataInputs' type='text' value={newName} ></input>
                        <input onChange={(e)=>{handleNewImage(e.target.value)}} className='FormDataInputs' type='url' value={newImage} ></input>
                        <input onChange={(e)=>{handleNewCode(e.target.value)}} className='FormDataInputs' type='text' value={newCode} ></input>
                        <input onChange={(e)=>{handleNewPrice(e.target.value)}} className='FormDataInputs' type='number' value={newPrice}></input>

                        <select onChange={(e)=>{handleNewType(e.target.value)}} className='FormDataInputs' value={newProductType} >
                            <option value={null}>Seleccione un tipo</option>
                            <option value={0}>Prenda superior</option>
                            <option value={1}>Prenda inferior</option>
                            <option value={2}>Calzado</option>
                            <option value={3}>Ropa interior</option>
                        </select>

                        <textarea onChange={(e)=>{handleNewDescription(e.target.value)}} className='FormDataInputs' value={newDetail}></textarea>

                        <select onChange  ={(e)=>{handleNewStatus(e.target.value)}} className='FormDataInputs' value={newStatus} >
                            <option value={null}>Seleccione un estado</option>
                            <option value={1}>Disponible</option>
                            <option value={0}>No Disponible</option>
                        </select>
                    </div>

                    <div className='SecondHalf'>

                        <label htmlFor='XSStock'>XS:</label>
                        <input onChange={(e)=>{handleNewXS(e.target.value)}} className='FormSizesInputs' id='XSStock' type='number' value={newXS}></input>
                        <label htmlFor='SStock'>S:</label>
                        <input onChange={(e)=>{handleNewS(e.target.value)}} className='FormSizesInputs' id='SStock' type='number' value={newS}></input>
                        <label htmlFor='MStock'>M:</label>
                        <input onChange={(e)=>{handleNewM(e.target.value)}} className='FormSizesInputs' id='MStock' type='number' value={newM}></input>
                        <label htmlFor='LStock'>L:</label>
                        <input onChange={(e)=>{handleNewL(e.target.value)}} className='FormSizesInputs' id='LStock' type='number' value={newL}></input>
                        <label htmlFor='XLStock'>XL:</label>
                        <input onChange={(e)=>{handleNewXL(e.target.value)}} className='FormSizesInputs' id='XLStock' type='number' value={newXL}></input>
                    </div>

                    <button className='UploadBtn' type='submit'>{t("EditProductSaveChanges")}</button>
                </form>
              </div>           
            </div>      
        </div>
</div>

  )
}

export default EditProduct
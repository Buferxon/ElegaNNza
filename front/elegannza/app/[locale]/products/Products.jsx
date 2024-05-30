'use client'

import Sidebar from '../Components/Sidebar'
import '../ui/Products.css'
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react'
import { datapostputdelget } from '../Utilities/functions.jsx'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useRouter } from 'next/navigation';

function Products() {

    const t = useTranslations();

    const [data, setData] = useState([]);
    const [stock,setStock] = useState({});
    const router = useRouter();

    const getProducts = async () => {
		try {

			const query = await datapostputdelget("product","0", "GET");
			console.log(query);
            setData(query);
            
		} catch (err) {
			console.error(err.message);
		}
	};

    const handleAdd = (e) =>
        {
            e.preventDefault();
            router.push(`./AddProduct`);
        }

    useEffect(() => {

        getProducts();
      }, [])

    const handleEditProduct = (e) =>
        {
            e.preventDefault();
            router.push("EditProduct");
        }

  return (
    <div className="bg">

        <div className='bg-logo'></div>


            <div className='ContentBox'>
                <Sidebar/>
            <div className='Content'>

                <div className='Title'>
                    <h1>{t("productsTitle")}</h1>
                </div>

                <div className='AddContainer'>
                    <button type='button' className='AddBtn' onClick={(e)=>handleAdd(e)}>
                    <i class="bi bi-plus-circle-fill"></i> Añadir producto
                    </button>
                </div>

                <div className='productContainer'>

                   

                        {Array.isArray(data) && data.map((product, index) => (
                            
                            <div className='productBox'>
                                <div className='ProductItem' Available={product.status}>
                                    <h3>{product.name}</h3>
                                    <div style={{minHeight:"120px"}}>
                                        <img style={{position:"relative",zIndex:"99",maxHeight:"120px",borderRadius:"30px", zIndex:"99"}} src={product.image?product.image:"data:image/jpeg;base64,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"}></img>
                                    </div>
                                     <p>${product.price}</p>
                                    <p>{product.detail}</p>
                                    <p>Cantidad</p>
                                    <p>XS: {product.stock.xs} S: {product.stock.s} M: {product.stock.m} L: {product.stock.l} XL: {product.stock.xl}</p>
                                    <p style={product.status==1? {color: "green"}:{color:"red"}}>{product.status==1? "Disponible" : "No Disponible"}</p>
                                </div>

                                <div className='ProductActions'>
                                    <button className='ActionBtn' onClick={(e) => {handleEditProduct(e)}} type='button'>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className='ActionBtn' type='button'>
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        ))}

  


                </div>

            </div>
        </div>
    </div>
  )
}

export default Products
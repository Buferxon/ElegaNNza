import React from 'react'
import Sidebar from '../Components/Sidebar'
import '../ui/Clients.css'

function Clients() {
  return (
    <div className="bg">

        <div className='bg-logo'></div>


            <div className='ContentBox'>
                <Sidebar />

                <div className='Content'>
                
                    <div>

                        <table>
                            <thead>
                                Cabecera
                            </thead>
                            <tbody>
                                <th>th</th>
                                <th>th2</th>
                                <td>data</td>
                            </tbody>

                        </table>

                    </div>

                </div>
                
            </div>

 

       
    

    </div>
  )
}

export default Clients
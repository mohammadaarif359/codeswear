import React from 'react'
import { useEffect,useState } from 'react';
import {useRouter} from 'next/router'
import Link from 'next/link'

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([])
  //const [orders,setOrders] = useState([])
  // check not login
  useEffect(() => {  
	const fetchOrders = async() =>{
	  const res = await fetch("/api/myorders",{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({token:JSON.parse(localStorage.getItem('myuser')).token})
     });  
     const orderData = await res.json();
	 setOrders(orderData.data);
	}
	if(!localStorage.getItem('myuser')) {
	  router.push('/login')
    } else {
		fetchOrders();
	}
  }, [router,])
  return (
    <div className="container mx-auto">
	  <h1 className="font-bold text-xl p-6">My Orders</h1> 
      <div className="flex flex-col">
		  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
			  <div className="overflow-hidden">
				<table className="min-w-full">
				  <thead className="bg-white border-b">
					<tr>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Order Id
					  </th>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Amount
					  </th>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Status
					  </th>
					  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
						Action
					  </th>
					</tr>
				  </thead>
				  <tbody>
				    {orders.map((item)=>{
					return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
					  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
					  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
					    {item.amount}
					  </td>
					  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
					    {item.status}
					  </td>
					  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
					    <Link href={'/order?id='+item._id}><a>Deatils</a></Link>
					  </td>
					</tr>
					})}
				  </tbody>
				</table>
			  </div>
			</div>
		  </div>
		</div>
    </div>
  )
}

export default Orders
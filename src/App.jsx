import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react'
import Card from './assets/components/Card'

const App = () => {

  const [userData, setUserData] = useState([])

  const [index, setIndex] = useState(1)

  const getData = async()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`)
    setUserData(response.data)
    // console.log(response.data);
    // console.log('data aa gya');
  }

  useEffect(function(){
    getData()
  },[index])


  // let printUserData = 'No User Available'
  let printUserData = <h3 className='text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</h3>

  if(userData.length>0){
    printUserData = userData.map(function(elem,idx){
      return <div key={idx}>
        {/* <a href={elem.url} >
         <div className='h-40 w-44 overflow-hidden rounded-xl'>
          <img className='h-full w-full object-cover' src={elem.download_url} alt="" />
         </div>
         <h2 className='font-bold text-lg'>{elem.author}</h2>
        </a> */}
        <Card elem={elem} />
      </div>
    })
  }

  return (
    <div className='bg-black overflow-auto h-screen text-white'>
      {/* <h1 className='fixed bg-red-500 text-6xl'>{index}</h1> */}
      
      {/* <button
        onClick={getData}
        className='bg-green-600 active:scale m-4 text-white px-5 py-2 rounded'>
        Get Data
      </button> */}

      <div className='flex flex-wrap gap-4 p-2'>
        {printUserData}
      </div>

      <div className='flex justify-center gap-6 items-center p-4'>
        <button
         onClick={()=>{
          if(index>1){
            setIndex(index-1);
            setUserData([])
          }
        }} style= {{ opacity: index==1 ? 0.5 : 1}} className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'>Prev</button>
        <h4>Page {index}</h4>
        <button onClick={()=>{
          setIndex(index+1);
          setUserData([])
        }} className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'>Next</button>
      </div>
    </div>
  )
}

export default App

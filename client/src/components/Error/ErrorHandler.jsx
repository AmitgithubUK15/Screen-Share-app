import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

export default function ErrorHandler() {
  const {errormsg} = useSelector((state)=>state.error);

  useMemo(()=>{
    if(errormsg){
        if(errormsg === "Please login again"){
            alert(errormsg);
        }
      }
  },[errormsg])
  return (
    <div>
        <p className='py-1 text-center text-red-500 font-semibold text-sm'>{errormsg}</p>
    </div>
  )
}

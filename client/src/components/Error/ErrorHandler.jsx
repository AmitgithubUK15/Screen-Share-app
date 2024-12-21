import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/User/UserSlice';
import {useNavigate} from 'react-router-dom'
import { listenerror } from '../../store/ErrorHandle/ErrorSlice';
import { useSocket } from '../../context/socketConfig/SocketConfig';

export default function ErrorHandler() {
  const {errormsg} = useSelector((state)=>state.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket(); 

  useMemo(()=>{
    if(errormsg){
        if(errormsg === "Please login again"){
            dispatch(logout())
            socket.disconnect();
            alert(errormsg);
            dispatch(listenerror(""));
            navigate("/login")
        }
      }
  },[errormsg])
  return (
    <div>
        <p className='py-1 text-center text-red-500 font-semibold text-sm'>{errormsg}</p>
    </div>
  )
}

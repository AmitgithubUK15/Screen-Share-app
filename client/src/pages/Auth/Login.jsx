
import { useMutation } from '@apollo/client';
import OAuth from '../../components/Auth/OAuth';
import { Login_Type } from '../../Graphql/Mutation/Auth/Auth.mutation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { loginsuccess } from '../../store/User/UserSlice';


export default function Login() {
  const [loginUser] = useMutation(Login_Type);
  const [emailval,setEmailval] = useState("");
  const [passval,setPassVal] = useState("");
  const [error,setError] = useState();
  const navigate = useNavigate();
  const [logining,setLogining] = useState(false);
  const dispatch = useDispatch()

  async function handlesubmit(e) {
    e.preventDefault();
    setLogining(true);
    try {
      let {data} = await loginUser({variables:{email:emailval,password:passval}});
      
      if(data){
        dispatch(loginsuccess(data.loginUser.user._id))
        alert(data.loginUser.msg);
        setLogining(false);
        navigate('/');
      }
    } catch (error) {
      setLogining(false);
      setError(error.message);
    }
  }

  return (
    <div className='w-full h-full'>
       <div className='w-full h-full  flex justify-center items-center'>

          <div className='w-72 border shadow-md rounded-md'>
            
            <div className='py-5 px-3 flex flex-col gap-4'>
              {/* loging header */}
              <div className='text-center'>
                <h1>
                  <span className='font-bold text-4xl'>
                    Login
                  </span>
                </h1>
              </div>

               {/* login form */}
               <div>
                    <div>
                      <form onSubmit={handlesubmit} className='flex flex-col gap-5'>
                        {/* email */}
                        <div>
                          <label className='text-sm font-semibold'>Email </label> <br />
                          <input type="text" className='outline-none text-md border-b border-black  w-full py-2 px-1'
                           placeholder='Enter Your Email...' required 
                           value={emailval} onChange={(e)=>setEmailval(e.target.value)}/>
                        </div>
                         
                         {/* password */}
                        <div>
                        <label className='text-sm font-semibold'>Password</label> <br />
                          <input type="password" className='outline-none text-md border-b border-black  w-full py-2 px-1'
                          name="" id=""  placeholder='Enter Your Password...' required 
                          value={passval} onChange={(e)=>setPassVal(e.target.value)}/>
                        </div>

                        {/* Login button */}
                        <div className=' rounded-md overflow-hidden'>
                          <div className='w-full bg-black'>
                          <button type='submit' className='border w-full text-white p-3 text-md font-semibold'>{logining ? "Logining..." : "Login"}</button>
                          </div>
                        </div>
                      </form>
                    </div>
               </div>
               
               {/* error */}
               <div className='h-6'>
                 <p className='py-1 text-center text-red-500 font-semibold text-sm'>{error}</p>
               </div>
               
               {/* login with google and facebook */}

               <div >
                  <div className='flex flex-col gap-3 '>
                    <div className='text-center text-md'>
                    <h3>Login with:</h3>
                    </div>

                    <div className='flex justify-center'>
                     <OAuth />
                    </div>
                  </div>
                </div>

            </div>

          </div>

       </div>
    </div>
  )
}

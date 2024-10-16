import React from 'react'
import { FaGoogle, FaFacebook } from 'react-icons/fa';

export default function Login() {
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
                      <form action="" className='flex flex-col gap-5'>
                        {/* email */}
                        <div>
                          <label className='text-sm font-semibold'>Email </label> <br />
                          <input type="text" className='outline-none  border-b border-black  w-full py-3 px-1'
                          name="" id=""  placeholder='Enter Your Email...'/>
                        </div>
                         
                         {/* password */}
                        <div>
                        <label className='text-sm font-semibold'>Password</label> <br />
                          <input type="text" className='outline-none border-b border-black  w-full py-3 px-1'
                          name="" id=""  placeholder='Enter Your Password...'/>
                        </div>

                        {/* Login button */}
                        <div className=' rounded-md overflow-hidden'>
                          <div className='w-full bg-black'>
                          <button className='border w-full text-white p-3 text-lg font-semibold'>Login</button>
                          </div>
                        </div>
                      </form>
                    </div>
               </div>

               {/* login with google and facebook */}

               <div >
                  <div className='flex flex-col gap-3 '>
                    <div className='text-center text-md'>
                    <h3>Login with:</h3>
                    </div>

                    <div className='flex justify-center'>
                    <button>
                      <FaGoogle style={{ marginRight: "8px" }} className=' w-6 h-6 hover:text-red-800'/>
                    </button>
                    </div>
                  </div>
                </div>

            </div>

          </div>

       </div>
    </div>
  )
}

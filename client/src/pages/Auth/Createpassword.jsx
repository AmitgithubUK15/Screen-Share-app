import React from 'react'

export default function Createpassword() {
  return (
    <div className='w-full h-full'>
       <div className='w-full h-full  flex justify-center items-center'>

          <div className='w-72 border shadow-md rounded-md'>
            
            <div className='py-5 px-3 flex flex-col gap-6'>
              {/* loging header */}
              <div className='text-center'>
                <h1>
                  <span className='font-bold text-2xl'>
                   Create password
                  </span>
                </h1>
              </div>

               {/* login form */}
               <div>
                    <div>
                      <form action="" className='flex flex-col gap-5'>
                         
                         {/* password */}
                        <div>
                        <label className='text-sm font-semibold'>Password</label> <br />
                          <input type="password" className='outline-none text-md border-b border-black  w-full py-2 px-1'
                          name="" id=""  placeholder='Create new password...'/>
                        </div>

                        {/* Login button */}
                        <div className='  overflow-hidden flex gap-3'>
                          <div className='w-full bg-gray-200 rounded-md'>
                          <button className=' w-full  p-2 text-md font-semibold'>skip</button>
                          </div>
                          <div className='w-full bg-black rounded-md'>
                          <button className=' w-full text-white p-2 text-md font-semibold'>create</button>
                          </div>
                        </div>
                      </form>
                    </div>
               </div>
            </div>

          </div>

       </div>
    </div>
  )
}

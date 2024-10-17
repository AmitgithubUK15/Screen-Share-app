import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CreatePassword_Type } from '../../Graphql/Mutation/Auth/Auth.mutation';
import { useMutation } from '@apollo/client';


export default function Createpassword() {
  const [createpassword] = useMutation(CreatePassword_Type);
  const {emailId} = useParams();
  const [Inputvalue,setInputValue] = useState("")
  const navigate = useNavigate();

  async function handlecreatepassword(e){
    e.preventDefault();
    try {
       let {data} =await createpassword({variables:{email:emailId,password:Inputvalue}});

       if(data){
        navigate('/')
       }
    } catch (error) {
      console.log(error);
    }
  }
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

               {/* form */}
               <div>
                    <div>
                      <form onSubmit={handlecreatepassword} className='flex flex-col gap-5'>
                         
                         {/* password */}
                        <div>
                        <label className='text-sm font-semibold'>Password</label> <br />
                          <input type="password" className='outline-none text-md border-b border-black  w-full py-2 px-1'
                           value={Inputvalue} onChange={(e)=> setInputValue(e.target.value)} placeholder='Create new password...' required/>
                        </div>

                        {/*  button */}
                        <div className='  overflow-hidden flex gap-3'>
                          <div className='w-full bg-gray-200 rounded-md'>
                           <Link to="/">
                           <button className=' w-full  p-2 text-md font-semibold'>skip</button>
                           </Link>
                          </div>
                          <div className='w-full bg-black rounded-md'>
                          <button type='submit' className=' w-full text-white p-2 text-md font-semibold'>create</button>
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

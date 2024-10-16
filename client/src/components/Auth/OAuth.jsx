import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { FaGoogle } from 'react-icons/fa';
import { OAuth_Type } from '../../Graphql/Mutation/Auth/Auth.mutation';
import app from '../../Firebase/firebase';
import { useMutation } from '@apollo/client';
import {useNavigate} from 'react-router-dom'

export default function OAuth() {
  const [SignupUser] = useMutation(OAuth_Type);
  const navigate = useNavigate();

  async function  HandleOAuth() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth,provider);
      
    

      let {data} =  await SignupUser({variables:{name:result.user.displayName,email:result.user.email,profile:result.user.photoURL}});

      if(data){
        navigate(`/createpassword/${data.SignupUser.email}`)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button onClick={HandleOAuth}>
    <FaGoogle style={{ marginRight: "8px" }} className=' w-6 h-6 hover:text-red-800'/>
  </button>
  </div>
  )
}

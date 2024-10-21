import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { FaGoogle } from 'react-icons/fa';
import { OAuth_Type } from '../../Graphql/Mutation/Auth/Auth.mutation';
import app from '../../Firebase/firebase';
import { useMutation } from '@apollo/client';
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { listenerror } from '../../store/ErrorHandle/ErrorSlice';
import { loginsuccess } from '../../store/User/UserSlice';


export default function OAuth() {
  const [SignupUser] = useMutation(OAuth_Type);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function  HandleOAuth() {
    
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth,provider);
      

      let {data} =  await SignupUser({variables:{name:result.user.displayName,email:result.user.email,profile:result.user.photoURL}});

      if(data){
        if(data.SignupUser.msg === "Already Login success"){
          dispatch(loginsuccess(data.SignupUser.user._id))
          dispatch(listenerror(""));
          navigate(`/`)
        } 
        else{
          dispatch(loginsuccess(data.SignupUser.user._id))
          dispatch(listenerror(""));
          navigate(`/createpassword/${data.SignupUser.user._id}`)
        }
      }
    } catch (error) {    
      // alert(error.message);
      dispatch(listenerror(error.message))
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

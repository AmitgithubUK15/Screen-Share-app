import  { useCallback, useEffect, useState } from 'react'
import Peer from '../../service/Peer';
import ReactPlayer from 'react-player';
import { useSocket } from '../../context/socketConfig/SocketConfig';

export default function CreateRoom() {
    const socket = useSocket();
    const [UserId,setUserID] = useState("");
    const [connect,setConnect] = useState(false);
    const [RemoteStream,setRemoteStream] = useState();
    const [RemoteId,setRemoteId] = useState("");
    const [MyStream,setMyStream] = useState();
  
    // const showmsg = useCallback((msg) => {
    //   console.log(msg);
    // }, [])
  
    // const showmsgformroom = useCallback((msg)=>{
    //   console.log(msg);
    // },[])

    const handleIncommingcall = useCallback(async ({offer,from})=>{
      console.log(offer ,from);
      const stream = await navigator.mediaDevices.getUserMedia({video:true});
      setMyStream(stream);
      const answer = await Peer.getAnswer(offer);
      socket.emit("call:accepted",{answer,to:from});
      if(RemoteId === ""){
        setRemoteId(from);
      }
    },[RemoteId, socket]);

    const handlecallAccepted = useCallback(async (answer,to)=>{
      console.log(answer,"call accepted",to);
      await Peer.setLocalDescription(answer);
      if(RemoteId === ""){
        setRemoteId(to)
      }
      setConnect(true);
    },[RemoteId])


    const handleNegoNeeded = useCallback(async () => {
      const offer = await Peer.createOffer();
      socket.emit("peer:nego:needed", { offer, to: RemoteId });
    }, [RemoteId,socket]);

    useEffect(()=>{
      Peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
      return () => {
        Peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
      };
    },[handleNegoNeeded])

  
      if(RemoteId !== ""){
        console.log("remoteid",RemoteId);
      }
    
      const handleNegoNeededIncomming = useCallback(
        async ({ from, offer }) => {
          const ans = await Peer.getAnswer(offer);
          socket.emit("peer:nego:done", { to: from, ans });
        },
        [socket]
      );

      const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await Peer.setLocalDescription(ans);
      }, []);
  
    useEffect(() => {
  
      if (socket) {
        // socket.on('msg', showmsg);
        // socket.on("message",showmsgformroom);
        socket.on("incomming:handle",handleIncommingcall);
        socket.on("call:accepted",handlecallAccepted);
        socket.on("peer:nego:needed",handleNegoNeededIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
      }
  
      return () => {
        if (socket) {
          // socket.off('msg', showmsg);
          // socket.off("message",showmsgformroom);
          socket.off("incomming:handle",handleIncommingcall);
          socket.off("call:accepted",handlecallAccepted);
          socket.off("peer:nego:needed",handleNegoNeededIncomming);
          socket.off("peer:nego:final", handleNegoNeedFinal);
        }
      }
    }, [socket,handleIncommingcall,handlecallAccepted,handleNegoNeededIncomming, handleNegoNeedFinal])
    // showmsg
  
     const handlesubmit = useCallback( async (e)=>{
      e.preventDefault();
      console.log(UserId)
      const stream = await navigator.mediaDevices.getUserMedia({video:true});
      setMyStream(stream);
      const offer = await Peer.createOffer();
      if(socket){
        socket.emit("incomming:call",{offer,UserId});
      }
     },[UserId,socket])

     
      const sendstream = useCallback( async ()=>{
        // const stream = await navigator.mediaDevices.getDisplayMedia({video:true});
        // setMyStream(stream);
        for (const track of MyStream.getTracks()) {
          Peer.peer.addTrack(track, MyStream);
        }
       
       },[MyStream]) 
    
     useEffect(() => {
      const handleTrackEvent = (event) => {    
        console.log("Remote stream received!");
        setRemoteStream(event.streams[0]); 
      };
    
      Peer.peer.addEventListener("track", handleTrackEvent);
    
      return () => {
        Peer.peer.removeEventListener("track", handleTrackEvent);
      };
    }, []);


    if(RemoteStream){
      console.log(RemoteStream);
    }
    return (
      <>
        <div>
          <h1>Screen share</h1>
          <form onSubmit={handlesubmit}>
            <input type="text" value={UserId} onChange={(e)=>setUserID(e.target.value)} placeholder='enter email..'/>
            <button type='submit'>Send req</button>
           </form>
           
           {connect && <p>Avilable for screen sharing</p>}
           <div>
            {connect && <button onClick={sendstream}>Share screen</button>}
             
             {MyStream && (
              <>
              <h1>Mystream</h1>
              <ReactPlayer width={400} height={400} playing url={MyStream} />
              </>
             )}
            {!connect && (
              <>
              <h1>Stream</h1>
              <ReactPlayer width={400} height={400}  playing url={RemoteStream} />
              </>
            )}
           </div>
        </div>
      </>
    )
}

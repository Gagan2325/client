import React, { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios'

const Conversations = ({conversation,currentUser}) => {
   const [user,setUser] = useState(null);
   
   
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

 useEffect(() =>{
  const friendId = conversation.number.find((m) => m !== currentUser._id);
  const getUser = async () => {
    try {
      const res = await axios(`https://server-gagan2325-docintosh.vercel.app/api/users?userId=${friendId}`);
      setUser(res.data);
    } catch (error) {
      console.log(error); 
    }
  }
  getUser();
 },[conversation, currentUser])

 
    return (
    <div className='conversation'>
        <img 
          className='conaversationImg' 
          src={user?.profilePicture? user?.profilePicture: `${PF}/person/noAvatar.png`} 
          alt=""
        />
        <span className='conversationName'>{user?.username}</span>
    </div>
  )
}

export default Conversations
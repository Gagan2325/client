import React from 'react'
import './message.css';
import { format } from "timeago.js";

const message = ({message,own}) => {
    const imgUrl = "https://images.pexels.com/photos/17427379/pexels-photo-17427379/free-photo-of-a-pelican-by-a-sea.jpeg"
  return (
    <div className={own ? "message own" : "message"}>
        <div className='messageTop'>
            <img className='messageImg' src={imgUrl} alt={imgUrl}/>
            <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
    </div> 
  )
}

export default message;
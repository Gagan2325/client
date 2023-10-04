import React from 'react'
import './chatOnline.css'

const chatOnline = () => {
    const imgUrl = "https://images.pexels.com/photos/17427379/pexels-photo-17427379/free-photo-of-a-pelican-by-a-sea.jpeg"
  return (
    <div className='chatOnline'>
        <div className='chatOnlineFriend'> 
            <div className='chatOnlineImgContainer'> 
            <img className='chatOnlineImg' src={imgUrl} alt={imgUrl}/>
                <div className='chatOnlineBadge'> 
                </div>
            </div>
            <div className='chatOnlineName'> John Doe</div>
        </div>
        <div className='chatOnlineFriend'> 
            <div className='chatOnlineImgContainer'> 
            <img className='chatOnlineImg' src={imgUrl} alt={imgUrl}/>
                <div className='chatOnlineBadge'> 
                </div>
            </div>
            <div className='chatOnlineName'> John Doe</div>
        </div>
        <div className='chatOnlineFriend'> 
            <div className='chatOnlineImgContainer'> 
            <img className='chatOnlineImg' src={imgUrl} alt={imgUrl}/>
                <div className='chatOnlineBadge'> 
                </div>
            </div>
            <div className='chatOnlineName'> John Doe</div>
        </div>
    </div>
  )
}

export default chatOnline
import React, { Fragment, useContext, useEffect, useState ,useRef} from 'react';
import "./messenger.css";
import Topbar from '../../components/topbar/Topbar';
import Message from '../../components/message/message';
import ChatOnline from '../../components/chatOnline/chatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import Conversations from '../../components/Conversations/Conversations';
import { io } from "socket.io-client";


const Messenger = () => {
  const [conversations, setConversation] =useState([])
  const [currentChat,setCurrentChat] = useState(null);
  const [messages,setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const {user} = useContext(AuthContext);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://socket-618p.onrender.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.number.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  const getConversation = async () =>{
    try {
      const res = await axios.get(`https://server-gagan2325-docintosh.vercel.app/api/conversations/${user._id}`);
      setConversation(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getMessages = async () =>{
    console.log(currentChat?._id);
    try {
      const res = await axios.get(`https://server-gagan2325-docintosh.vercel.app/api/messages/${currentChat?._id}`);
      setMessages(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getConversation();
  },[user._id])

  useEffect(() =>{
    getMessages();
  },[currentChat])


  console.log(currentChat);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.number.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("https://server-gagan2325-docintosh.vercel.app/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Fragment>
      <Topbar/>
       <div className='messenger'>
          <div className='chatMenu'>
            <div className='chatMenuWrapper'>
              <input placeholder='Search for friends' className='chatMenuInput'/>
              {conversations.map((c) =>(
                <div onClick={() => setCurrentChat(c)}>
                  <Conversations  conversation={c} currentUser={user}/>
                </div>
              ))}
            </div>
          </div>
          <div className='chatBox'>
            <div className='chatBoxWrapper'>
            {currentChat?
              <>
              <div className='chatBoxTop'>
                {messages?.map((m)=>(
                  <div ref={scrollRef}>
                    <Message message={m} own={m.sender === user._id}/>
                  </div>
                ))}
              </div>
              <div className='chatBoxBottom'>
                <textarea 
                  className='chatMessageInput' 
                  placeholder='write something...'
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                /> 
                <button className='chatSubmitButton' onClick={handleSubmit}>send</button>              
              </div></>:
                  <span className='noConversationText'>Open a chat to start conversation</span>
                }
            </div>
          </div>
          <div className='chatOnline'>
            <div className='chatOnlineWrapper'>
              <ChatOnline/>
            </div>
          </div>
       </div> 
    </Fragment>
  )
}

export default Messenger;
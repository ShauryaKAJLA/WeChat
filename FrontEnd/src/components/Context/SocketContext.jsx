import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import io from "socket.io-client";
import { useDispatch } from 'react-redux';
import { addChat } from '../Conversations/chatSlice';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const dispatch=useDispatch()
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const user = (await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getCurrentUser`, { withCredentials: true })).data.data;
                setAuthUser(user);
            } catch (error) {
                console.log(error);
                localStorage.setItem("loggedIn", "false");
            }
        })();
    }, []);

    useEffect(() => {
        if (authUser) {
            const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                console.log(users);
                setOnlineUsers(users);
            });

            newSocket.on("newMessage",(newMessage)=>{
                console.log(newMessage)
                dispatch(addChat(newMessage))
            })
            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers ,setAuthUser }}>
            {children}
        </SocketContext.Provider>
    );
}

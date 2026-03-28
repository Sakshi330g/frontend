import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL:`${server}/api/v1/users`,
    withCredentials:true
});

export const AuthProvider = ({children})=>{

    const [userData,setUserData] = useState(null);

    const navigate = useNavigate();


    const handleLogin = async(username,password)=>{

        const request = await client.post("/login",{
            username,
            password
        });

        if(request.status===200){
            navigate("/home");
        }
    };


    const handleRegister = async(name,username,password)=>{

        const request = await client.post("/register",{
            name,
            username,
            password
        });

        return request.data.message;
    };


    const getHistoryOfUser = async()=>{

        const request = await client.get("/get_all_activity");

        return request.data;
    };


    const addToUserHistory = async(meetingCode)=>{

        const request = await client.post("/add_to_activity",{
            meeting_code:meetingCode
        });

        return request.data;
    };


    const data={
        userData,
        setUserData,
        handleLogin,
        handleRegister,
        getHistoryOfUser,
        addToUserHistory
    };

    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

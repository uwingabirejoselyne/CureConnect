import { createContext, useEffect,useState } from "react";
import { doctors } from "../assets/assets/assets";
import axios from "axios"
import { toast } from 'react-toastify'

export const AppContext = createContext();

const AppContextProvider = (props) =>{
    const currentSymbol ='$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL 
    const[doctors,setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const[userData,setUserData] = useState(false)

    const getDoctorsData = async()=>{
        try {
            const{data} = await axios.get(backendUrl + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)
            }
            else{
                toast.error(error.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    const loadUserProfile  = async()=>{
        console.log("loadUserProfile called");
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})
            console.log(data);
            
            if(data.success){
                setUserData(data.userData)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value = {
        doctors,
        currentSymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfile
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        console.log("useEffect triggered, token is:", token);
        if(token){
            loadUserProfile()
        }
        else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider
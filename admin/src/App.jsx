import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminContextProvider, { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';


const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className='bg-[#f8f9fd]' >
      <ToastContainer/>
      <NavBar/>
      <div className='flex items-start'>
        <SideBar/>
      </div>
    </div>
  ):<>
       <Login/>
       <ToastContainer/>
    </>
}

export default App

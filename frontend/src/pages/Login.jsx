import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {AppContext} from '../context/AppContext'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const {backendUrl,token,setToken} = useContext(AppContext)
  const navigate = useNavigate()
  const [state,setState] = useState('Sign Up')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name,setName] = useState('')

  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      if(state ==='Sign Up'){
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl + '/api/user/login',{email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className=' flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 shadow-lg text-sm'>
        <p className='text-2xl font-semibold'>{state ==='Sign Up'?"Create Account":"Login"}</p>
        <p>Please{state === 'Sign Up'?"Sign Up":"log in"} to book appoitnment</p>
       {state === 'Sign Up' &&  <div className='w-full'>
          <p>Full Name</p>
          <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setName(e.target.value)} value={name} required />
        </div>}
        <div className='w-full'>
          <p>Email</p>
          {/* <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} required /> */}
          <input type="email" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} required />

        </div>
        <div className='w-full'>
          <p>Password</p>
          <input type="password" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setPassword(e.target.value)} value={password} required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state ==='Sign Up'?"Create Account":"Login"}</button>
        {
          state ==="Sign Up"
          ?<p>Already have an Account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span> </p>
          :<p>Create a new Account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login

import React from 'react'
import { specialityData } from '../assets/assets/assets'
import {Link} from 'react-router-dom'

const SpecialistMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-6 text-gray-600'>
      <h1 className='text-3xl font-medium'>Find by speciality</h1>
      <p className=' sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors. schedule your appointment</p>
      <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll' id='speciality'>
        {specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} key={index} to={`/doctors/${item.speciality}`} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                <p>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialistMenu

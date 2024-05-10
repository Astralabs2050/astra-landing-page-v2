import React from 'react'
import { MdOutlineDownloadForOffline } from 'react-icons/md'
import virtualstore from '../../../public/imgs/visualstore.png'
// import Image from 'next/image'

export default function Store() {
  const style = {
    backgroundImage: `url(${virtualstore.src})`, // Assuming using the default loader from Next.js
    backgroundSize: 'cover', // Cover the entire div area
    backgroundPosition: 'center', // Center the background image
    width: '601px', // Example width, adjust as necessary
    height: '400px', // Example height, adjust as necessary
    display: 'flex', // For aligning content within the div
    alignItems: 'center', // Align content vertically
    marginTop: '40px',
    justifyContent: 'center', // Align content horizontally
  }
  return (
    <div className="flex flex-col items-center justify-center pt-[80px]">
      <p className="text-[40px] font-[600] text-[black]">
        Customise your Astraverse Store
      </p>
      <p className="flex items-center gap-[10px]">
        <MdOutlineDownloadForOffline className="text-[20px] font-[400] text-[#4F4F4F]" />
        Click here to place your 3D designs in your virtual store.
      </p>
      <div style={style}>
        <button className="h-[42px] w-[162px] rounded-[32px] border border-white bg-black text-white">
          Customise Store
        </button>
      </div>
    </div>
  )
}

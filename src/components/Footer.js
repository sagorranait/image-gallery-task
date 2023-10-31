import React from 'react'

const Footer = () => {
  return (
    <div className='pt-5 text-center'>
      <p className='pt-10 text-gray-500 text-sm md:text-base'>
        By uploading your files or using our service you agree with our 
        <span className='font-semibold underline cursor-pointer pl-1'>Terms of Service</span> and 
        <span className='font-semibold underline cursor-pointer pl-1'>Privacy Policy</span>.
      </p>
      <p className='pt-2 text-gray-500 text-sm md:text-base'>&copy; 2023 Sagor Rana. All rights reserved.</p>
    </div>
  )
}

export default Footer;
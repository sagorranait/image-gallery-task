import React from 'react'

const Upload = () => {

  return (
    <form>
      <div className="w-full h-full md:h-28 lg:h-40 xl:h-40 2xl:h-44 relative group flex justify-center items-center">
        <div className="absolute inset-0 w-full h-full rounded-xl border border-dashed border-gray-400 bg-opacity-80 backdrop-blur-xl"></div>
        <input
          className="relative z-10 opacity-0 h-full w-full cursor-pointer" 
          type="file"
          name='image'
          onChange={()=>{}}
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full m-auo flex items-center justify-center p-3">
            <div className="space-y-1 md:space-y-3 lg:space-y-6 flex items-center justify-center flex-col">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-center text-xs md:text-sm lg:text-base">Add Images</p>
            </div>
        </div>
      </div>
    </form>
  )
}

export default Upload
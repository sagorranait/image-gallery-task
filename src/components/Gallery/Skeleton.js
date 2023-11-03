import React from 'react'

const Skeleton = () => {
  return (
    <div className="grid grid-cols-5 gap-5 animate-pulse">
      {Array(12).fill().map((_, index) => 
        <div key={index} className={`relative ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} >
          <div className={`w-full ${index === 0 ? 'h-full' : 'h-40'} bg-slate-200 border border-gray-200 rounded-xl`}></div>          
          <div className="absolute top-2 left-3">
            <div className={`w-4 h-4 bg-slate-400 rounded ${index === 11 && 'opacity-0'}`}></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Skeleton;
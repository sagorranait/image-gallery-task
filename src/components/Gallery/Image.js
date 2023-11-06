import React from 'react'

const Image = ({ image, index, selected, clickHandler }) => {
  return (
    <div className={`image-item relative
      ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} 
      data-area={index}
    >
      <div className="relative group">
      <div className="w-full h-full cursor-grab overflow-hidden border border-gray-400 rounded-xl">
          <img src={image.img} alt={`Product-${image.id}`} className={`w-full h-auto ${selected.includes(image.id) && 'opacity-40'}`} />
        </div>
        <div
          className={`image-drop w-full h-full bg-black absolute top-0 left-0 cursor-pointer rounded-xl opacity-0 ${!selected.includes(image.id) && 'group-hover:opacity-40 transition-opacity duration-300'}`}
          onClick={() => clickHandler(image.id)}
        ></div>
      </div>
      <div className="absolute top-2 left-3">
        <input
          type="checkbox"
          className="mr-1 h-4 w-4"
          checked={selected.includes(image.id)}
          onChange={() => clickHandler(image.id)}
        />
      </div>
    </div>
  )
}

export default Image
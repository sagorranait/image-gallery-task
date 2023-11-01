import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    axios.get('data.json')
    .then((response) => {
      setImages(response.data);
    });
  }, []);

  const handleImageClick = (id) => {
    const isSelected = selected.includes(id);
    isSelected ? setSelected(selected.filter((imageId) => imageId !== id)) : setSelected([...selected, id]);
  };


  return (
    <div className='w-4/6 mx-auto bg-white shadow rounded-lg'>
      <div className='border-b'>
        <div className='py-3 px-8 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Gallery</h2>
          <button className='flex items-center gap-1 text-red-600'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <span>Delete File</span>
          </button>
        </div>
      </div>
      <div className='py-8 px-8'>
        <div className="grid grid-cols-5 gap-5">
          {images.map((image, index) => (
            <div key={image.id} className={`relative ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} >
              <img
                src={image.img}
                alt={`Product-${image.id}`}
                className="w-full h-auto cursor-pointer border rounded-xl"
                onClick={() => handleImageClick(image.id)}
              />
              <div className="absolute top-2 left-3">
                <input 
                  type="checkbox"
                  className="mr-1"
                  checked={selected.includes(image.id)}
                  onChange={()=>handleImageClick(image.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery;
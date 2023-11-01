import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from './Skeleton';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('data.json')
    .then((response) => {
      setTimeout(() => {
        setGallery(response.data);
        setLoading(false);
      }, 300);
    }).catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  const imageClickHandler = (id) => {
    const isSelected = selected.includes(id);
    isSelected ? setSelected(selected.filter((imageId) => imageId !== id)) : setSelected([...selected, id]);
  };

  const imageHandler = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  }


  return (
    <div className='w-8/12 mx-auto bg-white shadow rounded-lg'>
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
      <div className='p-7'>
        { loading ? <Skeleton/> : 
          <div className="grid grid-cols-5 gap-5">
            {gallery.map((image, index) => (
              <div key={image.id} className={`relative ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} >
                <div className='relative group'>
                  <img
                    src={image.img}
                    alt={`Product-${image.id}`}
                    className={`w-full h-auto cursor-pointer border border-gray-400 rounded-xl ${selected.includes(image.id) && 'opacity-50'}`}
                  />
                  <div 
                    className={`w-full h-full bg-black absolute top-0 left-0 cursor-pointer rounded-xl opacity-0 ${!selected.includes(image.id) && 'group-hover:opacity-40 transition-opacity duration-300'} `}
                    onClick={() => imageClickHandler(image.id)}
                  ></div>
                </div>
                <div className="absolute top-2 left-3">
                  <input 
                    type="checkbox"
                    className="mr-1"
                    checked={selected.includes(image.id)}
                    onChange={()=> imageClickHandler(image.id)}
                  />
                </div>
              </div>
            ))}
            <form>
              <div className={`${gallery.length === 0 ? 'w-36 h-36' : 'w-full h-full'} relative group flex justify-center items-center`}>
                <div className="absolute inset-0 w-full h-full rounded-xl border border-dashed border-gray-400 bg-opacity-80 backdrop-blur-xl"></div>
                <input
                  className="relative z-10 opacity-0 h-full w-full cursor-pointer" 
                  type="file"
                  name='image'
                  onChange={imageHandler}
                />
                <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full m-auo flex items-center justify-center p-3">
                    <div className="space-y-6 flex items-center justify-center flex-col">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <p className="text-center">Add Images</p>
                    </div>
                </div>
              </div>
            </form>
          </div>
        }
      </div>
    </div>
  )
}

export default Gallery;
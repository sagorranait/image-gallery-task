import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';

import Header from './Header';
import Skeleton from './Skeleton';
import Upload from './Upload';
// import Upload from './Upload';

const Gallery = () => {
  const galleryRef = useRef(null);
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

  useEffect(() => {
    if (galleryRef.current && !loading) {
      new Sortable(galleryRef.current, {
        sort: false,
        group: 'gallery',
        draggable: ".image-item",
        ghostClass: 'image-ghost',
        forceFallback: true,
        touchStartThreshold: 10,
        animation: 150,
        onEnd: (event) => {
          const newGalleryOrder = [...gallery];
          newGalleryOrder.splice(event.newIndex, 0, newGalleryOrder.splice(event.oldIndex, 1)[0]);
          setGallery(newGalleryOrder);
        }
      });
    }
  }, [loading, gallery]);

  const imageDeleteHandler = () => {
    const removeSet = new Set(selected);
    const result = gallery.filter(image => !removeSet.has(image.id));
    setGallery(result);
    setSelected([]);
  }

  const imageClickHandler = (id) => {
    const isSelected = selected.includes(id);
    isSelected ? setSelected(selected.filter((imageId) => imageId !== id)) : setSelected([...selected, id]);
  };

  return (
    <div className='w-11/12 lg:w-11/12 xl:w-9/12 2xl:w-8/12 mx-auto bg-white shadow rounded-lg'>
      <Header selected={selected} onSelected={()=> setSelected([])} onDelete={imageDeleteHandler} />      
      <div className='p-7' >
        { loading ? <Skeleton/> : 
         <div className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-5" ref={galleryRef}>
         { gallery.map((image, index) => (
           <div key={image.id} className={`image-item relative
              ${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`} 
            >
             <div className="relative group">
              <div className="w-full h-auto cursor-grab overflow-hidden border border-gray-400 rounded-xl">
                 <img src={image.img} alt={`Product-${image.id}`} className={`w-full h-auto ${selected.includes(image.id) && 'opacity-40'}`} />
               </div>
               <div
                 className={`w-full h-full bg-black absolute top-0 left-0 cursor-pointer rounded-xl opacity-0 ${!selected.includes(image.id) && 'group-hover:opacity-40 transition-opacity duration-300'}`}
                 onClick={() => imageClickHandler(image.id)}
               ></div>
             </div>
             <div className="absolute top-2 left-3">
               <input
                 type="checkbox"
                 className="mr-1 h-4 w-4"
                 checked={selected.includes(image.id)}
                 onChange={() => imageClickHandler(image.id)}
               />
             </div>
           </div>
         ))}
         {/* Image Upload from */}
         <Upload />
       </div>
        }
      </div>
    </div>
  )
}

export default Gallery;
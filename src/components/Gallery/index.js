import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';

import Header from './Header';
import Skeleton from './Skeleton';
import Upload from './Upload';
import Image from './Image';
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
        swap: true,
        group: 'gallery',
        draggable: ".image-item",
        ghostClass: 'image-ghost',
        swapThreshold: 1,
        invertSwap: true,
        animation: 150,
        onEnd: (event) => {
          const newGalleryOrder = [...gallery];
          newGalleryOrder.splice(event.newIndex, 0, newGalleryOrder.splice(event.oldIndex, 1)[0]);
          setGallery(newGalleryOrder);
        },
      });
    }
  }, [loading, gallery]);

  // Select Handler
  const imageClickHandler = (id) => {
    const isSelected = selected.includes(id);
    isSelected ? setSelected(selected.filter((imageId) => imageId !== id)) : setSelected([...selected, id]);
  }

  // Delete Handler
  const imageDeleteHandler = () => {
    const removeSet = new Set(selected);
    const result = gallery.filter(image => !removeSet.has(image.id));
    setGallery(result);
    setSelected([]);
  }

  return (
    <div className='w-11/12 lg:w-11/12 xl:w-9/12 2xl:w-8/12 mx-auto bg-white shadow rounded-lg'>
      <Header selected={selected} onSelected={()=> setSelected([])} onDelete={imageDeleteHandler} />      
      <div className='p-7' >
        { loading ? <Skeleton/> : 
         <div className="grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-5" ref={galleryRef}>
         { gallery.map((image, index) => (
          <Image key={image.id} image={image} index={index} selected={selected} clickHandler={imageClickHandler} />
         ))}
         {/* Image Upload input from */}
         <Upload />
       </div>
        }
      </div>
    </div>
  )
}

export default Gallery;
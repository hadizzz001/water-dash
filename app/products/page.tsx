"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Dropzone from '../components/Dropzone';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AddPost() {
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');   
  const [img, setImg] = useState(['']); 
  const [img1, setImg1] = useState(['']); 

 

 


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
if (img.length === 1 && img[0] === '') {
  alert('Please choose atleast 1 image');
}
else if (img1.length === 1 && img1[0] === '') {
  alert('Please choose atleast 1 image');
}

else {
  const payload = {
    title, description, img, img1
  };

  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    alert('Post added successfully!');
    window.location.href = '/dashboard';
  } else {
    alert('Failed to add Post');
  }
}
  };

  const handleImgChange = (url) => {
    if (url) {
      setImg(url);
    }
  };
  const handleImgChange1 = (url) => {
    if (url) {
      setImg1(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Add New Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-4"
        required
      /> 
 
 
      <label className="block text-lg font-bold mb-2">Description</label>
      <ReactQuill
        value={description}
        onChange={setDescription}
        className="mb-4"
        theme="snow"
        placeholder="Write your Post description here..."
      />

<style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .uploadcare--widget {\n    background:black;\n  }\n  "
        }}
      />
      <label className='mt-20' htmlFor="">Cover Image</label>
      <Dropzone HandleImagesChange={handleImgChange} /> 

      
      <label  className='mt-20' htmlFor="">Gallery</label>
      <Dropzone HandleImagesChange={handleImgChange1} /> 

<div className='mt-20'></div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Save Post
      </button>
    </form>
  );
}

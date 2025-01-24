'use client';

import { useState, useEffect } from 'react';
import Dropzone from '../components/Dropzone';
import { redirect, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ManageCategory = () => {
  const [formData, setFormData] = useState({ name: '', desc: '', img: [] ,link:'' });
  const [editFormData, setEditFormData] = useState({ id: '', name: '', desc: '', img: [],link:'' });
  const [description, setDescription] = useState(''); // State for ReactQuill
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState([]); // Store images in an array
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/homeB', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/homeB', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, desc: description }),
    });

    if (res.ok) {
      setMessage('home banner added successfully!');
      setFormData({ name: '', desc: '', img: [],link:'' });
      setDescription('');
      fetchCategories();
      window.location.href = '/homeB';
    } else {
      const errorData = await res.json();
      setMessage(`Error: ${errorData.error}`);
    }
  };

  // Edit category
  const handleEdit = (category) => {
    setEditMode(true);
    setEditFormData({
      id: category.id,
      name: category.name,
      desc: category.desc,
      img: category.img,
      link: category.link,
    });
    setDescription(category.desc); // Populate Quill editor
    setImg(category.img); // Populate img state with existing images for editing
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/homeB?id=${encodeURIComponent(editFormData.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editFormData.name,
          desc: description, // Send updated Quill content
          img: img,
          link:editFormData.link,
        }),
      });

      if (res.ok) {
        window.location.reload();
        setEditFormData({ id: '', name: '', desc: '', img: [], link:'' });
        setEditMode(false);
        setDescription('');
        fetchCategories();
      } else {
        const errorData = await res.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while updating the category.');
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (confirm(`Are you sure you want to delete this home home banner?`)) {
      try {
        const res = await fetch(`/api/homeB?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setMessage('Home home banner deleted successfully!');
          fetchCategories();
          redirect('/homeB');
        } else {
          const errorData = await res.json();
          setMessage(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleImgChange = (url) => {
    if (url) {
      setImg(url); // Update img state with new image URL
    }
  };

  useEffect(() => {
    if (!img.includes('')) {
      setFormData((prevState) => ({ ...prevState, img }));
    }
  }, [img]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{editMode ? 'Edit home banner' : 'Add home banner'}</h1>
      <form onSubmit={editMode ? handleEditSubmit : handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={editMode ? editFormData.name : formData.name}
            onChange={(e) =>
              editMode
                ? setEditFormData({ ...editFormData, name: e.target.value })
                : setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <label className="block text-lg font-bold mb-2">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="mb-4"
            theme="snow"
            placeholder="Write your product description here..."
          />
        </div>

        <label className="block mb-1">Link</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={editMode ? editFormData.link : formData.link}
            onChange={(e) =>
              editMode
                ? setEditFormData({ ...editFormData, link: e.target.value })
                : setFormData({ ...formData, link: e.target.value })
            }
            required
          />

        <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .uploadcare--widget {\n    background:black;\n  }\n  "
        }}
      />

        <Dropzone HandleImagesChange={handleImgChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editMode ? 'Update home banner' : 'Add home banner'}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}

      <h2 className="text-xl font-bold mt-8">All home banners</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id}>
                <td className="border border-gray-300 p-2">{category.name}</td>
                <td className="border border-gray-300 p-2">
                  <img src={category.img[0]} alt="Product Image" className="w-24 h-auto" />
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-300 p-2 text-center">No home banners found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;

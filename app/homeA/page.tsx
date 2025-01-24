'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const ManageCategory = () => {
  const [editFormData, setEditFormData] = useState({ id: '', desc: '' });
  const [description, setDescription] = useState(''); // State for ReactQuill
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/homeA', { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);

        // Set the last category's id and description
        if (data.length > 0) {
          const lastCategory = data[data.length - 1];
          setEditFormData({ id: lastCategory.id, desc: lastCategory.desc || '' });
          setDescription(lastCategory.desc || ''); // Default to empty if desc is undefined
        }
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

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editFormData.id) {
      setMessage('No data selected for updating.');
      return;
    }

    try {
      const res = await fetch(`/api/homeA?id=${encodeURIComponent(editFormData.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          desc: description,
        }),
      });

      if (res.ok) {
        setMessage('About updated successfully!');
        setEditFormData({ id: '', desc: '' });
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit About</h1>
      <form onSubmit={handleEditSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-bold mb-2">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="mb-4"
            theme="snow"
            placeholder="Write your product description here..."
          />
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .uploadcare--widget {
                background: black;
              }
            `,
          }}
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Update Banner
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ManageCategory;

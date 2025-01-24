'use client';

import { useState, useEffect } from 'react'; 
import 'react-quill/dist/quill.snow.css'; // Import ReactQuill styles
import Dropzone from '../components/Dropzone';
import dynamic from 'next/dynamic'; 

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function PostTable() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts');
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    } else {
      console.error('Failed to fetch posts');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Post deleted successfully');
          fetchPosts();
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleUpdate = async (updatedPost) => {
    try {
      const response = await fetch(`/api/posts/${updatedPost.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        alert('Post updated successfully');
        setEditingPost(null);
        fetchPosts();
      } else {
        console.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filterBySearch = (post) => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const filteredPosts = posts.filter((post) => filterBySearch(post));

  return (
    <div className="max-w-6xl mx-auto p-4">
      {editingPost && (
        <EditPostForm
          post={editingPost}
          onCancel={() => setEditingPost(null)}
          onSave={handleUpdate}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">Post List</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border p-2"
          placeholder="Search by title..."
        />
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Pic</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">
                <img src={post.img[0]} alt="Post Image" className="w-24 h-auto" />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EditPostForm({ post, onCancel, onSave }) {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description || '');
  const [img, setImg] = useState(post.img || []);
  const [img1, setImg1] = useState(post.img1 || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...post,
      title,
      description,
      img,
      img1,
    });
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

  const handleQuillChange = (value) => {
    setDescription(value);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>

      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2"
          placeholder="Title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <ReactQuill
          value={description}
          onChange={handleQuillChange}
          className="mb-4"
          theme="snow"
          placeholder="Write your description here..."
        />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .uploadcare--widget {\n    background:black;\n  }\n  "
        }}
      />
      <label className="block text-sm font-medium text-gray-700 mt-4">Cover Image</label>
      <Dropzone defaultValue={img} HandleImagesChange={handleImgChange} />

      <label className="block text-sm font-medium text-gray-700 mt-4">Gallery</label>
      <Dropzone defaultValue={img1} HandleImagesChange={handleImgChange1} />

      <div className="flex gap-2 mt-6">
        <button type="submit" className="bg-green-500 text-white px-4 py-2">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

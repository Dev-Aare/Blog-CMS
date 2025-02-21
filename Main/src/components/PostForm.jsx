import { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore'

function PostForm({ editingPost, setShowForm, setEditingPost }) {
  const [title, setTitle] = useState(editingPost?.title || '')
  const [content, setContent] = useState(editingPost?.content || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      if (editingPost) {
        // Update existing post
        const postRef = doc(db, 'posts', editingPost.id)
        await updateDoc(postRef, {
          title,
          content,
          updatedAt: new Date().toISOString()
        })
      } else {
        // Create new post
        await addDoc(collection(db, 'posts'), {
          title,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      }
      setShowForm(false)
      setEditingPost(null)
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('Error submitting post:', error)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editingPost ? 'Edit Post' : 'Create New Post'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post Content"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          {loading ? 'Saving...' : editingPost ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default PostForm
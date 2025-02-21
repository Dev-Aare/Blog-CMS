import { useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import PostList from '../components/PostList'
import PostForm from '../components/PostForm'
import { FaSignOutAlt } from 'react-icons/fa'

function Dashboard() {
  const [signOut] = useSignOut(auth)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Blog CMS</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingPost(null)
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            {showForm ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {showForm && (
          <PostForm 
            editingPost={editingPost} 
            setShowForm={setShowForm}
            setEditingPost={setEditingPost}
          />
        )}
        
        <PostList setEditingPost={setEditingPost} setShowForm={setShowForm} />
      </main>
    </div>
  )
}

export default Dashboard
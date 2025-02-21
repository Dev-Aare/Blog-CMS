import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { FaEdit, FaTrash } from 'react-icons/fa'

function PostList({ setEditingPost, setShowForm }) {
  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }

  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deleteDoc(doc(db, 'posts', id))
      refetch()
    }
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading posts...</div>
  }

  return (
    <div className="grid gap-4">
      {posts?.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
              <p className="text-sm text-gray-500 mt-2">
                Created: {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingPost(post)
                  setShowForm(true)
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostList
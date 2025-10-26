"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/auth";
import { adminApi } from "@/lib/api";
import AdminLayout from "@/components/AdminLayout";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function BlogsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
      router.replace("/");
      return;
    }

    loadPosts();
  }, [router]);

  const loadPosts = async () => {
    try {
      const response = await adminApi.getBlogPosts();
      if (response.success) {
        setPosts(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Failed to load blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    try {
      const response = await adminApi.createBlogPost(newPost);
      if (response.success) {
        loadPosts();
        setNewPost({ title: "", content: "" });
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;
    try {
      const response = await adminApi.updateBlogPost(editingPost.id, editingPost);
      if (response.success) {
        loadPosts();
        setEditingPost(null);
      }
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const response = await adminApi.deleteBlogPost(id);
      if (response.success) {
        loadPosts();
        if (selectedPost?.id === id) {
          setSelectedPost(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading blog posts...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-600">Manage blog content</p>
        </div>

        {/* Create New Post Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Create New Post</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Content"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleCreatePost}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Create Post
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Posts List */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <li key={post.id}>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className={`w-full text-left px-4 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                        selectedPost?.id === post.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPost(post);
                            }}
                            className="text-blue-600 hover:text-blue-900 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post.id);
                            }}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {posts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-sm text-gray-500">No blog posts found</div>
              </div>
            )}
          </div>

          {/* Post Detail / Edit Form */}
          <div className="lg:col-span-2">
            {editingPost ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Post</h3>
                </div>
                <div className="border-t border-gray-200">
                  <div className="p-6 space-y-4">
                    <input
                      type="text"
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="space-x-2">
                      <button
                        onClick={handleUpdatePost}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Update Post
                      </button>
                      <button
                        onClick={() => setEditingPost(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedPost ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedPost.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Created on {new Date(selectedPost.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <div className="p-6">
                    <div className="whitespace-pre-wrap break-words text-gray-900">
                      {selectedPost.content}
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={() => handleDeletePost(selectedPost.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Delete Post
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Select a Post</h3>
                  <p className="mt-1 text-sm text-gray-500">Choose a blog post from the list to view or edit</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
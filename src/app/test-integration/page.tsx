"use client";

import { useEffect, useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function TestIntegrationPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try direct fetch first
      const directResponse = await fetch("http://localhost:5000/api/blog/posts");
      console.log("Direct fetch response:", directResponse);
      const directData = await directResponse.json();
      console.log("Direct fetch data:", directData);
      
      // Then try through proxy
      const proxyResponse = await fetch("/api/blog/posts");
      console.log("Proxy fetch response:", proxyResponse);
      const proxyData = await proxyResponse.json();
      console.log("Proxy fetch data:", proxyData);
      
      if (proxyData.success) {
        setBlogPosts(proxyData.posts || []);
      } else {
        setError("Failed to load blog posts: " + (proxyData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Failed to load blog posts:", error);
      setError("Failed to load blog posts. Please try again later. Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Test Integration Page</h1>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Test Integration Page</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Blog Posts</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={loadBlogPosts}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Test Integration Page</h1>
      <div className="mb-6">
        <button
          onClick={loadBlogPosts}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Refresh Posts
        </button>
      </div>
      
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.content}</p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Blog Posts Yet</h2>
          <p className="text-gray-600">Check back soon for updates.</p>
        </div>
      )}
    </div>
  );
}
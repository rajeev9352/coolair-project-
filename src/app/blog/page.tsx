"use client";

import { useEffect, useState } from "react";
import PageHero from "../../components/ui/PageHero";
import { api } from "@/lib/api-client";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<{ success: boolean; posts: BlogPost[] }>("/api/blog/posts");
      if (response.success) {
        setBlogPosts(response.posts || []);
      } else {
        setError("Failed to load blog posts");
      }
    } catch (error) {
      console.error("Failed to load blog posts:", error);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic props for PageHero based on blogPosts length
  const heroProps = blogPosts.length > 0
    ? {
        className: "text-left pl-6",
        titleClassName: "text-3xl md:text-4xl",
        subtitleClassName: "text-lg md:text-xl",
        initial: { opacity: 0, x: 100, y: -20 }, // Start off-screen right and up
        animate: { opacity: 1, x: 0, y: 0 }, // Slide to top-left
        transition: { duration: 0.6 },
      }
    : {
        className: "text-center", // Default centered layout
        titleClassName: "text-5xl md:text-6xl",
        subtitleClassName: "text-xl",
        initial: { opacity: 0, y: 30 }, // Default animation from bottom
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
      };

  if (loading) {
    return (
      <main className="min-h-screen">
        <PageHero
          title="Our Blog"
          subtitle="Stay updated with the latest trends, tips, and news in cooling technology."
          background="/images/background/19.webp"
          className={heroProps.className}
        />
        <div className="container mx-auto px-4 py-10 text-center">
          <p>Loading blog posts...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen">
        <PageHero
          title="Our Blog"
          subtitle="Stay updated with the latest trends, tips, and news in cooling technology."
          background="/images/background/19.webp"
          className="text-center"
        />
        <div className="container mx-auto px-4 py-10 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
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
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <PageHero
        title="Our Blog"
        subtitle="Stay updated with the latest trends, tips, and news in cooling technology."
        background="/images/background/19.webp"
        className={heroProps.className}
        // Pass motion props to control animation
        titleMotionProps={{
          initial: heroProps.initial,
          animate: heroProps.animate,
          transition: heroProps.transition,
          className: heroProps.titleClassName,
        }}
        subtitleMotionProps={{
          initial: heroProps.initial,
          animate: heroProps.animate,
          transition: { ...heroProps.transition, delay: 0.2 },
          className: heroProps.subtitleClassName,
        }}
      />
      {blogPosts.length > 0 ? (
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.content}</p>
                  <p className="text-xs text-gray-400">
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Full Post */}
          {selectedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedPost.title}</h3>
                  <div className="text-gray-700 whitespace-pre-wrap prose max-w-none">{selectedPost.content}</div>
                  <p className="text-sm text-gray-500 mt-4">
                    Posted on {formatDate(selectedPost.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="mx-6 mb-6 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Blog Posts Yet</h2>
          <p className="text-gray-600">Check back soon for updates on cooling technology.</p>
        </div>
      )}
    </main>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api-client";

// interface BlogPost {
//   id: number;
//   title: string;
//   content: string;
//   createdAt: string;
// }

// export default function BlogTestPage() {
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     loadBlogPosts();
//   }, []);

//   const loadBlogPosts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await api.get<{ success: boolean; posts: BlogPost[] }>("/api/blog/posts");
//       console.log("API Response:", response);
//       if (response.success) {
//         console.log("Posts:", response.posts);
//         setBlogPosts(response.posts || []);
//       } else {
//         setError("Failed to load blog posts");
//       }
//     } catch (error) {
//       console.error("Failed to load blog posts:", error);
//       setError("Failed to load blog posts. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold mb-6">Blog Test Page</h1>
//         <p>Loading blog posts...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold mb-6">Blog Test Page</h1>
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl">
//           <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Blog Posts</h3>
//           <p className="text-red-700 mb-4">{error}</p>
//           <button
//             onClick={loadBlogPosts}
//             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-6">Blog Test Page</h1>
//       <div className="mb-6">
//         <button
//           onClick={loadBlogPosts}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//         >
//           Refresh Posts
//         </button>
//       </div>
      
//       <div className="mb-6 p-4 bg-gray-100 rounded">
//         <h2 className="text-xl font-semibold mb-2">Debug Info</h2>
//         <p>Total posts: {blogPosts.length}</p>
//       </div>
      
//       {blogPosts.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogPosts.map((post) => (
//             <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
//                 <p className="text-gray-600 text-sm mb-4">{post.content}</p>
//                 <p className="text-xs text-gray-400">
//                   {new Date(post.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-10">
//           <h2 className="text-2xl font-semibold text-gray-900 mb-4">No Blog Posts Yet</h2>
//           <p className="text-gray-600">Check back soon for updates.</p>
//         </div>
//       )}
//     </div>
//   );
// }
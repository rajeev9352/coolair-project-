// "use client";

// import { useEffect, useState } from "react";
// import { api } from "@/lib/api-client";

// interface BlogPost {
//   id: number;
//   title: string;
//   content: string;
//   createdAt: string;
// }

// export default function DebugBlogPage() {
//   const [rawResponse, setRawResponse] = useState<any>(null);
//   const [formattedResponse, setFormattedResponse] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     loadBlogPosts();
//   }, []);

//   const loadBlogPosts = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // Using the same API call as the blog page
//       const response = await api.get<{ success: boolean; posts: BlogPost[] }>("/api/blog/posts");
      
//       setRawResponse(response);
      
//       if (response.success) {
//         setFormattedResponse(response.posts || []);
//       } else {
//         setError("API returned success: false");
//       }
//     } catch (error) {
//       console.error("Failed to load blog posts:", error);
//       setError("Failed to load blog posts. Please try again later.");
//       setRawResponse(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-10">
//         <h1 className="text-3xl font-bold mb-6">Debug Blog Page</h1>
//         <p>Loading blog posts...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-6">Debug Blog Page</h1>
//       <div className="mb-6">
//         <button
//           onClick={loadBlogPosts}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//         >
//           Refresh Posts
//         </button>
//       </div>
      
//       {error && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
//           <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
//           <p className="text-red-700 mb-4">{error}</p>
//           <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
//             {JSON.stringify(rawResponse, null, 2)}
//           </pre>
//         </div>
//       )}
      
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
//         <h3 className="text-lg font-medium text-gray-800 mb-2">Raw Response</h3>
//         <pre className="bg-white p-4 rounded overflow-x-auto">
//           {JSON.stringify(rawResponse, null, 2)}
//         </pre>
//       </div>
      
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
//         <h3 className="text-lg font-medium text-gray-800 mb-2">Formatted Response</h3>
//         <pre className="bg-white p-4 rounded overflow-x-auto">
//           {JSON.stringify(formattedResponse, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }
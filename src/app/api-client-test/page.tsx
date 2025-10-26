"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api-client";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function ApiClientTestPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testApiClient();
  }, []);

  const testApiClient = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using the exact same API client call as the blog page
      const result = await api.get<{ success: boolean; posts: BlogPost[] }>("/api/blog/posts");
      
      setResponse(result);
    } catch (err) {
      console.error("API Client Test Error:", err);
      setError("Failed to fetch data: " + (err as Error).message);
      setResponse(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">API Client Test Page</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">API Client Test Page</h1>
      <div className="mb-6">
        <button
          onClick={testApiClient}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Test API Client Again
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
          <p className="text-red-700 mb-4">{error}</p>
        </div>
      )}
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2">API Client Response</h3>
        <pre className="bg-white p-4 rounded overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
}
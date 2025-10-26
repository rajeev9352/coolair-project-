"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/auth";
import { adminApi } from "@/lib/api";
import AdminLayout from "@/components/AdminLayout";

interface Subscriber {
  id: number;
  email: string;
  createdAt: string;
}

export default function SubscribePage() {
  const router = useRouter();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);

  useEffect(() => {
    if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
      router.replace("/");
      return;
    }

    loadSubscribers();
  }, [router]);

  const loadSubscribers = async () => {
    try {
      const response = await adminApi.getSubscribers(); // Assuming this endpoint exists
      if (response.success) {
        setSubscribers((response.data as any)?.subscribers || []);
      }
    } catch (error) {
      console.error("Failed to load subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (id: number) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      const response = await adminApi.deleteSubscriber(id); // Assuming this endpoint exists
      if (response.success) {
        loadSubscribers();
        if (selectedSubscriber?.id === id) {
          setSelectedSubscriber(null);
        }
      }
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading subscribers...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriber List</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review and manage newsletter subscribers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subscribers List */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <li key={subscriber.id}>
                    <button
                      onClick={() => setSelectedSubscriber(subscriber)}
                      className={`w-full text-left px-4 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                        selectedSubscriber?.id === subscriber.id ? "bg-indigo-50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {subscriber.email}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(subscriber.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSubscriber(subscriber.id);
                            }}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {subscribers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-sm text-gray-500">No subscribers found</div>
              </div>
            )}
          </div>

          {/* Subscriber Detail */}
          <div className="lg:col-span-2">
            {selectedSubscriber ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Subscriber Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Subscribed on {new Date(selectedSubscriber.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <a
                          href={`mailto:${selectedSubscriber.email}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {selectedSubscriber.email}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={() => handleDeleteSubscriber(selectedSubscriber.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Delete Subscriber
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Select a Subscriber
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a subscriber from the list to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
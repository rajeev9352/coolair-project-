// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { AuthService } from '@/lib/auth'
// import { adminApi } from '@/lib/api'
// import AdminLayout from '@/components/AdminLayout'
// import DashboardStats from '@/components/DashboardStats'

// export default function Dashboard() {
//   const router = useRouter()
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalContacts: 0,
//     adminUsers: 0,
//     regularUsers: 0,
//     totalSubscribers: 0
//   })

//   useEffect(() => {
//     if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
//       router.replace('/')
//       return
//     }

//     loadStats()
//   }, [router])

//   const loadStats = async () => {
//     try {
//       const [usersResponse, contactsResponse, subscribersResponse] = await Promise.all([
//         adminApi.getUsers(),
//         adminApi.getContacts(),
//         adminApi.getSubscribers ? adminApi.getSubscribers() : Promise.resolve({ success: true, data: { subscribers: [] } })
//       ])

//       if (usersResponse.success && contactsResponse.success && subscribersResponse.success) {
//         const users = (usersResponse.data as any)?.users || []
//         const contacts = (contactsResponse.data as any)?.contacts || []
//         const subscribers = (subscribersResponse.data as any)?.subscribers || []
        
//         setStats({
//           totalUsers: users.length,
//           totalContacts: contacts.length,
//           adminUsers: users.filter((user: any) => user.role === 'admin').length,
//           regularUsers: users.filter((user: any) => user.role === 'user').length,
//           totalSubscribers: subscribers.length
//         })
//       }
//     } catch (error) {
//       console.error('Failed to load stats:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <AdminLayout>
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg">Loading...</div>
//         </div>
//       </AdminLayout>
//     )
//   }

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//           <p className="mt-1 text-sm text-gray-600">
//             Welcome to the CoolAir admin panel
//           </p>
//         </div>

//         <DashboardStats stats={stats} />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">
//                       User Management
//                     </dt>
//                     <dd className="text-lg font-medium text-gray-900">
//                       Manage system users
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-5 py-3">
//               <div className="text-sm">
//                 <a href="/dashboard/users" className="font-medium text-indigo-700 hover:text-indigo-900">
//                   View all users
//                 </a>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate">
//                       Contact Messages
//                     </dt>
//                     <dd className="text-lg font-medium text-gray-900">
//                       Review submissions
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-5 py-3">
//               <div className="text-sm">
//                 <a href="/dashboard/contacts" className="font-medium text-green-700 hover:text-green-900">
//                   View all contacts
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />  
//                     </svg>
//                   </div>
//                 </div>
//                 <div className="ml-5 w-0 flex-1">
//                   <dl>
//                     <dt className="text-sm font-medium text-gray-500 truncate"> 
//                       Subscribers
//                     </dt>
//                     <dd className="text-lg font-medium text-gray-900">
//                       Manage subscribers
//                     </dd>
//                   </dl>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-50 px-5 py-3">
//               <div className="text-sm">
//                 <a href="/dashboard/subscribe" className="font-medium text-yellow-700 hover:text-yellow-900">
//                   View all subscribers
//                 </a>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

      
//     </AdminLayout>
//   )
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/auth";
import { adminApi } from "@/lib/api";
import AdminLayout from "@/components/AdminLayout";
import DashboardStats from "@/components/DashboardStats";

interface StatsData {
  totalUsers: number;
  totalContacts: number;
  adminUsers: number;
  regularUsers: number;
  totalSubscribers: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData>({
    totalUsers: 0,
    totalContacts: 0,
    adminUsers: 0,
    regularUsers: 0,
    totalSubscribers: 0,
  });

  useEffect(() => {
    if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
      router.replace("/");
      return;
    }

    loadStats();
  }, [router]);

  const loadStats = async () => {
    try {
      const [usersResponse, contactsResponse, subscribersResponse] = await Promise.all([
        adminApi.getUsers(),
        adminApi.getContacts(),
        adminApi.getSubscribers(), // Assuming getSubscribers is now properly defined
      ]);

      if (usersResponse.success && contactsResponse.success && subscribersResponse.success) {
        const users = (usersResponse.data as any)?.users || [];
        const contacts = (contactsResponse.data as any)?.contacts || [];
        const subscribers = (subscribersResponse.data as any)?.subscribers || [];

        setStats({
          totalUsers: users.length,
          totalContacts: contacts.length,
          adminUsers: users.filter((user: any) => user.role === "admin").length,
          regularUsers: users.filter((user: any) => user.role === "user").length,
          totalSubscribers: subscribers.length,
        });
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">Welcome to the CoolAir admin panel</p>
        </div>

        <DashboardStats stats={stats} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      User Management
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">Manage system users</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="/dashboard/users"
                  className="font-medium text-indigo-700 hover:text-indigo-900"
                >
                  View all users
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Contact Messages
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">Review submissions</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="/dashboard/contacts"
                  className="font-medium text-green-700 hover:text-green-900"
                >
                  View all contacts
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Subscribers</dt>
                    <dd className="text-lg font-medium text-gray-900">Manage subscribers</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a
                  href="/dashboard/subscribe"
                  className="font-medium text-yellow-700 hover:text-yellow-900"
                >
                  View all subscribers
                </a>
              </div>
              
            </div>
          </div>

        </div>

      </div>

    </AdminLayout>
  );
}
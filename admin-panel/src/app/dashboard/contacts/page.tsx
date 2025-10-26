'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/auth'
import { adminApi } from '@/lib/api'
import AdminLayout from '@/components/AdminLayout'

interface Contact {
  id: number
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}

export default function ContactsPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    if (!AuthService.isAuthenticated() || !AuthService.isAdmin()) {
      router.replace('/')
      return
    }

    loadContacts()
  }, [router])

  const loadContacts = async () => {
    try {
      const response = await adminApi.getContacts()
      if (response.success) {
        setContacts((response.data as any)?.contacts || [])
      }
    } catch (error) {
      console.error('Failed to load contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact?')) return
    
    try {
      const response = await adminApi.deleteContact(id)
      if (response.success) {
        loadContacts()
        if (selectedContact?.id === id) {
          setSelectedContact(null)
        }
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading contacts...</div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="mt-1 text-sm text-gray-600">
            Review and manage contact form submissions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contacts List */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className={`w-full text-left px-4 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                        selectedContact?.id === contact.id ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {contact.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {contact.email}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteContact(contact.id)
                            }}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {contact.message}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {contacts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-sm text-gray-500">No contact messages found</div>
              </div>
            )}
          </div>

          {/* Contact Detail */}
          <div className="lg:col-span-2">
            {selectedContact ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Contact Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Submitted on {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {selectedContact.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <a 
                          href={`mailto:${selectedContact.email}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {selectedContact.email}
                        </a>
                      </dd>
                    </div>
                    {selectedContact.phone && (
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <a 
                            href={`tel:${selectedContact.phone}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            {selectedContact.phone}
                          </a>
                        </dd>
                      </div>
                    )}
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Message</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div className="whitespace-pre-wrap break-words">
                          {selectedContact.message}
                        </div>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={() => handleDeleteContact(selectedContact.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Delete Contact
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Select a Contact
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Choose a contact from the list to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
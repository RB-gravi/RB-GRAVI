"use client"

import { useState } from "react"

export default function UserProfile() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
  })

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Profile</h3>
      <div className="space-y-2">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  )
}

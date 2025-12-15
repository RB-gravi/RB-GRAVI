"use client"

import { useState } from "react"

export default function SearchBar() {
  const [query, setQuery] = useState("")

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  )
}

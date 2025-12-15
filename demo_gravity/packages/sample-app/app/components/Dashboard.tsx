"use client"

export default function Dashboard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Analytics Dashboard</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-medium">Users</h4>
          <p className="text-2xl font-bold">1,234</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <h4 className="font-medium">Revenue</h4>
          <p className="text-2xl font-bold">$12,345</p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <h4 className="font-medium">Growth</h4>
          <p className="text-2xl font-bold">+23%</p>
        </div>
      </div>
    </div>
  )
}

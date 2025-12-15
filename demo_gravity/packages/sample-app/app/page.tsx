import UserProfile from "./components/UserProfile"
import SearchBar from "./components/SearchBar"
import Dashboard from "./components/Dashboard"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Sample SaaS App</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Search</h2>
          <SearchBar />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <UserProfile />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
          <Dashboard />
        </section>
      </div>
    </main>
  )
}

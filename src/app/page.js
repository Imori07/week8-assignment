import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome!</h1>

      <nav className="shadow-md rounded-lg p-6 w-80 text-center">
        <ul className="space-y-4">
          <li>
            <Link
              href="/posts"
              className="block bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
            >
              View All Posts
            </Link>
          </li>
          <li>
            <Link
              href="/newPost"
              className="block bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition"
            >
              Add New Post
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

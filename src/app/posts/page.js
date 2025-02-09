import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Posts App - Posts",
  description: "A convenient list of all available posts in the app.",
};

async function deletePost(formData) {
  "use server";

  const postId = formData.get("postId");
  await db.query("DELETE FROM posts WHERE id = $1", [postId]);
  revalidatePath("/posts");
}

export default async function PostsPage({ searchParams }) {
  const { sort } = searchParams;
  const posts = await db.query("SELECT * FROM posts");
  const wrangledPosts = posts.rows;

  if (sort === "desc") {
    wrangledPosts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sort === "asc") {
    wrangledPosts.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white text-center mb-6">
        A List of All Our Posts
      </h1>

      {/* Sorting & Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Link
          href="/posts?sort=asc"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition shadow"
        >
          🔼 A-Z
        </Link>
        <Link
          href="/posts?sort=desc"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition shadow"
        >
          🔽 Z-A
        </Link>
        <Link
          href="/newPost"
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition shadow"
        >
          ➕ Create Post
        </Link>
        <Link
          href="/"
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition shadow"
        >
          🏠 Home
        </Link>
      </div>

      {/* Posts List */}
      <div className="grid gap-6 max-w-2xl mx-auto">
        {wrangledPosts.map((post) => (
          <div key={post.id} className="p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-white">{post.title}</h2>
            <Link
              href={`/posts/${post.id}`}
              className="inline-block mt-3 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition shadow"
            >
              📖 Read More
            </Link>

            {/* Delete Button Form */}
            <form action={deletePost} className="mt-4">
              <input type="hidden" name="postId" value={post.id} />
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition shadow"
              >
                🗑️ Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

// pages/posts/page.js
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export const metadata = {
  title: "Posts App - Posts",
  description: "A convenient list of all available posts in the app.",
};

export default async function PostsPage({ searchParams }) {
  const { sort } = await searchParams;

  const posts = await db.query("SELECT * FROM posts");
  const wrangledPosts = posts.rows;

  // Sorting by title (A-Z and Z-A)
  if (sort === "desc") {
    wrangledPosts.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title in descending order
  } else if (sort === "asc") {
    wrangledPosts.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title in ascending order
  }

  return (
    <>
      <h1>A List of All Our Posts</h1>
      <Link href={`/posts?sort=asc`}>A-Z </Link> |
      <Link href={`/posts?sort=desc`}>Z-A</Link> |
      <Link href={`/newPost`}>Create a New Post</Link> |
      <Link href={`/`}>Home</Link>
      <div>
        {wrangledPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <Link href={`/posts/${post.id}`}>Read More</Link>{" "}
            {/* Link to individual post */}
          </div>
        ))}
      </div>
    </>
  );
}

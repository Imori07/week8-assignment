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
    <>
      <h1>A List of All Our Posts</h1>
      <Link href="/posts?sort=asc">A-Z </Link> |
      <Link href="/posts?sort=desc">Z-A</Link> |
      <Link href="/newPost">Create a New Post</Link> |<Link href="/">Home</Link>
      <div>
        {wrangledPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <Link href={`/posts/${post.id}`}>Read More</Link>

            {/* Delete Button Form */}
            <form action={deletePost}>
              <input type="hidden" name="postId" value={post.id} />
              <button type="submit">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
}

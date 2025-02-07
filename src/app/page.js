import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1>Hello!</h1>
      <nav>
        <ul>
          <li>
            <Link href="/posts">View All Posts</Link>
          </li>
          <li>
            <Link href="/newPost">Add New Post</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

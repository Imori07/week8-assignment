import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";

export default async function PostPage({ params, searchParams }) {
  const { id } = params;

  const post = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
  const postData = post.rows[0];

  const comments = await db.query("SELECT * FROM comments WHERE post_id = $1", [
    id,
  ]);
  const wrangledComments = comments.rows;

  const { commentSubmitted, author, content } = searchParams;

  if (commentSubmitted) {
    // Debug: Log the author and content of the comment being submitted
    console.log("Form Submitted:");
    console.log("Author:", author);
    console.log("Content:", content);

    await db.query(
      "INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3)",
      [id, author, content]
    );

    // Debug: Confirm the insertion process
    console.log("Comment inserted into DB");

    // Redirect back to the post page to see the newly added comment
    return redirect(`/posts/${id}`);
  }

  return (
    <>
      <h1>{postData.title}</h1>
      <p>{postData.content}</p>

      <h3>Comments</h3>
      {wrangledComments.length === 0 && (
        <p>No comments yet. Be the first to comment!</p>
      )}

      {wrangledComments.map((comment) => (
        <div key={comment.id}>
          <p>
            {comment.author}: {comment.content}
          </p>
        </div>
      ))}

      <h3>Leave a Comment</h3>
      <form action={`/posts/${id}`} method="GET">
        <input type="text" name="author" placeholder="Your name" required />
        <textarea name="content" placeholder="Your comment" required></textarea>
        <button type="submit" name="commentSubmitted" value="true">
          Submit
        </button>
      </form>
    </>
  );
}

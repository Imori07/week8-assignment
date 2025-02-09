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
    console.log("Form Submitted:", { author, content });

    await db.query(
      "INSERT INTO comments (post_id, author, content) VALUES ($1, $2, $3)",
      [id, author, content]
    );

    console.log("Comment inserted into DB");

    return redirect(`/posts/${id}`);
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* Post Details */}
      <div className="p-6 shadow-lg rounded-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-white mb-4">{postData.title}</h1>
        <p className="text-white">{postData.content}</p>
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-2xl mt-6">
        <h3 className="text-xl font-semibold text-white mb-3">Comments</h3>

        {wrangledComments.length === 0 ? (
          <p className="text-white">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {wrangledComments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-4 shadow rounded-lg border-l-4 border-gray-500"
              >
                <p className="text-black font-semibold">{comment.author}:</p>
                <p className="text-black">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="w-full max-w-2xl mt-6">
        <h3 className="text-xl font-semibold text-white mb-3">
          Leave a Comment
        </h3>
        <form
          action={`/posts/${id}`}
          method="GET"
          className=" p-6 shadow-lg rounded-lg space-y-4"
        >
          <input
            type="text"
            name="author"
            placeholder="Your name"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <textarea
            name="content"
            placeholder="Your comment"
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            name="commentSubmitted"
            value="true"
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewPostPage() {
  async function handleSubmit(formValues) {
    "use server";

    const title = formValues.get("title");
    const content = formValues.get("content");

    await db.query("INSERT INTO posts (title, content) VALUES ($1, $2)", [
      title,
      content,
    ]);

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">
        Add a New Post
      </h1>

      <div className="flex justify-between mb-4">
        <Link
          href="/"
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition shadow"
        >
          🏠 Home
        </Link>
        <Link
          href="/posts"
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition shadow"
        >
          ➕ View All Posts
        </Link>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-white">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block font-medium text-white">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          Submit Your Post
        </button>
      </form>
    </div>
  );
}

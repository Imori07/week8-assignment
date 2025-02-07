import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function NewPostPage() {
  async function handleSubmit(formValues) {
    "use server";

    const title = formValues.get("title");
    const content = formValues.get("content");

    db.query(`INSERT INTO posts (title, content) VALUES ($1, $2)`, [
      title,
      content,
    ]);

    revalidatePath("/posts");

    redirect("/posts");
  }

  return (
    <>
      <h1>Add a new post to the website</h1>

      <Link href={`/`}> Home</Link>
      <Link href="/posts"> View-All-Posts</Link>

      <form action={handleSubmit}>
        <label htmlFor="title">Title: </label>

        <input
          type="text"
          name="title"
          id="title"
          className="text-emerald-600"
        />

        <label htmlFor="content">Content: </label>
        <input
          type="text"
          name="content"
          id="content"
          className="text-emerald-600"
        />

        <button
          type="submit"
          className="border-amber-600 border-4 m-4 hover:bg-sky-700"
        >
          Submit your post
        </button>
      </form>
    </>
  );
}

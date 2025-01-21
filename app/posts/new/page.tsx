import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function NewPost() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  async function createPost(formData: FormData) {
    "use server";

    const session = await auth();
    if (!session?.user) {
      redirect("/");
    }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    if (!title?.trim()) {
      throw new Error("Title is required");
    }

    await prisma.post.create({
      data: {
        title: title.trim(),
        content: content?.trim(),
        published: true,
        author: {
          connect: {
            email: session.user.email!,
          },
        },
      },
    });

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Post</h1>
          <Link
            href="/posts"
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Cancel
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <Form action={createPost} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="Enter your post title"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your post content here..."
                rows={8}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              />
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Publish Post
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

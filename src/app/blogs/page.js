"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Api from "@/api";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts
    const fetchPosts = async () => {
      // Use the reusable get method
      setLoading(false);
      try {
        const data = await Api.get("/posts");
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>
      <Image
        width={1000}
        loading="lazy"
        height={1000}
        src="https://static.vecteezy.com/system/resources/thumbnails/021/746/785/small/holding-a-tree-in-a-ball-ecology-and-environment-concept-with-generative-ai-photo.jpg"
        alt="image"
        className="w-full h-40 object-cover"
      />
      <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0 gap-3">
        {posts.map((post) => (
          <Link
            href={`/blogs/${post.id}`}
            key={post.id}
            className="bg-gray-100 text-gray-700 rounded-xl p-4 border
                border-red-500"
          >
            <h2 className="text-base font-semibold mb-2">
              <p className="first-letter:uppercase">{post.title}</p>
            </h2>
            <p className="text-sm first-letter:uppercase">{post.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

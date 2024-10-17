// "use client";
// import Link from "next/link";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     //fetch posts
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(
//           "https://jsonplaceholder.typicode.com/posts"
//         );
//         if (res.status === 200) {
//           setPosts(res.data);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     fetchPosts();
//   }, []);
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0 gap-3">
//         {posts.map((post) => (
//           <Link
//             href={`/blogs/${post.id}`}
//             key={post.id}
//             className="bg-gray-100 text-gray-700 rounded-xl p-4 border
//             border-red-500"
//           >
//             <h2 className="text-base font-semibold mb-2">
//               <p className="first-letter:uppercase">{post.title}</p>
//             </h2>
//             <p className="text-sm first-letter:uppercase">{post.body}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { List, AutoSizer } from "react-virtualized";
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

  // Render each row in the virtualized list
  const renderRow = ({ index, key, style }) => {
    const post = posts[index];
    return (
      <div key={key} style={style} className="p-2">
        <Link
          href={`/blogs/${post.id}`}
          className="bg-gray-100 text-gray-700 rounded-xl p-4 border border-red-500 block"
        >
          <h2 className="text-base font-semibold mb-2">
            <p className="first-letter:uppercase">{post.title}</p>
          </h2>
          <p className="text-sm first-letter:uppercase">{post.body}</p>
        </Link>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Blog Posts</h1>

      {/* AutoSizer automatically adjusts the width and height of the list */}

      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            width={width}
            height={600} // Define the height of the visible container
            rowHeight={150} // Height of each row (each post)
            rowCount={posts.length} // Total number of posts
            rowRenderer={renderRow} // Function to render each row
          />
        )}
      </AutoSizer>
    </div>
  );
}

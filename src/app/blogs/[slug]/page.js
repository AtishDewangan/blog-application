"use client";
import Api from "@/api";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { add } from "@/lib/store/features/comment/comment-slice";
import dynamic from "next/dynamic";
// Dynamically import the Input and Button components
const Input = dynamic(() => import("@/components/form/input"), {
  loading: () => <p className="text-gray-700">Loading...</p>,
});

const Button = dynamic(() => import("@/components/form/button"), {
  loading: () => <p className="text-gray-700">Loading...</p>,
});
export default function BlogDetail({ params: { slug } }) {
  const dispatch = useAppDispatch();
  const comments = useAppSelector((state) => state.comment.items);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Create a ref for the modal
  const modalRef = useRef();

  // Toggle modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Close the modal after submission
  const filteredComments =
    comments?.length > 0 && comments.filter((item) => item.id === blog?.id);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    dispatch(add({ id: blog?.id, comment: inputValue }));
    setInputValue("");
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        // Use the reusable get method
        setLoading(false);
        try {
          const data = await Api.get(`posts/${slug}`);
          setBlog(data);
        } catch (error) {
          console.error("Error fetching post details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPost();
  });

  // Close modal on outside click
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false); // Close the modal
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-gray-700 flex justify-center items-center w-full h-screen">
        Post not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 first-letter:uppercase">
        {blog.title}
      </h1>
      <p className="mb-4 first-letter:uppercase">{blog.body}</p>
      <div className="flex space-x-4">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <button
          className="pl-3 text-purple-500 hover:text-purple-600 font-semibold"
          onClick={toggleModal}
        >
          Add Comment
        </button>
      </div>

      {filteredComments?.length > 0 &&
        filteredComments.map((item, index) => (
          <p key={index}>{item.comment}</p>
        ))}
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl text-black mb-4">Leave a Comment</h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="Your comment"
                placeholder="Enter your comment"
                value={inputValue}
                onChange={handleInputChange}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  className={"bg-gray-300 hover:bg-purple-500"}
                  label="Cancel"
                  onClick={toggleModal}
                />
                <Button
                  className={"bg-purple-500 hover:bg-gray-300"}
                  label="Submit"
                  onClick={handleSubmit}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

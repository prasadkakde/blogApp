import React, { useState, useEffect } from "react";
import laga from "../assets/laga.png";
import { useNavigate, useParams } from "react-router-dom";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";

import Color from "@tiptap/extension-color";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      TextStyle,
      Color,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // Fetch existing blog if editing
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/api/blog/getBlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTitle(data.blog.title);
          setCoverImage(data.blog.image);
          setContent(data.blog.content);
          setTags(data.blog.tags || "");

          if (editor) editor.commands.setContent(data.blog.content);
        } else {
          alert("Failed to load blog details");
        }
      })
      .catch((err) => console.error(err));
  }, [id, editor]);

  // Upload from Desktop
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:3000/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setCoverImage(data.imageUrl);
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const blogData = {
      title,
      desc: content,
      content,
      image: coverImage,
      tags,
    };

    const url = id
      ? `http://localhost:3000/api/blog/editBlog/${id}`
      : "http://localhost:3000/api/blog/uploadBlog";

    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await res.json();

      if (data.success) {
        alert(id ? "Blog updated!" : "Blog published!");
        navigate("/myblog");
      } else {
        alert("Error: " + data.msg);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };
  if (!editor) return null;


  return (
    <div className="min-h-screen flex flex-col bg-gray-500 text-black">
      <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-200 text-white relative">
        <div className="flex items-center space-x-2">
          <img src={laga} alt="" className="h-12 w-12" />
          <span className="font-semibold text-lg text-black">
            Engineering Blog
          </span>
        </div>

        <div className="flex gap-8">
          <button
            onClick={() => navigate("/myblog")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            My Blog
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Log Out
          </button>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-amber-100 p-8 rounded-lg shadow-lg w-[600px] space-y-4"
        >
          <h1 className="text-xl font-bold mb-2">
            {id ? "Edit Blog" : "Create New Blog"}
          </h1>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-black"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block mb-1 font-medium">Cover Image URL:</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-black"
              placeholder="Enter image link"
            />
          </div>

          {/* Upload from Desktop */}
          <div>
            <label className="block mb-1 font-medium">
              Upload from Desktop:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full px-3 py-2 rounded-md text-black"
            />
          </div>

          {/* TipTap Editor */}
          <div>
            <label className="block mb-1 font-medium">Content:</label>

            {/* Toolbar */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                B
              </button>

              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                I
              </button>

              <button
                type="button"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className="px-2 py-1 bg-gray-300 rounded"
              >
                H2
              </button>

              <input
                type="color"
                onChange={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
              />
            </div>

            <EditorContent editor={editor} className="bg-white p-2 border rounded min-h-[150px]" />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 font-medium">Tags:</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 rounded-md text-black"
              placeholder="#blog #EngineerBlog"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            {id ? "Update Blog" : "Publish Blog"}
          </button>
        </form>
      </main>

      <footer className="bg-gray-700 text-center py-4 text-white">
        Footer
      </footer>
    </div>
  );
};

export default CreateBlog;

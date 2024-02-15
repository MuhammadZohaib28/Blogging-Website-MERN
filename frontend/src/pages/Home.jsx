import React, { useContext, useEffect, useState } from "react";
import { getPosts } from "../controllers/postsController";
import { PostContext } from "../context/PostContext";

const Home = () => {
  const { posts, setPosts } = useContext(PostContext);
  const [expandedPosts, setExpandedPosts] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const data = await getPosts();
      setPosts(data.posts);
    }, 1000);
  }, [posts, setPosts]);

  const toggleExpand = (index) => {
    setExpandedPosts((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className="bg-[#e7e7e7] flex flex-col h-full px-20 py-2">
      <h1 className="text-4xl font-gelasio font-medium">Latest Posts</h1>

      {posts &&
        posts.map((post, index) => (
          <div
            className="bg-grey h-full my-10 px-5 py-5 rounded-lg"
            key={index}
          >
            <h1 className="text-3xl font-gelasio">{post.title}</h1>
            <p className="font-inter font-light text-xl">
              {expandedPosts[index] || post.body.length <= 800
                ? post.body
                : post.body.slice(0, 800) + "... "}
              {post.body.length > 800 && (
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedPosts[index] ? "Read Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Home;

import React, { useContext, useEffect } from "react";
import { getPosts } from "../controllers/postsController";
import { PostContext } from "../context/PostContext";

const Home = () => {
  const { posts, setPosts } = useContext(PostContext);
  useEffect(() => {
    setTimeout(async () => {
      const data = await getPosts();
      setPosts(data.posts);
    }, 1000);
  }, [posts, setPosts]);
  return (
    <div className="bg-[#e7e7e7] flex flex-col h-full px-20 py-2">
      <h1 className="text-4xl font-gelasio font-medium">Latest Posts</h1>

      {posts &&
        posts.map((post) => (
          <div className="bg-grey h-full my-10 px-5 py-5 rounded-lg">
            <h1 className="text-3xl font-gelasio">{post.title}</h1>
            <p className="font-inter font-light text-xl">{post.body}</p>
          </div>
        ))}
    </div>
  );
};

export default Home;

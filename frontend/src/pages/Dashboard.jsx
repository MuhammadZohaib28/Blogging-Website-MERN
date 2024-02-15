import React, { useContext, useEffect, useState } from "react";
import { geUserPosts } from "../controllers/postsController";
import { UserContext } from "../context/UserContext";
import { ColorRing } from "react-loader-spinner";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // USE USER CONTEXT
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState([]);

  const handleDelete = async (id) => {
    console.log(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userPosts, email } = await geUserPosts();
        setUser({ email, posts: userPosts });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setUser]);

  const toggleExpand = (index) => {
    setExpandedPosts((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <div className="bg-[#e7e7e7] flex flex-col h-full px-20 py-2">
      <span className="font-medium text-xl">{user.email}</span>
      <h1 className="text-4xl font-gelasio font-medium">User Dashboard</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ColorRing
            visible={true}
            height="250"
            width="250"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        user.posts &&
        user.posts.map((userPost, index) => (
          <div className="flex flex-col justify-between my-14">
            <div
              key={userPost._id}
              className="bg-grey h-full my-10 px-5 py-5 rounded-lg"
            >
              <h1 className="text-3xl font-gelasio">{userPost.title}</h1>

              <p className="font-inter font-light text-xl">
                {expandedPosts[index] || userPost.body.length <= 800
                  ? userPost.body
                  : userPost.body.slice(0, 800) + "... "}
                {userPost.body.length > 800 && (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedPosts[index] ? (
                      <span className="font-semibold text-black bg-[#e0e0e0] p-2 rounded-full">Read Less</span>
                    ) : (
                      <span className="font-semibold text-[#050505] bg-[#e0e0e0] p-2 rounded-full">Read More</span>
                    )}
                  </button>
                )}
              </p>
            </div>

            <div className="flex justify-start w-1/6 gap-10">
              <button
                onClick={() => handleDelete(userPost._id)}
                className="bg-red text-white text-xl px-5 py-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer"
              >
                <MdDelete className="text-3xl" /> Delete
              </button>
              <Link to={"/update"}>
                <button className="bg-[#68e568] text-white text-xl px-5 py-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer">
                  <MdEdit className="text-3xl" /> Update
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;

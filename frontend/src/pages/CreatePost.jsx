// import React, { useState } from "react";
// import InputBox from "../components/InputBox";
// import { MdOutlineTitle } from "react-icons/md";
// import { MdSubtitles } from "react-icons/md";
// import { createPost } from "../controllers/postsController";
// import toast from "react-hot-toast";

// const CreatePost = () => {
//   // Error State

//   // Form Data State
//   const [formData, setFormData] = useState({
//     title: "",
//     body: "",
//   });

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await createPost(formData.title, formData.body);
//       console.log(data);
//       toast.success("Data");
//     } catch (error) {
//       toast.error("as");
//     }
//   };
//   return (
//     <div className="h-full w-full flex flex-col bg-[#fcfcfc] px-20 py-10">
//       <h1 className="font-gelasio font-medium text-4xl">Write A Blog</h1>

//       <div className="flex justify-center items-center py-20">
//         <form
//           onSubmit={handleCreate}
//           className=" w-full max-w-[400px] p-4 rounded-md  border-2 border-dark-grey"
//         >
//           <InputBox
//             name={"title"}
//             type="text"
//             placeholder="Blog Title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//             icon={<MdOutlineTitle className="text-2xl" />}
//           />

//           <div className="relative">
//             <textarea
//               placeholder="Write a blog"
//               value={formData.body}
//               onChange={(e) =>
//                 setFormData({ ...formData, body: e.target.value })
//               }
//               className="w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent  placeholder:text-dark-grey"
//             ></textarea>
//             <MdSubtitles className="absolute top-5 text-2xl left-4" />
//           </div>
//           <button className="bg-[#67d44ca8] p-3 w-full rounded-md text-2xl font-semibold font-gelasio cursor-pointer hover:bg-[#67d44c] ">
//             Create
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useState } from "react";

import { MdOutlineTitle } from "react-icons/md";
import { MdSubtitles } from "react-icons/md";
import { createPost } from "../controllers/postsController";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const data = await createPost(formData.title, formData.body);
      console.log(data);
      setFormData({ title: "", body: "" }); // Clear form after successful creation
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(error.message || "Failed to create post");
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#fcfcfc] px-20 py-10">
      <h1 className="font-gelasio font-medium text-4xl">Write A Blog</h1>

      <div className="flex justify-center items-center py-20">
        <form
          onSubmit={handleCreate}
          className=" w-full max-w-[400px] p-4 rounded-md  border-2 border-dark-grey flex flex-col gap-5"
        >
          <div className="relative">
            <input
              name={"title"}
              type="text"
              placeholder="Blog Title"
              value={formData.title}
              className="w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent  placeholder:text-dark-grey"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <MdOutlineTitle className="text-2xl absolute top-5 left-4" />
          </div>

          <div className="relative">
            <textarea
              placeholder="Write a blog"
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              className="w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent  placeholder:text-dark-grey"
            ></textarea>
            <MdSubtitles className="absolute top-5 text-2xl left-4" />
          </div>
          <button className="bg-[#67d44ca8] p-3 w-full rounded-md text-2xl font-semibold font-gelasio cursor-pointer hover:bg-[#67d44c] ">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

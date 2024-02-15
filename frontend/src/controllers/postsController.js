/********************************************************* GET ALL POSTS *********************************************************/
const getPosts = async () => {
  const res = await fetch("/api/posts");
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

/********************************************************* GET USER POSTS *********************************************************/
const geUserPosts = async () => {
  const res = await fetch("/api/posts/user", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

/********************************************************* CREATE POSTS *********************************************************/
const createPost = async (title, body) => {
  if (!title || !body) {
    throw Error("Please Enter All Fields");
  }

  const res = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ title, body }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { getPosts, geUserPosts, createPost };

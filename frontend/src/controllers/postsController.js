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

export { getPosts, geUserPosts };

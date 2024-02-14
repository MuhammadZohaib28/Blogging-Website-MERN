/********************************************************* GET ALL POSTS *********************************************************/
const getPosts = async () => {
  const res = await fetch("/api/posts");
  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { getPosts };

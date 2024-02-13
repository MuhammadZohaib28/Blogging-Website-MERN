import axios from "axios";
/********************************************************* Login USERS *********************************************************/

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error("Please fill all thee fields");
  }

  //   const res = await axios.post("/api/users/login", { email, password });

  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
};

/********************************************************* REGISTER USERS *********************************************************/

const registerUser = async (email, password, fullname) => {
  if (!email || !password || !fullname) {
    throw Error("Please fill all the fields");
  }

  //   const res = await axios.post("/api/users/login", { email, password });

  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fullname }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);

  return data;
};

export { loginUser, registerUser };

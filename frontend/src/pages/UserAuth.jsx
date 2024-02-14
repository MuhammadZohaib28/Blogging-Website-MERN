import React, { useContext, useState } from "react";
import InputBox from "../components/InputBox";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate } from "react-router-dom";
import PageAnimation from "../components/PageAnimation";
import { Toaster, toast } from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser, registerUser } from "../controllers/usersControllers";
import { UserContext } from "../context/UserContext";

const UserAuth = ({ type }) => {
  // Form Data state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // Use User Context
  const { user } = useContext(UserContext);

  console.log(user);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    // Form Data
    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    // Form Validations

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname must be at least 3 characters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter Email Please");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Enter Valid Email");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be at least 6 characters long and contain at least one number, one lowercase and one uppercase letter"
      );
    }

    if (type === "Sign-In") {
      try {
        await loginUser(formData.email, formData.password);
        toast.success("User logged in successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        await registerUser(
          formData.email,
          formData.password,
          formData.fullname
        );
        toast.success("User registered successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <PageAnimation keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form
          id="formElement"
          className="w-[80%] max-w-[400px] p-4 rounded-md  border-2 border-dark-grey"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24 ">
            {type == "Sign-In" ? "Welcome Back" : "Join Us Today"}
          </h1>

          {type !== "Sign-In" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon={<IoMdPerson className="text-2xl" />}
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
            />
          ) : null}

          <InputBox
            name="email"
            type="text"
            placeholder="Email"
            icon={<MdEmail className="text-2xl" />}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon={<RiLockPasswordFill className="text-2xl" />}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
            {type}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center gap-4 justify-center center w-[90%]">
            <FcGoogle className="w-5 text-3xl" />
            Continue with Google
          </button>

          {type == "Sign-In" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account ?
              <Link
                to="/register"
                className="bg-grey rounded-full p-2 text-black text-xl ml-1"
              >
                {" "}
                Join Us
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link
                to="/login"
                className="bg-grey rounded-full p-2 text-black text-xl ml-1"
              >
                {" "}
                Sign In
              </Link>
            </p>
          )}
        </form>
      </section>
    </PageAnimation>
  );
};

export default UserAuth;

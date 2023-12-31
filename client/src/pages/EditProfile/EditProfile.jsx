import { useState, useEffect } from "react";
import classes from "./EditProfile.module.css";
import EditProfileButton from "./ProfileComponents/EditProfileButton";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";

function EditProfile() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  const hostURL = import.meta.env.VITE_REACT_API_URL;

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //reset
      setErrors({});

      const response = await fetch(`${hostURL}/user/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: form.firstname,
          lastname: form.lastname,
          username: form.username,
          email: form.email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile Updated Successfully");

        setForm({
          firstname: "",
          lastname: "",
          username: "",
          email: "",
        });
      } else {
        // Check for specific error messages from the server and display corresponding errors
        if (data.message === "User already exists") {
          setErrors((previous) => ({
            ...previous,
            username: "Username already taken.",
          }));
        }
        if (data.message === "Email already exists") {
          setErrors((previous) => ({
            ...previous,
            email: "Email already taken.",
          }));
        }
      }
    } catch (error) {
      console.log("Failed to update", error);
    }
  };

  useEffect(() => {
    // Fetch user data from the API using the token and userId
    async function fetchUserData() {
      try {
        const response = await fetch(`${hostURL}/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await response.json();
        if (response.ok) {
          // Set the form state with the user data
          setForm({
            firstname: userData.firstname,
            lastname: userData.lastname,
            username: userData.username,
            email: userData.email,
          });
        } else {
          // Handle error case if necessary
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    }

    fetchUserData();
  }, [userId, token]);
  return (
    <MobileSubPage header="Edit Profile" fontSize="text-2xl lg:text-3xl">
      <div className="h-full font-poppins p-2 lg:pt-12 text-black dark:text-white">
        {/* <div className=" h-16 lg:h-20 w-full bg-tahiti-100 flex lg:justify-evenly font-poppins">
        <Link to="/profile">
          <button>
            <IoIosArrowBack className="w-8 h-8 lg:w-8 lg:h-8 ml-2 lg:ml-8 mt-4 lg:mt-6" />
          </button>
        </Link>
        <h1 className="my-auto text-3xl font-semibold tracking-wide mx-auto">
          Edit Profile
        </h1>
        <button className="font-bold mr-2 lg:mr-12">Done</button>
      </div> */}

        <div className="flex h-full w-full lg:w-1/2 flex-col mx-auto">
          <form
            onSubmit={handleSubmit}
            className="grid w-full mt-1"
            // className=""
          >
            <div className="mb-4 lg:flex">
              <label className="lg:w-3/12 text-center lg:py-2">
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={form.firstname}
                placeholder="First name"
                autoComplete="off"
                onChange={handleChange}
                // className="border-2 p-2 mt-2 border-tahiti-100 rounded-xl w-full"
                className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
              />
            </div>
            <div className="mb-4 lg:flex">
              <label className="lg:w-3/12 text-center lg:py-2">
                Last Name:{" "}
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={form.lastname}
                placeholder="Last name"
                autoComplete="off"
                onChange={handleChange}
                className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
              />
            </div>
            <div className="mb-4 lg:flex">
              <label className="lg:w-3/12 text-center lg:py-2">
                Username:{" "}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                placeholder="Username"
                autoComplete="off"
                onChange={handleChange}
                className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
              />
            </div>
            {errors.username && (
              <label className="text-red-500 text-xs -mt-3 mb-3 lg:ml-60">
                {errors.username}
              </label>
            )}
            <div className="mb-4 lg:flex">
              <label className=" lg:w-3/12 text-center lg:py-2">Email: </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                placeholder="Email"
                autoComplete="off"
                onChange={handleChange}
                className="dark:bg-tahiti-200 dark:text-white block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-2 lg:mt-0"
              />
            </div>
            {errors.email && (
              <label className="text-red-500 text-xs -mt-3 mb-3 lg:ml-60">
                {errors.email}
              </label>
            )}
            {/* <EditProfileButton buttonName={"Submit Changes"} type={"submit"} /> */}
            <div>
              <button
                type="submit"
                className="float-right lg:w-99 lg:mt-8 w-full rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Update
              </button>
            </div>
            {/* </div> */}
          </form>
        </div>
      </div>
    </MobileSubPage>
  );
}

export default EditProfile;

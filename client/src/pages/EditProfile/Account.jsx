import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileSubPage from "../../components/MobileSubPage/MobileSubPage";

function Account() {
  const [deleteUser, setDeleteUser] = useState("");

  const hostURL = import.meta.env.VITE_REACT_API_URL;
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const handleChange = (event) => {
    setDeleteUser(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (deleteUser === "DELETE") {
        const response = await fetch(`${hostURL}/user/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentUserId: `${userId}`,
          }),
        });

        const data = response.json();

        alert("User deleted successfully");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Please type DELETE correctly");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MobileSubPage header="Account" fontSize="text-2xl lg:text-3xl">
      <div className="h-full font-poppins">
        <div className="flex w-full lg:w-1/2 mx-auto h-full flex-col px-2">
          <div className="mb-4">
            <form
              onSubmit={handleSubmit}
              className="grid w-full mt-4 lg:mt-10 mx-auto"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  Are you sure you want to delete your account?
                </h2>
                <ul className="ml-8 mt-4">
                  <li className="list-disc mt-2">
                    Please type "DELETE" to delete your account
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="delete"
                  name="delete"
                  value={deleteUser}
                  autoComplete="off"
                  onChange={handleChange}
                  className="dark:bg-tahiti-200 dark:text-white block w-full  rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tahiti-150 bg-tahiti-50 sm:text-sm sm:leading-6 mt-4"
                />
              </div>
              <button
                type="submit"
                className="lg:mt-6 w-full  rounded-md bg-tahiti-150 px-3 p-3 text-md font-semibold leading-6 text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Delete Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </MobileSubPage>
  );
}

export default Account;

<<<<<<< HEAD
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState({
//     name: "",
//     email: "",
//     image: null,
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     const formData = new FormData(); // Create form data
//     formData.append("name", users.name);
//     formData.append("email", users.email);
//     formData.append("image", users.image);

//     try {
//       const result = await axios.post(
//         "http://localhost:4000/user/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log(result.data);
//     } catch (error) {
//       console.error("Error during registration:", error);
//       if (error.response) {
//         console.error("Server responded with:", error.response.data);
//       } else if (error.request) {
//         console.error("No response received:", error.request);
//       } else {
//         console.error("Request setup error:", error.message);
//       }
//     }
//   };

//   const handleOnChange = (e) => {
//     setUsers({
//       ...users,
//       [e.target.name]:
//         e.target.name === "image" ? e.target.files[0] : e.target.value,
//     });
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <p className="text-center text-2xl px-2 py-2 text-blue-700">
//         Register Your Accounts
//       </p>
//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         className="space-y-6"
//       >
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             onChange={handleOnChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             onChange={handleOnChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleOnChange}
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
//             required
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Register
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Register;

////////////////////////////////////////////////////////////////////////////////////

=======
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [users, setUsers] = useState({
=======
  const [formData, setFormData] = useState({
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    image: null,
  });

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(); // Create form data
    formData.append("name", users.name);
    formData.append("email", users.email);
    formData.append("password", users.password);
    formData.append("address", users.address);
    formData.append("phone", users.phone);
    formData.append("image", users.image);

    try {
      const result = await axios.post(
        "http://localhost:3000/api/users/process-register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result.data);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }
    }
  };

  const handleOnChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
=======
  const handleChange = (e) => {
    const { name, value, files } = e.currentTarget;
    console.log(name);
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("address", formData.address);
    data.append("phone", formData.phone);
    data.append("image", formData.image);
    console.log(data);

    // Log the FormData keys and values
    for (const pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/users/process-register",
        data,
        {
          headers: {
            "Content-Type": "multipart/formData",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      alert(response.data.payload.token);
      // Handle the response, e.g., navigate to another page or show a success message
      navigate("/verify-user"); // Redirect to the users page after successful registration
    } catch (error) {
      console.error(
        "There was a problem with the registration request:",
        error.response.data.message
      );
      alert(error.response.data.message);
    }
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <p className="text-center text-2xl px-2 py-2 text-blue-700">
        Register Your Accounts
      </p>
<<<<<<< HEAD
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
=======
      <form onSubmit={handleSubmit} className="space-y-6">
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
<<<<<<< HEAD
            onChange={handleOnChange}
=======
            value={formData.name}
            onChange={handleChange}
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
<<<<<<< HEAD
            onChange={handleOnChange}
=======
            value={formData.email}
            onChange={handleChange}
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
<<<<<<< HEAD
            onChange={handleOnChange}
=======
            value={formData.password}
            onChange={handleChange}
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
<<<<<<< HEAD
            onChange={handleOnChange}
=======
            value={formData.address}
            onChange={handleChange}
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
<<<<<<< HEAD
            onChange={handleOnChange}
=======
            value={formData.phone}
            onChange={handleChange}
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
<<<<<<< HEAD
            onChange={handleOnChange}
=======
            onChange={handleChange}
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-4">
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-slate-300 hover:bg-slate-500-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to users
        </button>
      </div>
    </div>
  );
};

export default Register;

<<<<<<< HEAD
////////////////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";

// const Register = () => {
//   const { register, handleSubmit, errors } = useForm();

//   const onSubmit = async (data) => {
//     console.log(data);
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     formData.append("password", data.password);
//     formData.append("address", data.address);
//     formData.append("phone", data.phone);
//     formData.append("image", data.image[0]); // Assuming only one image file

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/users/process-register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert(response.data.message);
//     } catch (error) {
//       console.error(
//         "Error registering user:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   return (
//     <div className="register-form">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             {...register("message", {
//               required: "Required",
//             })}
//           />
//           {/* {errors.name && <p>{errors.name.message}</p>} */}
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             name="email"
//             type="email"
//             {...register("email", {
//               required: "Email is required",
//               pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
//             })}
//           />
//           {/* {errors.email && <p>{errors.email.message}</p>} */}
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             name="password"
//             type="password"
//             {...register("password", {
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password should be at least 6 characters long",
//               },
//               pattern: {
//                 value:
//                   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
//                 message:
//                   "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
//               },
//             })}
//           />
//           {/* {errors.password && <p>{errors.password.message}</p>} */}
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             name="address"
//             {...register("address", {
//               required: "Address is required",
//               minLength: 3,
//             })}
//           />
//           {/* {errors.address && <p>{errors.address.message}</p>} */}
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input
//             name="phone"
//             {...register("phone", {
//               required: "Phone is required",
//               minLength: 5,
//             })}
//           />
//           {/* {errors.phone && <p>{errors.phone.message}</p>} */}
//         </div>
//         <div>
//           <label>Profile Image:</label>
//           <input name="image" type="file" {...register("image")} />
//         </div>
//         <button type="submit">Register</button>
=======
// import React from "react";
// import { useNavigate } from "react-router-dom";
// const Register = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <form
//         action="http://localhost:3000/api/users/process-register"
//         method="POST"
//         encType="multipart/form-data"
//         className="space-y-6"
//       >
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Address
//           </label>
//           <input
//             type="text"
//             name="address"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Phone
//           </label>
//           <input
//             type="tel"
//             name="phone"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Image
//           </label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
//             required
//           />
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             // onClick={navigate("/verify-user")}
//           >
//             Register
//           </button>
//         </div>
>>>>>>> 6707704f045e36105d17115f4376c677a38031a2
//       </form>
//     </div>
//   );
// };

// export default Register;

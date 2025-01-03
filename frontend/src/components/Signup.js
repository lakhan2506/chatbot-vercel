import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signup = ()=>{
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    confirmPassword:"",
  });
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    setError("");
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {username,password,confirmPassword}=formData;
    if(password !== confirmPassword){
      setError("Password do not match.");
      return;
    }

    try{
      const response = await axios.post(
        `https://chatbot-backend-nu-sable.vercel.app/api/v1/auth/signup`,
        {
            username,
            password,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials for cookies if needed
        }
    );
      setSuccess(response.data.message || "Signup successful!");
      setFormData({username:'',password:'',confirmPassword:''})

      if (response.data.message === "User created successfully" || "Signup successful!") {
        localStorage.setItem("userId",response.data.userId)
        navigate("/login");
    } else {
        setError("Something went wrong.");
    }
    }
     catch(err){
      setError(err.response?.data?.message || "Signup failed.");
     }
  };

  return(
    <div  className="flex justify-center items-center h-4/5 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input 
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
              />
          </div>
          <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
          </label>
          <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
          />
      </div>
      <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
          </label>
          <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
          />
      </div>
      <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
          Signup
      </button>
        </form>
      </div>    
    </div>
  );
}
export default Signup;
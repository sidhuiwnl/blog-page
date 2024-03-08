import { SigninInput } from "@sidharth999/medium-common";
import axios from 'axios'
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";



function SigninPage() {
  const navigate = useNavigate()
  const [postInputs,setPostInputs] = useState<SigninInput>({
    
    email :"",
    password :""
  })

  async function handleRequest(){
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/Signin`,postInputs)
      const jwt = response.data
      localStorage.setItem('token',jwt)
      navigate('/blogs')
    } catch (error) {
      alert('the request failed')
      
    }
  }



  return (
    <div className="h-screen w-full flex justify-center items-center bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Login to the Account</h1>
          <p className="text-gray-600">Join our community today!</p>
        </div>

        
          

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              onChange={(e) =>{
                setPostInputs({
                  ...postInputs,
                  email : e.target.value
                })
              }}
              id="email"
              placeholder="Enter your email address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              onChange={(e) =>{
                setPostInputs({
                  ...postInputs,
                  password : e.target.value
                })
              }}
              id="password"
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-black hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRequest}
             

            >
              Sign In
            </button>

            <p className="text-gray-600">
              New User? <Link to="/Signup" className="text-indigo-500 hover:text-indigo-700">Sign up</Link>
            </p>
          </div>
        
      </div>
    </div>
  );
}

export default SigninPage;
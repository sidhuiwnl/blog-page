import { useState } from "react"
import AppBar from "../Components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"


function Publish() {
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
  return (
    <div>
        <AppBar/>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
            <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-900 rounded p-2 mt-3"
            onChange={(e) =>{
                setTitle(e.target.value)
            }}
            ></input>
            <label htmlFor="message" className="block mb-2 mt-3 text-lg font-medium text-gray-900 ">Description</label>
            <textarea id="message" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
            onChange={(e) =>{
                setDescription(e.target.value)
            }}
            ></textarea>

            <button className="mt-3 border rounded p-2 border-gray-950 bg-gray-900 text-white"
            onClick={async() =>{
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content:description
                },{
                    headers :{
                        Authorization : localStorage.getItem('token')
                    }
                });
                navigate(`/blog/${response.data.id}`)
            }}
            >Post</button>

            </div>
        </div>
    </div>
  )
}

export default Publish

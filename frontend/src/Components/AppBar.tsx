import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


function AppBar() {
  return (
    <>
     <div className=' flex justify-between w-full p-4 text-white bg-slate-900 '>
      <Link to={'/blogs'}>
      <div className='text-xl font-semibold'>Medium</div>
      </Link>
      <div className="flex justify-center">
        <Link to={'/publish'}>
          <button className="text-xl font-semibold bg-slate-200 text-black rounded p-1 mr-7">Add</button>
        </Link>
        
        <Avatar size="big" authorName="sihharth"/>
      </div>
      
    </div>
    
    </>
   
  )
}

export default AppBar

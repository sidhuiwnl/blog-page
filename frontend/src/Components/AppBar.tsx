import { Avatar } from "./BlogCard"


function AppBar() {
  return (
    <>
     <div className=' flex justify-between w-full p-4 text-white bg-slate-900 '>
      <div className='text-xl font-semibold'>Medium</div>
      <div className="flex justify-center">
        <button className="text-xl font-semibold bg-slate-200 text-black rounded p-1 mr-7">Add</button>
        <Avatar size="big" authorName="sihharth"/>
      </div>
      
    </div>
    
    </>
   
  )
}

export default AppBar

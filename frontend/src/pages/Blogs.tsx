
import AppBar from '../Components/AppBar'
import BlogCard from '../Components/BlogCard'
import BlogSkeleton from '../Components/BlogSkeleton'
import { useBlogs } from '../hooks'

function Blogs() {
  const {loading,blogs} = useBlogs()

  if(loading){
    return <div>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
    </div>
  }
  return (
    <div>
      <div className='mb-2'>
        <AppBar/>
        
      </div>
      <div>
      <div className='flex justify-center'>
       <div>
          {blogs.map((blog) =>
            <BlogCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            PublishedDate={"2nd Feb 2024"}


          />
          )

        }
          
       </div>

    </div>
      </div>
    </div>
    
   
  )
}

export default Blogs
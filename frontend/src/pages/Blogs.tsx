
import AppBar from '../Components/AppBar'
import BlogCard from '../Components/BlogCard'

function Blogs() {
  return (
    <div>
      <div className='mb-2'>
        <AppBar/>
        
      </div>
      <div>
      <div className='flex justify-center'>
       <div>
          <BlogCard
            id={"1"}
            authorName={'sidharth'}
            title={'how a ugly website can make 5000 dollars wvery month thayt is creativivty'}
            content={'adadakdadkjaaaaaaaaaaaaadadakjdadadakdbakjdbsakjdbsakdbsakjdbsakjdbsakdbsakjdbakjdbakjdbsakjdbsakjdb....'}
             PublishedDate={"2nd Feb 2024"}


          />
          <BlogCard
            id={"1"}
            authorName={'sidharth'}
            title={'how a ugly website can make 5000 dollars wvery month thayt is creativivty'}
            content={'adadakdadkjaaaaaaaaaaaaadadakjdadadakdbakjdbsakjdbsakdbsakjdbsakjdbsakdbsakjdbakjdbakjdbsakjdbsakjdb....'}
            PublishedDate={"2nd Feb 2024"}


          />
       </div>

    </div>
      </div>
    </div>
    
   
  )
}

export default Blogs
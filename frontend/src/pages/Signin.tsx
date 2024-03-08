import SigninPage from "../Components/SigninPage"
import Quote from "../Components/Quote"


function Signin() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2'>
      <div><SigninPage/></div>
      <div><Quote/></div>
    </div>
  )
}

export default Signin

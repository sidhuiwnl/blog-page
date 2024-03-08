import Quote from "../Components/Quote"
import SignupPage from "../Components/SignupPage"


function Signup() {
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div><SignupPage/></div>
      <div><Quote/></div>
    </div>
  )
}

export default Signup

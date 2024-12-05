import { useState, useEffect } from "react"
import axios from "axios";
import Logo from './assets/MoneyTackerLogo.png'
import DolarSign from "./assets/Dolar.png"
import { useNavigate } from "react-router-dom";

function LogSignIn() {
  let [email, setEmail] = useState();
  let [name, SetUserName] = useState();
  let [password, SetPassword] = useState();
  let [balance,setBalance] = useState();

  let [logEmail, SetLogEmail] = useState();
  let [logPass, SetLogPass] = useState();

  let [Select, SetSelect] = useState('login')
  let [animation, SetAnimation] = useState('')
  const navigate = useNavigate();

  const imgs = () => {
    return (<>
        <img className="imgs" style={{ position: "absolute", left: '-50px', top: "-200px", rotate: '50deg', width: '600px', height: '600px' }} src={DolarSign} alt="" />
        <img className="imgs" style={{ position: "absolute", left: '1600px', top: "250px", rotate: '150deg', width: '600px', height: '600px' }} src={DolarSign} alt="" />
        <img className="imgs" style={{ position: "absolute", left: '700px', top: "-5px", rotate: '150deg', width: '900px', height: '900px' }} src={DolarSign} alt="" />
        <img className="imgs" style={{ position: "absolute", left: '100px', top: "600px", rotate: '50deg', width: '800px', height: '800px' }} src={DolarSign} alt="" />
        <img className="imgs" style={{ position: "absolute", left: '1400px', top: "900px", rotate: '150deg', width: '700px', height: '700px' }} src={DolarSign} alt="" />
    </>)

}

  const addUser = async () => {

    try {
      const response = await axios.post('https://backendbudgewise.onrender.com/users/SignUp/',
        { email, name, password ,balance}, { withCredentials: true })
        navigate('/');
      console.log(response.data.Balance)
    } catch (error) {
      console.error(error)
    }

  }

  const logIn = async () => {
    try {
      const response = await axios.post('https://backendbudgewise.onrender.com/users/LogIn', { logEmail, logPass }, { withCredentials: true })

  navigate('/');
      console.log(response.data)

    } catch (error) {
      console.error(error)
    }
  }

  const Login = () => {

    return (<>

      <div className={`inputBody ${animation}`}>

        <h2 className="fs-title mb-5 inputText">Account Login</h2>

        <input onChange={(e) => { SetLogEmail(e.target.value) }} type="email" name="email" placeholder="Email" required />
        <input onChange={(e) => { SetLogPass(e.target.value) }} type="password" name="pass" placeholder="Password" required />
        <button onClick={async () => { await logIn()}} className="action-button">Log In</button>
      </div>

    </>)
  }

  const Signup = () => {

    return (<>

      <div className={`inputBody ${animation}`}>

        <h2 className="fs-title mb-5 inputText" >Create your account</h2>
        <input onChange={(e) => { SetUserName(e.target.value) }} type="text" placeholder="UserName" required />
        <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" placeholder="Email" required />
        <input onChange={(e) => { setBalance(e.target.value) }} type="number" placeholder="Enter your balance" required />
        <input onChange={(e) => { SetPassword(e.target.value) }} type="password" name="pass" placeholder="Password" required />

        <button onClick={async () => { await addUser(), history.go(0) }} className="action-button">Sign up</button>
      </div>


    </>)
  }

  useEffect(() => {
    Select == 'login' ? SetAnimation('innerBody') : SetAnimation('innerBody2')

  }, [Select])


  return (<>

<div className=" m-auto" style={{ position: "relative", width: '100%', overflow: 'hidden', objectFit: 'cover'}}>
{imgs()}
    <div className="Header shadow ">
      <img style={{ margin: 'auto' }} src={Logo} className="mt-4 ms-3" alt="" width={'160px'} height={'30px'} /></div>
  
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 Header2" style={{position:'relative'}}>
  
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start d-none   d-lg-block ">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Stay on track to meet your financial goals!</h1>
          <p className="col-lg-10 fs-4">Track your income and expenses, and view detailed analytics, from weekly breakdowns to yearly summaries. Gain insights into your spending habits and progress towards your yearly goals to make every dollar count.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <div className="Body shadow ps-3 pe-3">
            <div className="d-flex body2">
              <div>
                <button id="logIn" className={`Buttons ms-2 rounded-bottom LoginButton ${Select == 'login' ? 'LogSign' : 'remove'}`} onClick={() => { SetSelect('login') }
                }>Log in</button>
              </div>

              <div>
                <button id="SignUp" className={`Buttons ms-2 rounded-bottom signupButton ${Select == 'signup' ? 'LogSign' : 'remove'}`} onClick={() => { SetSelect('signup') }}>Sign up</button>
              </div>
            </div>


            {
              Select == 'login' ? Login() : Signup()
            }


          </div>
        </div>
        <div className="col-lg-7 text-center text-lg-start  d-lg-none mt-5 ">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Stay on track to meet your financial goals!</h1>
          <p className="col-lg-10 fs-4">Track your income and expenses, and view detailed analytics, from weekly breakdowns to yearly summaries. Gain insights into your spending habits and progress towards your yearly goals to make every dollar count.</p>
        </div>
      </div>
    </div>

</div>
  </>)
}


export default LogSignIn;
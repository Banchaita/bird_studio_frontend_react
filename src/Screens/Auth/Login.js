import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { login, setAuth, resend_otp } from '../../store/auth'
import toast from "../../Components/common/toast"
import { useDispatch, useSelector } from 'react-redux'
import './login.css'

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { token, user } = useSelector((state) => state.auth)
    const loginMessage = useSelector((state) => state.auth.loginMessage)

    const forgotPass = async () => {
        if (email === "") {
            toast.error("Please Enter Your Email Id")
            return false
        }
        localStorage.setItem('email', email)
        dispatch(resend_otp(email, history))
    }

    const handleClick = async () => {
        if (email === "" || password === "") {
            toast.error("Please Enter Email and Password to Proceed")
            return false
        }
        dispatch(login({ email, password }))
    }

    useEffect(() => {
        if (token && user?.is_email_verified == 0) {
            history.push('/otp')
        } else if (token && user?.is_email_verified == 1) {
            history.push('/levelpage')
        }
    }, [token, user])

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = () => {
        const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : null
        if (initialToken) {
            dispatch(setAuth(true))
        }
    }

    return (
        <>
            <div className="background">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="form bg-white px-5">
                                <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="img-fluid mt-3 mb-3"
                                    />
                                </a>
                                <form>
                                    <p style={{ marginBottom: '20px' }} className={'text-center text-danger'} >{loginMessage ? loginMessage : ""}</p>
                                    <p className='text-cnter mt-3'>Welcome!</p>
                                    <div className="form-outline mb-4 mt-5">
                                        <input type="email" id="form2Example11" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your Email Address" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="form2Example11" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your Password" />
                                    </div>

                                    <div className="text-right">
                                        <span onClick={() => forgotPass()} className='forgotPass'>Forgot password ?</span>
                                    </div>

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <button onClick={() => handleClick()} className="btnSubmit btn btn-block fa-lg gradient-custom-2 mb-3 p-3" type="button">Login</button>
                                        <p className='singuptext'>New user? <span onClick={() => history.push('/signup')}>Signup Here</span></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Login

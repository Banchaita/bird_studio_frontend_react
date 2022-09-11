import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { signup } from '../../store/auth'
import toast from "../../Components/common/toast"
import { useDispatch, useSelector } from 'react-redux'
import './login.css'

const Signup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { token, user } = useSelector((state) => state.auth)
    const signupMessage = useSelector((state) => state.auth.signupMessage)

    const handleClick = async () => {
        if (name === "" || email === "" || password === "") {
            toast.error("Please Enter All Required Fields")
            return false;
        }
        let data = {
            name: name,
            email: email,
            password: password
        }
        dispatch(signup(data))
    }

    useEffect(() => {
        if (token && user?.is_email_verified == 0) {
            history.push('/otp')
        }
    }, [token, user])

    return (
        <>
            <div className="background">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className=" signup-form bg-white px-5">
                                <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                    <img
                                        src={logo}
                                        alt="logo"
                                        style={{ width: '100%' }}
                                        className="signup-img-fluid mt-3 mb-3"
                                    />
                                </a>
                                <form>
                                    <p style={{ marginBottom: '20px' }} className={'text-center text-danger'} >{signupMessage ? signupMessage : ""}</p>
                                    <p className='text-cnter mt-2'>Welcome!</p>
                                    <div className="form-outline mb-4 mt-4">
                                        <input type="text" id="form2Example11" onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter you Name" />
                                    </div>

                                    <div className="form-outline mb-4 mt-3">
                                        <input type="email" id="form2Example11" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter you Email Address" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="form2Example11" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your password" />
                                    </div>

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <button onClick={() => handleClick()} className="btnSubmit btn btn-block fa-lg gradient-custom-2 mb-3 p-3" type="button">Sign Up</button>
                                        <p className='singuptext'>Already user <span onClick={() => history.push('/login')}>Login Here</span></p>
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

export default Signup

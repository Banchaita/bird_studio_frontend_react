import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { change_password } from '../../store/auth'
import toast from "../../Components/common/toast"
import { useDispatch, useSelector } from 'react-redux'
import './login.css'

const ChangePassword = () => {
    let setemail = localStorage.getItem('email')
    const history = useHistory();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [email, setEmail] = useState(setemail)


    const handleClick = async () => {
        if (password === "" || confirm_password === "") {
            toast.error("Please fill all the required fields to proceed")
            return false
        }
        if (password !== confirm_password) {
            toast.error("Password and Confirm Password should be same")
            return false
        }
        dispatch(change_password({ email, password, history }))
    }

    return (
        <>
            <div className="background">
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center mt-5">
                        <div className="form bg-white p-5 changepasswode">
                            <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                <img
                                    src={logo}
                                    alt="logo"
                                    className="img-fluid mt-3 mb-3"
                                />
                            </a>
                            <form>
                                <p className='text-cnter mt-3'>Create new password</p>

                                <div className="form-outline mb-4">
                                    <input type="password" id="form2Example11" onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter new Password" />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" id="form2Example11" onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" placeholder="Enter confirm Password" />
                                </div>

                                <div className="text-center pt-1 mb-5 pb-1">
                                    <button onClick={() => handleClick()} className="btnSubmit btn btn-block fa-lg gradient-custom-2 mb-3 p-3" type="button">Change Password</button>
                                    <p className='singuptext'>Back to <span onClick={() => history.push('/login')}>Login Page</span></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword

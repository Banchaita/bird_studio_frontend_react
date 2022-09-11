import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { verify_forgot_otp, resend_otp } from '../../store/auth'
import toast from "../../Components/common/toast"
import { useDispatch, useSelector } from 'react-redux'
import './login.css'

const Otp = () => {
  const inputref1 = useRef(null)
  const inputref2 = useRef(null)
  const inputref3 = useRef(null)
  const inputref4 = useRef(null)

  const history = useHistory();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { user, email } = useSelector((state) => state.auth)
  const otpMessage = useSelector((state) => state.auth.otpMessage)

  const resendOtp = async () => {
    dispatch(resend_otp(email))
  }

  const handleClick = async () => {
    let val = otp[0] + otp[1] + otp[2] + otp[3]
    if (val === "") {
      toast.error("Please enter a valid otp!")
      return false
    }
    console.log(val, email)
    let data = {
      otp: val, email, history
    }
    dispatch(verify_forgot_otp(data))
  }

  useEffect(() => {
    if (user?.is_email_verified == 1) {
      history.push('/start')
    }
  }, [user])

  const onChangeText1 = (value) => {
    let isNumber = !isNaN(Number(value))
    if (isNumber) {
      setOtp([value, otp[1], otp[2], otp[3]])
      if (!value.trim() == "") {
        inputref2.current.focus()
      }
    } else {
      setOtp(['', otp[1], otp[2], otp[3]])
    }
  }

  const onChangeText2 = (value) => {
    let isNumber = !isNaN(Number(value))
    if (isNumber) {
      setOtp([otp[0], value, otp[2], otp[3]])
      if (value.trim() == "") {
        inputref1.current.focus()
      } else {
        inputref3.current.focus()
      }
    } else {
      setOtp([otp[0], '', otp[2], otp[3]])
    }
  }

  const onChangeText3 = (value) => {
    let isNumber = !isNaN(Number(value))
    if (isNumber) {
      setOtp([otp[0], otp[1], value, otp[3]])
      if (value.trim() == "") {
        inputref2.current.focus()
      } else {
        inputref4.current.focus()
      }
    } else {
      setOtp([otp[0], otp[1], '', otp[3]])
    }
  }

  const onChangeText4 = (value) => {
    let isNumber = !isNaN(Number(value))
    if (isNumber) {
      setOtp([otp[0], otp[1], otp[2], value])
      if (value.trim() == "") {
        inputref3.current.focus()
      } else {
        inputref4.current.blur()
      }
    } else {
      setOtp([otp[0], otp[1], otp[2], ''])
    }
  }

  return (
    <>
      <div className="background">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center mt-5">
            <div className=" otp-form  bg-white-otp p-5 forget">
              <a target='_blank' href={"https://www.clearviewbirds.com"}>
                <img
                  src={logo}
                  alt="logo"
                  style={{width:'100%'}}
                  className="forget-img-fluid mt-3 mb-3"
                />
              </a>
              <div className="d-flex justify-content-center align-items-center container">
                <div className="card otp-body">
                  <h2 className='text-center'>4 digit OTP is sent to your Email Address</h2>
                  <p style={{ marginBottom: '20px' }} className={'text-center text-danger'} >{otpMessage ? otpMessage : ""}</p>

                  <div className="d-flex flex-row mt-5">
                    <input type="text" ref={inputref1} value={otp[0]} onChange={(e) => onChangeText1(e.target.value)} className="form-control text-center" maxLength={1} autofocus="" />
                    <input type="text" ref={inputref2} value={otp[1]} onChange={(e) => onChangeText2(e.target.value)} className="form-control text-center" maxLength={1} />
                    <input type="text" ref={inputref3} value={otp[2]} onChange={(e) => onChangeText3(e.target.value)} className="form-control text-center" maxLength={1} />
                    <input type="text" ref={inputref4} value={otp[3]} onChange={(e) => onChangeText4(e.target.value)} className="form-control text-center" maxLength={1} />
                  </div>
                  <div className="text-center mt-5">
                    <span class="d-block mobile-text">Don't receive the code?</span>
                    <span onClick={() => resendOtp()} class="font-weight-bold cursor">Resend</span>
                  </div>
                  <div class="text-center pt-1 mt-5 pb-1">
                    <button onClick={() => handleClick()} class="btnSubmit btn btn-block fa-lg gradient-custom-2 mb-3 p-3" type="button">Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Otp

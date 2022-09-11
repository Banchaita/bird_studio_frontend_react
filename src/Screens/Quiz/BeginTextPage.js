import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'


const BeginTextPage = () => {
    const history = useHistory();

    return (
        <>
            <div className="background-blur"></div>

            <div className='bg-text'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className=" quiz-text-form bg-white p-5">
                                <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                    <img
                                        src={logo}
                                        alt="logo"
                                        style={{ width: '100%' }}
                                        className=" quiztext-img-fluid mt-3 mb-3 quzitext-logo"
                                    />
                                </a>
                                <p className=' quiztext text-cnter mt-3'>
                                    There will be a clock run down time and when last 5 seconds left the countdown timer highlighted with red color.

                                    <br /><br />
                                    For each multiple-choice question option there will be a species name and corresponding image

                                    <br /><br />
                                    “When you are ready, click to begin”
                                </p>
                                <button className='quzi-text-btn' onClick={() => history.push('/levelpage')}>Click here to begin <span>&nbsp;&nbsp;&nbsp;<i class="fas fa-angle-right"></i></span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default BeginTextPage

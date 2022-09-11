import React from 'react'
import { useHistory } from 'react-router-dom'
import level from '../../assets/images/level1.png'
import { useSelector } from 'react-redux'
import { FacebookShareButton } from "react-share";

const CongratulationsPage = () => {
    const history = useHistory();
    const { selected_level, levels } = useSelector((state) => state.user)
    const current_level = levels.filter(item => item?._id == selected_level)[0]

    return (
        <>
            <div className="background-blur2">
                <section className="gradient-form" >
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center mt-5">
                            <p className='quizhome-text-center' style={{ textAlign: 'center', fontSize: '44px' }}>Congratulations!</p>
                            <p className='quizhome-text-center' style={{ textAlign: 'center', fontSize: '44px' }}>You’ve earned the <b>"{current_level?.name}"</b></p>
                            <div className="row g-0">
                                <div className="col-lg-4 col-md-4 col-xs-12"></div>
                                <div className="col-lg-4 col-md-4 col-xs-12">
                                    <div className='d-flex flex-column justify-content-center align-items-center leveleasy mt-3'>
                                        <img
                                            src={level}
                                            style={{
                                                width: '40%'
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-12"></div>
                            </div>
                            <div className="row text-center mt-5">
                                <p style={{ fontSize: '18px' }}>Share your achievement on Social Media!</p>
                                <FacebookShareButton url={"http://solidappmaker.ml/achievement.jpeg"} quote="Achievement" hashtag='#achievement'>
                                    <div id="fb-share-button">
                                        <svg viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet">
                                            <path class="svg-icon-path" d="M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z"></path>
                                        </svg>
                                        <span>Share</span>
                                    </div>
                                </FacebookShareButton>
                                <p style={{ fontSize: '18px', marginTop: '45px' }}>Take the next level test now</p>
                                <p style={{ fontSize: '18px' }}>Check out our sponsor – ClearView</p>
                                <p style={{ fontSize: '18px' }}>The first Window Bird Feeder designed to feed AND protect birds</p>
                                <p style={{ fontSize: '18px' }}>With 4 Layers of Protection for birds’ health!</p>
                            </div>
                            <div class="text-center sharefacebookbtn">
                                <button onClick={() => history.push('/levelpage')} class="btnSubmit" className="btn btn-block fa-lg gradient-custom-2 p-2 mt-4" type="button">Continue</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CongratulationsPage

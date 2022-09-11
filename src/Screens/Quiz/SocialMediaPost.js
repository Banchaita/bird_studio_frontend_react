import React from 'react'
import { useHistory } from 'react-router-dom'
import level from '../../assets/images/level1.png'
import { useSelector } from 'react-redux'

const SocialMediaPost = () => {
    const history = useHistory();
    const { selected_level, levels } = useSelector((state) => state.user)
    const current_level = levels.filter(item => item?._id == selected_level)[0]

    return (
        <>
            <div className="background-blur2">
                <section className="gradient-form" >
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center mt-5">
                            <div className="row text-center mt-5">
                                <p style={{ fontSize: '18px' }}>I just earned a <b>"{current_level?.name}"</b> certification by identifying bird songs!</p>
                                <p style={{ fontSize: '18px' }}>I’m on my way to become a Bird Song Maestro!</p>
                            </div>
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
                                <p style={{ fontSize: '18px' }}>You can take the test too!</p>
                                <a style={{ fontSize: '18px' }}></a>
                                <p className='singuptext'>Click here <span onClick={() => history.push('http://solidappmaker.ml:5041/#/levelpage')}>to hear bird songs and test your skills!</span></p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default SocialMediaPost

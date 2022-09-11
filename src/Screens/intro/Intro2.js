import React from 'react'
import { useHistory } from 'react-router-dom'
import intro2 from '../../assets/images/intro2.png'
import level from '../../assets/images/level1.png'

const Intro2 = () => {
    const history = useHistory();

    return (
        <>
            <div className="background-blur2">
                <section className="gradient-form" >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-11 text-left mt-5 intro-area">
                                <p className='intro-text' style={{ fontSize: '46px', fontWeight: 'bold' }}>There are Three Levels of Certification with Increasing Difficulty</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img
                                    src={intro2}
                                    alt="intro2"
                                    style={{ width: '40%' }}
                                />
                            </div>
                            <div className="col-md-8 text-left intro-text">
                                <p style={{ fontSize: '18px' }}>There are three different levels of mastery you can achieve.  </p>
                                <p style={{ fontSize: '18px' }}>The purpose is to challenge yourself to correctly identify bird songs and calls from some of the most common songbirds in the United States. </p>
                                <p style={{ fontSize: '18px' }}>Each level must be completed to proceed to the next, and you will receive a higher level of certification for each test you successfully pass.</p>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-2"></div>
                            <div className="col-md-8 text-center">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className='d-flex flex-column justify-content-center align-items-center leveleasy mt-3 into-level-area'>
                                            <img
                                                src={level}
                                                style={{
                                                    width: '40%',
                                                }}
                                            />
                                            <p className='name text-center mt-5'>Early Bird Sings Badge</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className='d-flex flex-column justify-content-center align-items-center leveleasy mt-3 into-level-area'>
                                            <img
                                                src={level}
                                                style={{
                                                    width: '40%',
                                                    filter: 'grayscale(90%)'
                                                }}
                                            />
                                            <p className='name text-center mt-5'>Song Birder level 2</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className='d-flex flex-column justify-content-center align-items-center leveleasy mt-3 into-level-area'>
                                            <img
                                                src={level}
                                                style={{
                                                    width: '40%',
                                                    filter: 'grayscale(90%)'
                                                }}
                                            />
                                            <p className='text-center mt-5'>Bird Song Maestro Badge</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-4"></div>
                            <div className="col-md-4 text-center mb-3">
                                <a onClick={() => history.push('/intro3')} style={{ fontWeight: 'bold', fontSize: '18px', color: '#68a6f2' }}>Click here to continue!</a>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Intro2

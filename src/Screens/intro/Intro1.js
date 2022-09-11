import React from 'react'
import { useHistory } from 'react-router-dom'
import intro1 from '../../assets/images/intro1.png'
import logo from '../../assets/images/logo.png'

const Intro1 = () => {
    const history = useHistory();

    return (
        <>
            <div className="background-blur2">
                <section className="gradient-form intro1" >
                    <div className="row">
                        <div className='col-md-2 text-center mt-5 mb-3 '>
                            <div className='sponsored-area '>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Sponsored by ClearView Deluxe
                                    <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                        <img
                                            src={logo}
                                            alt="logo"
                                            className="img-fluid"
                                            width={'50%'}
                                        />
                                    </a>
                                </p>
                                <p>Feed AND Protect your birds!</p>
                            </div>
                            
                        </div>

                        <div className='col-md-8'>
                            <div className="row mt-5">
                                <div className="col-md-1"></div>
                                <div className="col-md-7 text-left mt-5 intro-area">
                                    <p className='intro-text-title' style={{ fontSize: '46px', fontWeight: 'bold' }}>Test Your Bird Song Identification Skills!</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 text-center ">
                                    <img
                                        src={intro1}
                                        alt="intro1"
                                        style={{ width: '40%' }}
                                    />
                                </div>
                                <div className="col-md-8 text-left intro-text">
                                    <p style={{ fontSize: '18px' }}>"Welcome to this test of your bird song skills. There are some among us who have cultivated an amazing ability to identify bird species via their songs and calls. </p>
                                    <p style={{ fontSize: '18px' }}>Some can even piece together real-time interactions occurring between mates, siblings, and other species, via their “call and response”. They may even be able to pick up on warnings and alerts.</p>
                                    <p style={{ fontSize: '18px' }}>Imagine being able to walk through the forest not only hearing the birds sing, but also being able to know their species, even if they are hidden in the foliage above!</p>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-2"></div>
                                <div className="col-md-8 text-center intro-sub-text">
                                    <p style={{ fontSize: '18px' }}>This is the reason we’ve developed this interactive bird song page, so we can train ourselves (and invite others!) to impart on the journey to become birdsong masters. </p>
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-8 text-center">
                                    <button onClick={() => history.push('/intro2')} className="btn btn-block fa-lg gradient-custom-2 mb-3 p-3" type="button" style={{ width: '165px', height: '55px' }}>Learn More</button>
                                    <p className='singuptext'>Skip to Login <span onClick={() => history.push('/beginpage')}>Click Here</span></p>
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                    
                </section>
            </div>
        </>
    )
}

export default Intro1

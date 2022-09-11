import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import toast from "../../Components/common/toast"
import Peacock from "../../assets/Peacock-sound.mp3"

const WelcomePage = () => {
    const history = useHistory();

    const onNoPress = () => {
        toast.error("Please check your connection with audio output device !")
        return false
    };

    return (
        <>
            <div className="background-blur"></div>
            <div className='bg-text'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className=" start-form bg-white-start p-5">
                                <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                    <img
                                        src={logo}
                                        alt="logo"
                                        style={{ width: '100%' }}
                                        className="welcome-img-fluid mt-3 mb-3"
                                    />
                                </a>
                                <p className='text-cnter mt-3'>Welcome! We see this is your first attempt to achieve your bird song certification. Good luck!</p>
                                <p className='subtext'>Can you hear the Cardinal chirping?</p>
                                <div class="form-outline mb-4 mt-5">
                                    <audio src={Peacock} controls="rue" class="audio-2"></audio>
                                </div>
                                <div class="form-outline mb-4 mx-auto">
                                    <div className='row '>
                                        <div className='col-md-6 yes'>
                                            <button className='yes' onClick={() => history.push('/begintextpage')}>Yes</button>
                                        </div>
                                        <div className='col-md-6 no'>
                                            <button onClick={onNoPress} className='no'>No</button>
                                        </div>
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

export default WelcomePage

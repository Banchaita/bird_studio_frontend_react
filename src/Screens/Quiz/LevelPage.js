import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { get_user_detail } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'

import { Modal } from 'react-bootstrap';
import { check_progress, get_levels } from '../../store/user'
import { file_url } from '../../utils/api'


const LevelPage = () => {
    const history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const dispatch = useDispatch();

    const levels = useSelector((state) => state.user.levels)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!levels.length) {
            dispatch(get_levels())
            dispatch(get_user_detail())
        }
    }, [levels])

    const _onClick = async (level) => {
        let level_id = level?._id
        dispatch(check_progress(level_id, history))
    }

    const isDisabled = (item, index) => {
        if (index == 0) {
            return false
        } else {
            // if (user?.progress[index - 1] !== undefined && user?.progress[index - 1].passed) {
            if (item.access == 1) {
                return false
            }
            return true
        }
    }

    return (
        <>
            <div className="background-blur2">
                <section className="gradient-form" >
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className='d-flex justify-content-center' style={{ width: '100%', textAlign: 'center' }}>
                                <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                    <img
                                        src={logo}
                                        alt="logo"
                                        style={{ width: '30%' }}
                                        className="quizhome-img-fluid mt-3 mb-3"
                                    />
                                </a>
                            </div>
                            <p className='quizhome-text-center' style={{ textAlign: 'center', fontSize: '18px' }}>Check out our sponsor – ClearView </p>
                            <p className='quizhome-text-center' style={{ textAlign: 'center', fontSize: '18px' }}>The first Window Bird Feeder designed to feed AND protect birds With </p>
                            <p className='quizhome-text-center' style={{ textAlign: 'center', fontSize: '18px' }}>4 Layers of Protection for birds’ health!</p>
                            <p className='quizhome-title' style={{ textAlign: 'center', fontSize: '30px', fontSize: '46px', fontWeight: 'bold' }}>Master 3 Bird Song Certification Levels</p>
                            <div className="row g-0">
                                {levels.map((item, index) => <div className="col-lg-4">
                                    <div className='d-flex flex-column justify-content-center align-items-center leveleasy mt-3 level-area'>
                                        <img
                                            src={file_url + item?.image}
                                            style={{
                                                width: '30%',
                                                filter: !isDisabled(item, index) ? null : 'grayscale(90%)'
                                            }}
                                        />
                                        <p className='over text-center mt-3 ' style={{ color: item?.marks > 0 ? '#f9aa1b' : 'white', fontWeight: 'bolder', fontSize: '33px' }}>{item?.marks}%</p>
                                        <p className='name text-center'>{item?.name}</p>
                                        <button style={{ backgroundColor: !isDisabled(item, index) ? null : "#9e9e9e" }} disabled={isDisabled(item, index)} className='mb-4' onClick={() => _onClick(item)}>Start Now</button>
                                    </div>
                                </div>)}
                                <p className='quizhome-text-sub mt-5' style={{ textAlign: 'center', fontSize: '18px' }}>You must successfully pass each certification level to move to the next level </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
            >
                <Modal.Body>
                    <div className="row g-0">
                        <div className="col-lg-6">
                            <div className="modal-card-body p-md-5 mx-md-4">
                                <div className="modal-text-center">
                                    <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                        <img
                                            src={logo}
                                            alt="logo"
                                            style={{ marginLeft: '11rem', width: '100%' }}
                                            className="modal-img-fluid mt-3 mb-3"
                                        />
                                    </a>
                                    <p className='modal-text-center' style={{ marginRight: '-22rem', fontSize: '26px', fontWeight: '600' }}>To play Song Birder Badge you have to pass <br /> Early Bird Sings Badge.</p>
                                    <button className='quzi-text-btn' onClick={() => history.push('/')} style={{ width: '100%', marginLeft: '11rem' }}>Click here to begin <span><i class="fas fa-angle-right"></i></span></button>

                                </div>
                            </div>
                        </div>
                    </div>


                </Modal.Body>
            </Modal>
        </>
    )
}

export default LevelPage

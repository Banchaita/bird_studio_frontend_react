import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import timer from '../../assets/images/timer.png'
import timer2 from '../../assets/images/timer2.png'
import timer3 from '../../assets/images/timer3.png'
import playbutton from '../../assets/images/play-button.png'
import playbutton1 from '../../assets/images/play-button1.png'
import { file_url } from '../../utils/api'
import { Modal } from 'antd';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../Auth/login.css'
import { trial_questions as questions } from '../../utils/static_data'
import { trial_levels as levels } from '../../utils/static_data'

const TrialPage4 = () => {
    const history = useHistory();
    const [selected_question, setSelectedQuestion] = useState(0)
    const current_level = [levels[0]]
    const current_question = questions.length ? questions[selected_question] : null
    let intervalRef = useRef(null);
    const [time, setTimer] = useState(current_question?.level_id?.question_timing || 0)
    const [isNextActive, setIsNextActive] = useState(false)
    const [answers, setAnswers] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [audio, setAudio] = useState(null)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [wrongAnswers, setWrongAnswers] = useState([])
    const [lifeLines, setLifeLines] = useState(current_level[0].fifty_fifty)
    const [isPaused, setIsPaused] = useState(false)
    const [isAnswerSelected, setIsAnswerSelected] = useState(false)
    const [isfiftymodel, setIsfiftymodel] = useState(false)

    useEffect(() => {
        setLifeLines(current_level[0].fifty_fifty)
    }, [])

    useEffect(() => {
        if (questions.length) {
            setTimer(questions[0]?.level_id?.question_timing)
            setSelectedQuestion(0)
        }
    }, [questions])

    useEffect(() => {
        if (questions.length) {
            let temp = questions.map(item => { return { ans: item?.is_corret_answer, user_ans: null } })
            setAnswers([...temp])
            setAudio(new Audio(file_url + questions[0]?.question_file_audio))
        }
    }, [questions])

    useEffect(() => {
        if (time <= 0) {
            onSelectAnswer("not_answered", selected_question, false)
            stopTimer()
        }
    }, [time])

    const stopTimer = () => clearInterval(intervalRef.current)

    const onSelectAnswer = (ans, index, shouldSelect) => {
        if (wrongAnswers.includes(index)) {
            return
        }
        if (!isAnswerSelected && time < current_question?.level_id?.question_timing) {
            if (shouldSelect) {
                setSelectedAnswerIndex(index)
            }
            stopTimer()
            setIsAnswerSelected(true)
            let temp = [...answers]
            temp[selected_question] = { ...temp[selected_question], user_ans: ans }
            setAnswers([...temp])
            setIsNextActive(true)
            if (isPlaying) {
                setIsPlaying(false)
                audio?.pause();
                audio.currentTime = 0;
            }
        }
    }

    const _useLifeLine = () => {
        let wrongAns = []
        current_question.answer.forEach(element => {
            if (element !== current_question.is_corret_answer) {
                wrongAns.push(element)
            }
        });

        setWrongAnswers([current_question.answer.indexOf(wrongAns[0]), current_question.answer.indexOf(wrongAns[2])])
        setLifeLines(lifeLines - 1)
        setIsfiftymodel(false)

    }

    const submit = () => {
        if (isPlaying && !isNextActive && lifeLines > 0) {
            setIsfiftymodel(true)
        }
    }

    const getTimerImage = () => {
        if (time <= 5) {
            return timer3
        } else if (time <= 10) {
            return timer2
        } else {
            return timer
        }
    }

    return (
        <>
            <Modal
                visible={isfiftymodel} onOk={() => _useLifeLine()}
                onCancel={() => setIsfiftymodel(false)}>
                <p>Are you Sure you want to use 50-50 option for this question ?</p>
            </Modal>
            <div className="background-blur3">
                <section className="gradient-form" >
                    <div className='d-flex'>
                        <div className='col-md-2 text-left prevBtn' style={{ marginTop: '42vh' }}>
                            <a href="#/trialpage3" class="previous round" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '150px', padding: '10px' }}>&#8249;</a>
                        </div>
                        <div className='col-md-8 text-center'>
                            <div className="Question_page mt-3">
                                <div className="Question_page_left">
                                    <div className='row'>
                                        <div className='col-md-12 mt-3'>
                                            <p className='intro-text mb-0' style={{ fontSize: '40px', fontWeight: 'bold' }}>Here is a tour of the test interface</p>
                                            <h5 style={{ textAlign: 'center', fontWeight: 'normal' }}>Click the flashing arrow on the right side to continue</h5>
                                        </div>
                                    </div>
                                    <div className='fifty_fifty_trail pt-3 pb-3'>
                                        <div className='text-center mb-2'>
                                            <button className='game-start-btn'>50-50 Options Available <span className='lognarrow text-white'>&#x27A1;</span></button>
                                        </div>
                                        <div onClick={() => submit()} className='reductions  centertext-reduction text-center' style={{ marginLeft: "1rem" }}>
                                            <p className='m-0'>50-50 &nbsp;<span>{lifeLines}</span></p>
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <p className='text-center trial-text' style={{ fontSize: '30px' }}>Which bird species do you hear?</p>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-4'></div>
                                        <div disabled={isNextActive} className='col-md-4 text-center playbtn'>
                                            <img
                                                src={isPlaying ? playbutton1 : playbutton}
                                                style={{ width: '90px' }}
                                            />
                                        </div>
                                        <div className='col-md-4'></div>
                                    </div>
                                    <div className='col-lg-12 text-center'>
                                        <div className='d-flex justify-content-center align-items-center flex-wrap mt-5'>
                                            {current_question?.answer.map((item, index) => {
                                                return (
                                                    <div onClick={() => onSelectAnswer(item, index, true)} className='bird1' style={{ height: "auto", position: 'relative', border: '1px solid #c1bdbd' }}>
                                                        <img
                                                            src={file_url + item}
                                                            alt="brid1"
                                                            class="birdimage"
                                                            style={{ width: 200, height: 200, objectFit: 'contain', padding: '20px' }}
                                                        />
                                                        <p style={{ fontSize: '18px' }}>bird-{index + 1}</p>
                                                        {
                                                            answers.length && answers[selected_question].user_ans !== null &&
                                                                selectedAnswerIndex == index ?
                                                                <div style={{ backgroundColor: answers[selected_question].user_ans == current_question.is_corret_answer ? 'green' : 'red', height: "100%" }} className="overlay"></div> : null
                                                        }
                                                        {wrongAnswers.includes(index) && <div style={{ backgroundColor: 'gray', height: "100%" }} className="overlay"></div>}
                                                        {isAnswerSelected && current_question.is_corret_answer == item?.value && <div style={{ backgroundColor: 'green', height: "100%" }} className="overlay"></div>}
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='col-md-12 form-outline text-center'>
                                            <button onClick={() => history.push('/trialpage5')} className="nextbtn btn-success" disabled>
                                                <span className="glyphicon glyphicon-next"></span> Next
                                            </button>
                                            <a className='singuptext' style={{ fontSize: '20px', marginLeft: '15px' }} onClick={submit}>Use 50-50</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='Question_page_right check-box-area'>
                                    <ul className='question_checkbox' style={{ listStyle: 'none' }}>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                        <li>
                                            <label className='custom-checkbox'>
                                                <input type="checkbox" disabled />
                                                <b></b>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-2 text-right nextBtn' style={{ marginTop: '42vh' }}>
                            <a href="#/trialpage5" class="next round" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '150px', padding: '10px' }}>&#8250;</a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default TrialPage4

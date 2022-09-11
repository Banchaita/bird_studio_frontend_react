import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import timer from '../../assets/images/timer.png'
import timer2 from '../../assets/images/timer2.png'
import timer3 from '../../assets/images/timer3.png'
import playbutton from '../../assets/images/play-button.png'
import playbutton1 from '../../assets/images/play-button1.png'
import { file_url } from '../../utils/api'
import { Modal, Popconfirm, message } from 'antd';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../Auth/login.css'
import { trial_questions as questions } from '../../utils/static_data'
import { trial_levels as levels } from '../../utils/static_data'

const TrialQuestion = () => {
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

    const decreaseNum = () => {
        if (time > 0) {
            setTimer((prev) => prev - 1);
        } else {
            stopTimer()
        }
    }

    const startTimer = () => intervalRef.current = setInterval(decreaseNum, 1000);

    const stopTimer = () => clearInterval(intervalRef.current)

    const onClickPlay = () => {
        if (isPlaying) {
            setIsPlaying(true)
            setIsPaused(false)
            return audio.pause();
        }
        stopTimer()
        if (!isNextActive) {
            startTimer()
            setIsPaused(false)
            setIsPlaying(true)
            audio.play()
        }
    }

    const onClickNext = () => {
        if (selected_question <= questions.length - 1) {
            setIsAnswerSelected(false)
            setWrongAnswers([])
            setSelectedAnswerIndex(null)
            setSelectedQuestion(selected_question + 1)
            setIsNextActive(false)
            setTimer(questions[selected_question + 1]?.level_id?.question_timing)
            setIsPlaying(false)
            setAudio(new Audio(file_url + questions[selected_question + 1]?.question_file_audio))
        }
    }

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

    const submitAnswers = () => {
        setWrongAnswers([])
        setSelectedAnswerIndex(null)
        setAnswers([])
        history.push('/beginpage')
    }

    const _useLifeLine = () => {
        if (lifeLines <= 0) {
            return message.error("Sorry !!! You don't have more 50-50 chances to implement")
        }
        if (time > 0 && time < current_question?.level_id?.question_timing && !isNextActive) {
            let wrongAns = []
            current_question.answer.forEach((element, index) => {
                if (element.value !== current_question.is_corret_answer && wrongAns.length < current_question.answer.length - 2) {
                    wrongAns.push(index)
                }
            });

            setWrongAnswers(wrongAns)
            setLifeLines(lifeLines - 1)
            setIsfiftymodel(false)
            message.success('50-50 selected');
        }
        else {
            message.error('50-50 not selected ! Please play audio first');
        }

    }

    const submit = () => {
        if (isPlaying && !isNextActive && lifeLines > 0) {
            setIsfiftymodel(true)
        }
    }

    const onContinue = () => history.replace('/quizhome')

    const getTimerImage = () => {
        if (time <= 5) {
            return timer3
        } else if (time <= 10) {
            return timer2
        } else {
            return timer
        }
    }

    function cancel(e) {
        console.log(e);
    }

    return (
        <>
            <div className="background-blur3">
                <section className="gradient-form" >
                    <div className="container">
                        <div className="Question_page">

                            <div className="Question_page_left">
                                <div className='row mt-5'>
                                    <div className='col-md-2'></div>
                                    <div className='col-md-8'>
                                        <p className='text-center' style={{ fontSize: '40px', fontWeight: 'bolder' }}>Sample Test Question</p>
                                        <p className='text-center' style={{ fontSize: '23px', fontWeight: 'bolder' }}>Click through to learn more</p>
                                    </div>
                                    <div className='col-md-2'></div>

                                    <div className='col-md-12 reductions  lefttext-reduction  '>
                                        <Popconfirm
                                            title="Are you sure Use 50-50 ?"
                                            onConfirm={() => _useLifeLine()}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                            disabled={wrongAnswers.length}
                                        >
                                            <p>50-50 &nbsp;<span>{lifeLines}</span></p>
                                        </Popconfirm>
                                    </div>
                                </div>

                                <div className='row mt-5'>
                                    <p className='text-center' style={{ fontSize: '30px' }}>Which bird species do you hear?</p>
                                </div>

                                <div className='row'>
                                    <div className='col-md-4 '></div>
                                    <div disabled={isNextActive} onClick={onClickPlay} className='col-md-4 text-center playbtn'>
                                        {isPlaying ?
                                            <img
                                                src={getTimerImage()}
                                                style={{ width: '90px' }}
                                                className="timer-img-fluid"
                                            />
                                            :
                                            <img
                                                src={playbutton}
                                                style={{ width: '90px', marginBottom: '2.5rem' }}
                                            />
                                        }
                                        {isPlaying ?
                                            <p className='timer text-center'>{time}</p>
                                            :
                                            <p className='timer text-center'></p>
                                        }
                                        {
                                            time <= 15 && time >= 13 ? 
                                            (<p style={{color : "#1890ff"}}>Hurry up !!! Please select your answer fast</p>) 
                                            : time <= 5 && time >= 3 ? 
                                            (<p style={{color : "red"}}>Hurry Up !!! Time is about to finish</p>) : 
                                            ""
                                        }
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
                                                            <div style={{ backgroundColor: answers[selected_question].user_ans == current_question.is_corret_answer ? 'green' : 'red', width: '100%', height: "100%" }} className="overlay"></div> : null
                                                    }
                                                    {wrongAnswers.includes(index) && <div style={{ backgroundColor: 'gray', width: '100%', height: "100%" }} className="overlay"></div>}
                                                    {isAnswerSelected && current_question.is_corret_answer == item && <div style={{ backgroundColor: 'green', width: '100%', height: "100%" }} className="overlay"></div>}
                                                </div>
                                            )
                                        }
                                        )}
                                    </div>
                                </div>

                                <div className='row mt-5'>
                                    <div className='col-md-12 form-outline text-center'>
                                        {
                                            selected_question < questions.length - 1
                                                ?
                                                <button disabled={!isNextActive} onClick={() => onClickNext()} className="nextbtn btn-success" style={{ backgroundColor: isNextActive ? null : "#9e9e9e", border: 'none' }}>
                                                    <span className="glyphicon glyphicon-next"></span> Next
                                                </button>
                                                :
                                                <button disabled={!isNextActive} onClick={() => submitAnswers()} class="submitbtn btn-info " style={{ backgroundColor: isNextActive ? null : "#9e9e9e", border: 'none' }}>
                                                    <span className="glyphicon glyphicon-next"></span> Next
                                                </button>
                                        }
                                        <Popconfirm
                                            title="Are you sure Use 50-50?"
                                            onConfirm={() => _useLifeLine()}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                            disabled={wrongAnswers.length}
                                        >
                                            <a className='singuptext' style={{ fontSize: '20px', marginLeft: '15px' }}>Use 50-50</a>
                                        </Popconfirm>
                                    </div>
                                </div>
                            </div>
                            <div className='Question_page_right check-box-area'>
                                <ul className='question_checkbox' style={{ listStyle: 'none' }}>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                    <li>
                                        <label className='custom-checkbox'>
                                            <input type="checkbox" />
                                            <b></b>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default TrialQuestion

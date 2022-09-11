import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import timer from '../../assets/images/timer.png'
import timer2 from '../../assets/images/timer2.png'
import timer3 from '../../assets/images/timer3.png'
import playbutton from '../../assets/images/play-button.png'
import playbutton1 from '../../assets/images/play-button1.png'
import resultBoard from '../../assets/images/result-board.png'
import pass from '../../assets/images/pass.png'
import fail from '../../assets/images/fail.png'
import { get_questions, setSelectedQuestion, add_progress } from '../../store/user'
import { file_url } from '../../utils/api'
import { Modal, Popconfirm, message } from 'antd';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../Auth/login.css'
import ImageModal from '../../Components/imageModal'
import VideoModal from '../../Components/videoModal'
import QuestionModal from '../../Components/questionModal'

const QuizHome = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { questions, selected_question, advertisements, selected_advertisement, selected_level, levels, addProgress } = useSelector((state) => state.user)
    const current_question = questions.length ? questions[selected_question] : null
    const [current_advertisement, setCurrentAd] = useState(null)
    const current_level = levels.filter(item => item?._id == selected_level)
    let intervalRef = useRef(null);
    const [time, setTimer] = useState(current_question?.level_id?.question_timing || 0)
    const [isNextActive, setIsNextActive] = useState(false)
    const [answers, setAnswers] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [audio, setAudio] = useState(null)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [wrongAnswers, setWrongAnswers] = useState([])
    const [lifeLines, setLifeLines] = useState(current_level[0].fifty_fifty)
    const [isReducerPrompt, setIsReducerPrompt] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isAnswerSelected, setIsAnswerSelected] = useState(false)
    const [isfiftymodel, setIsfiftymodel] = useState(false)
    const [addprogress, setAddProgress] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isImageModalVisible, setImageModalVisible] = useState(false)
    const [isVideoModalVisible, setVideoModalVisible] = useState(false)
    const [isQuestionModalVisible, setQuestionModalVisible] = useState(false)

    useEffect(() => {
    }, [isImageModalVisible, isVideoModalVisible, isQuestionModalVisible])

    useEffect(() => {
        dispatch(get_questions(selected_level))
        setLifeLines(current_level[0].fifty_fifty)
    }, [])

    useEffect(() => {
        if (questions.length) {
            setTimer(questions[0]?.level_id?.question_timing)
            dispatch(setSelectedQuestion(0))
        }
    }, [questions])

    useEffect(() => {
        if (addProgress) {
            setAddProgress(addProgress)
        }
    }, [addProgress])

    useEffect(() => {
        if (questions.length) {
            let temp = questions.map(item => { return { ans: item?.is_corret_answer, user_ans: null, fifty_fifty_used: 0 } })
            setAnswers([...temp])
            setAudio(new Audio(file_url + questions[0]?.question_file_audio))
        }
    }, [questions])

    useEffect(() => {
        if (time <= 0) {
            onSelectAnswer({ value: "not_answered" }, selected_question, false)
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
            dispatch(setSelectedQuestion(selected_question + 1))
            setIsNextActive(false)
            setTimer(questions[selected_question + 1]?.level_id?.question_timing)
            setIsPlaying(false)
            setAudio(new Audio(file_url + questions[selected_question + 1]?.question_file_audio))
        }
        advertisements.forEach(element => {
            if (element?.after == selected_question + 1) {
                setCurrentAd(element)
                if (element.type == 'image') {
                    setImageModalVisible(true)
                } else if (element.type == 'video') {
                    setVideoModalVisible(true)
                } else if (element.type == 'question') {
                    setQuestionModalVisible(true)
                }
            }
        });
    }

    const onSelectAnswer = (ans, index, shouldSelect) => {
        if (ans?.value !== 'not_answered' && wrongAnswers.includes(index)) {
            return
        }
        if (!isAnswerSelected && time < current_question?.level_id?.question_timing) {
            if (shouldSelect) {
                setSelectedAnswerIndex(index)
            }
            stopTimer()
            setIsAnswerSelected(true)
            let temp = [...answers]
            temp[selected_question] = { ...temp[selected_question], user_ans: ans?.value, fifty_fifty_used: wrongAnswers.length > 0 ? 1 : 0 }
            setAnswers([...temp])
            setIsNextActive(true)
            if (isPlaying) {
                setIsPlaying(false)
                audio?.pause();
                audio.currentTime = 0;
            }
        }
    }

    const getProgress = () => {
        let tempnum = 0
        answers.forEach(element => {
            if (element.ans == element.user_ans) {
                tempnum += 1
            }
        });
        let total = Math.round(tempnum / (answers.length) * 100);
        return total
    }

    const submitAnswers = () => {
        let percentage = getProgress()
        setWrongAnswers([])
        setSelectedAnswerIndex(null)
        let level_id = selected_level
        let progress = answers.map((item, index) => {
            return {
                question_id: questions[index]._id,
                user_ans: item.user_ans,
                correct_ans: item.ans,
                fifty_fifty_used: item.fifty_fifty_used,
                is_answer: item.user_ans == item.ans ? 1 : 0
            }
        })
        let marks_obtained = percentage
        let passed = percentage >= current_level[0].passing_grade ? 1 : 0
        setAnswers([])
        dispatch(add_progress(level_id, progress, marks_obtained, passed, setIsModalVisible.bind(this)))
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

    const onContinue = () => {
        if (addprogress.passed) {
            history.replace('/congratulationspage')
        } else {
            history.replace('/levelpage')
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

    const onSelectCorrectAnswer = () => {
        setLifeLines(lifeLines + 1)
    }

    function cancel(e) {
        console.log(e);
    }

    return (
        <>
            <ImageModal visible={isImageModalVisible} onOk={() => setImageModalVisible(false)} onCancel={() => setImageModalVisible(false)} current_advertisement={current_advertisement} />
            <VideoModal visible={isVideoModalVisible} onOk={() => setVideoModalVisible(false)} onCancel={() => setVideoModalVisible(false)} current_advertisement={current_advertisement} />
            <QuestionModal
                visible={isQuestionModalVisible}
                onOk={() => setQuestionModalVisible(false)}
                onCancel={() => setQuestionModalVisible(false)}
                current_advertisement={current_advertisement}
                onSelectCorrectAnswer={() => onSelectCorrectAnswer()}
            />
            <div className="background-blur3">
                <section className="gradient-form" >
                    <div className="container">
                        <div className="Question_page">

                            <div className="Question_page_left">
                                <div className='row mt-5'>
                                    <div className='col-md-4 '></div>
                                    <div className='col-md-4'>
                                        <p className='text-center' style={{ fontSize: '26px', fontWeight: 'bolder' }}>Question {selected_question + 1}/{questions.length}</p>
                                    </div>

                                    {/* <div className='col-md-4 reductions  centertext-reduction  '>
                                        <Popconfirm
                                            title="Are you sure Use 50-50?"
                                            onConfirm={() => _useLifeLine()}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                            disabled={wrongAnswers.length}
                                        >
                                            <p>50-50 &nbsp;<span>{lifeLines}</span></p>
                                        </Popconfirm>
                                    </div> */}
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
                                                        src={file_url + item?.option}
                                                        alt="brid1"
                                                        class="birdimage"
                                                        style={{ width: 200, height: 200, objectFit: 'contain', padding: '20px' }}
                                                    />
                                                    <p style={{ fontSize: '18px' }}>{item?.value}</p>
                                                    {
                                                        answers.length && answers[selected_question].user_ans !== null &&
                                                            selectedAnswerIndex == index ?
                                                            <div style={{ backgroundColor: answers[selected_question].user_ans == current_question.is_corret_answer ? 'green' : 'red', width: '100%', height: "100%" }} className="overlay"></div> : null
                                                    }
                                                    {wrongAnswers.includes(index) && <div style={{ backgroundColor: 'gray', width: '100%', height: "100%" }} className="overlay"></div>}
                                                    {isAnswerSelected && current_question.is_corret_answer == item?.value && <div style={{ backgroundColor: 'green', width: '100%', height: "100%" }} className="overlay"></div>}
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
                                                    <span className="glyphicon glyphicon-next"></span> Submit
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
                                            <a className='singuptext' style={{ fontSize: '20px', marginLeft: '15px' }}>Use 50-50 &nbsp;<span className='reductions-two'>{lifeLines}</span></a>
                                        </Popconfirm>
                                    </div>
                                </div>
                            </div>
                            <div className='Question_page_right check-box-area'>
                                <p style={{ fontSize: "24px" }} className="mt-3 d-lg-none pro">Progress Bar</p>
                                <ul className='question_checkbox' style={{ listStyle: 'none' }}>
                                    {answers.map((item, index) => {
                                        return (
                                            <li>
                                                <label className='custom-checkbox'>
                                                    {item?.user_ans
                                                        ?
                                                        item.ans == item?.user_ans ? <input type="checkbox" checked /> : <input type="checkbox" className='uncheck' />
                                                        :
                                                        <input type="checkbox" disabled />
                                                    }
                                                    <b></b>
                                                </label>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Modal
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className="result-model">
                <div className='result-bord text-center'>
                    <div>
                        <img src={resultBoard} alt="homepage"
                            style={{
                                width: '50%',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: '2rem 0', alignItems: 'center', flexWrap: 'wrap' }}>
                        <img src={addprogress?.passed ? pass : fail} alt="homepage"
                            style={{
                                width: '70px',
                                padding: '2rem 0rem'
                            }}
                        />
                        <h1 style={{ fontWeight: '900', margin: '0', paddingLeft: '1rem', fontSize: '30px', color: addprogress?.passed ? '#68A6F2' : '#FF7A7A' }}>{addprogress?.passed ? " Passed" : " You didn’t pass this time"}</h1>
                    </div>
                    <h3 style={{ fontWeight: '700', fontSize: '28px' }}>Result</h3>
                    <h3 style={{ fontSize: '20px' }}>{addprogress?.marks_obtained}% - {addprogress?.marks_obtained / 10} out of {questions?.length}</h3>
                    <h3 style={{ fontSize: '20px', lineHeight: '40px', textAlign: 'center' }}>{

                        addprogress?.passed
                            ?
                            `<p>Congratulations You have Passed The Early Birds Sings Badge.</p>`
                            :
                            <label>Sorry, you didn’t pass this time. Go back to the interactive bird song page to study up.
                                <a href="https://www.usabirdsongs.com/" target={"_blank"}> Click here </a>
                                to go back to the Tree Page - https://www.usabirdsongs.com/ or you can try again in 5 minutes.
                            </label>
                    }
                    </h3>
                    <div class="text-center modalbtn">
                        <button onClick={() => onContinue()} style={{ backgroundColor: addprogress?.passed ? '#68A6F2' : '#FF7A7A' }} class="btnSubmit" className="btn btn-block modal-btn fa-lg gradient-custom-2 p-2" type="button">Continue</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default QuizHome

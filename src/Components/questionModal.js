import React, { useRef, useState, useEffect } from 'react'
import { Modal } from 'antd';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from './common/toast';

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    // return hours+':'+minutes+':'+seconds;
    return minutes + ':' + seconds;
}

const QuestionModal = (props) => {
    let intervalRef = useRef(null);
    const { current_advertisement, visible } = props
    const [time, setTimer] = useState(current_advertisement?.timmer)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    useEffect(() => {
        if (visible == true) {
            setTimer(current_advertisement?.timmer)
        } else {
            resetTimer()
        }
    }, [visible])

    useEffect(() => {
        if (visible && time == current_advertisement?.timmer) {
            setTimeout(() => {
                startTimer()
            }, 1000);
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

    const resetTimer = () => {
        stopTimer()
        setTimer(0)
    }

    const _onCancel = () => {
        resetTimer()
        props.onCancel()
    }

    const _onOk = () => {
        resetTimer()
        if (selectedAnswer == null) {
            return toast.error("Please select an answer")
        }
        if (selectedAnswer == current_advertisement?.is_corret_answer) {
            props.onSelectCorrectAnswer()
            toast.success("Congratulation !!! You got 1 more 50-50 option in your test as a reward")
        } else {
            toast.error("Oops !!! Wrong Answer, Better luck next time.")
        }
        props.onOk()
    }

    const onSelectAnswer = (ans) => setSelectedAnswer(ans)

    return (
        <Modal
            className="question-modal"
            okButtonProps={{
                // disabled: time > 0,
                disabled: selectedAnswer == null,
            }}
            cancelButtonProps={{
                disabled: time > 0,
                style: { display: 'none' }
            }}
            width={'50%'}
            okText="Submit"
            closable={time <= 0}
            visible={visible} onOk={_onOk}
            onCancel={_onCancel}>
            {time > 0 && <h3 style={styles.adClose}>{time}</h3>}
            <h4>{current_advertisement?.question}</h4>
            {
                current_advertisement?.answer.map((item) => (
                    <div className='mt-3' onChange={() => onSelectAnswer(item)}>
                        <input type={"radio"} name={"ad_ques"} style={{ width: '2rem' }} value={item} />&nbsp;
                        <label>{item}</label>
                    </div>
                ))}
        </Modal>
    )
}

const styles = {
    adClose: {
        right: 10,
        fontSize: 15,
        position: "absolute",
        zIndex: 999,
        background: "white",
        height: 22,
        width: 20,
        textAlign: 'center',
        marginTop: 10,
        cursor: 'pointer'

    }
}

export default QuestionModal

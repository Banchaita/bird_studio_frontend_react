import React, { useRef, useState, useEffect } from 'react'
import { Modal } from 'antd';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { file_url } from '../utils/api';

const ImageModal = (props) => {
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

    return (
        <Modal
            className="image-modal"
            style={{
                padding: 0
            }}
            bodyStyle={{
                padding: 0
            }}
            okButtonProps={{
                disabled: time > 0,
                style: { display: 'none' }
            }}
            cancelButtonProps={{
                disabled: time > 0,
                style: { display: 'none' }
            }}
            maskClosable={false}
            width={'37%'}
            closable={false}
            visible={visible} onOk={props.onOk}
            footer={null}
            onCancel={props.onCancel}>
            {
                time > 0
                    ?
                    <div style={styles.adClose}>{time}</div>
                    :
                    <div style={styles.adClose} onClick={_onCancel}><i class="fa fa-times" aria-hidden="true"></i></div>
            }
            <img
                class="card-img-top"
                src={file_url + current_advertisement?.question_file}
            // src="http://i3.ytimg.com/vi/vr0qNXmkUJ8/maxresdefault.jpg"
            >
            </img>
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

export default ImageModal

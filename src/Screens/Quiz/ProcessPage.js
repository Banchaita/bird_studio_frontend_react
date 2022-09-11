import React from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'

const ProcessPage = () => {
    const history = useHistory();
    const { selected_level, levels } = useSelector((state) => state.user)
    const current_level = levels.filter(item => item?._id == selected_level)[0]

    return (
        <>
            <div className="background-blur2">
                <section className="gradient-form" >
                    <div className="container py-5">
                        <div className="row g-0 justify-content-center">
                            <div className="col-lg-12">
                                <div className="d-flex flex-column justify-content-center align-items-center process-text-center">
                                    <p className='intro-text mb-5' style={{ fontSize: '46px', fontWeight: 'bold' }}>Good Luck on testing your bird song identification skills</p>
                                    <p className='process-text'>
                                        Welcome to this test of your bird song skills. Some can even piece together the interactions occurring between mates, siblings, and other species, via their “call and response”.<br /><br />

                                        There are three different levels of mastery you can achieve. The purpose is to challenge yourself to correctly identify bird songs and calls from some
                                        of the most common songbirds in the United States. Each level must be completed in order to proceed to the next, and you will receive a higher level of
                                        certification for each test you pass.<br /><br />


                                        During the test, you will hear a bird song/call and then you must select the correct species. Each song will play continuously until your time is up.
                                        (You will be allotted about 20 to 30 seconds to answer for each.) You will have two opportunities to narrow down the number of multiple-choice options
                                        to make it easier to choose your answer—use them wisely! <br /><br />
                                        The table below shows the increasing difficulty levels for the selected certifications.<br />
                                    </p>
                                    <Table striped bordered hover size="xs">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '5%', textAlign: 'end' }}>Level</th>
                                                <th style={{ textAlign: 'center' }}>{current_level?.name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'end' }}>Number of questions</td>
                                                <td style={{ textAlign: 'center' }}>{current_level?.question_in_level}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'end' }}>Passing grade</td>
                                                <td style={{ width: '8%', textAlign: 'center' }}>{current_level?.passing_grade}% -{current_level?.passing_grade/10} out of {current_level?.number_of_question} </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'end' }}>Multiple choice alternatives</td>
                                                <td style={{ textAlign: 'center' }}>{current_level?.mutiple_answer_option}</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'end' }}>Time allotted per question</td>
                                                <td style={{ textAlign: 'center' }}>{current_level?.question_timing} secs</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'end' }}>Reduce options</td>
                                                <td style={{ textAlign: 'center' }}>{current_level?.fifty_fifty}X</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <button className='mt-4 process-btn' onClick={() => history.push('/quizhome')} style={{ fontSize: '12px' }}>Click here to begin <span><i class="fas fa-angle-right"></i></span></button>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

export default ProcessPage

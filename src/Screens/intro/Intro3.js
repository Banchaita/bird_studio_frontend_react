import React from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'

const Intro3 = () => {
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
                                <div className="d-flex flex-column justify-content-center align-items-center process-text-center mt-5 intro-area">
                                    <p  className='intro-text' style={{ fontSize: '46px', fontWeight: 'bold' }}>The Levels Increase in Difficulty</p>
                                    <p className='intro-subtext' style={{ fontSize: '18px' }}>The table below shows the increasing difficulty levels for the 3 certifications. </p>
                                    <Table className='mt-3' striped bordered hover size="s">
                                        <thead>
                                            <tr>
                                                <th style={{ width: '5%', textAlign: 'center' }}>Bird Song Mastery Level</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>Early Bird Sings Badge</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>Song Birder Level 2 Badge</th>
                                                <th style={{ width: '5%', textAlign: 'center' }}>Bird Song Maestro Badge</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>Number of questions</td>
                                                <td style={{ textAlign: 'center' }}>10</td>
                                                <td style={{ textAlign: 'center' }}>15</td>
                                                <td style={{ textAlign: 'center' }}>20</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>Passing grade</td>
                                                <td style={{ textAlign: 'center' }}>60% - 6 out of 10</td>
                                                <td style={{ textAlign: 'center' }}>70% - 11 out of 15</td>
                                                <td style={{ textAlign: 'center' }}>80% - 16 out of 20</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>Multiple choice alternatives</td>
                                                <td style={{ textAlign: 'center' }}>4</td>
                                                <td style={{ textAlign: 'center' }}>5</td>
                                                <td style={{ textAlign: 'center' }}>6</td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>50-50 options</td>
                                                <td style={{ textAlign: 'center' }}>2x</td>
                                                <td style={{ textAlign: 'center' }}>2x</td>
                                                <td style={{ textAlign: 'center' }}>2x</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <p className='mt-5' style={{ fontSize: '18px' }}>Remember, you must pass each certification level in order before moving to the next level. </p>
                                    <div className="col-md-4 text-center mt-5">
                                        <a onClick={() => history.push('/trialpage1')} style={{ fontWeight: 'bold', fontSize: '18px', color: '#68a6f2' }}>Click here to begin!</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

export default Intro3

import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import background1 from '../../assets/images/background1.png'

import './login.css'

const BeginPage = () => {
  const history = useHistory();

  return (
    <>
      <div className='background1'>
        <section className="gradient-form" >
          <div className="container py-5">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="row g-0">
                <div className="col-lg-6 mx-auto">
                  <div className="card-body">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      <button className='home-button' style={{ marginTop: '80vh' }} onClick={() => history.push('/login')}>Click here to begin <span><i class="fas fa-angle-right"></i></span></button>
                    </div>
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

export default BeginPage

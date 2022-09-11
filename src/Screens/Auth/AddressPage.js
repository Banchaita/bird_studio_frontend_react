import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { getStates, get_countries, getCities, setSelectedCountry, setSelectedState, setSelectedCity, add_address } from '../../store/address'
import toast from "../../Components/common/toast"
import { useDispatch, useSelector } from 'react-redux'
import './login.css'

const AddressPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [years, setYears] = useState('')
    const { countries, states, cities, selected_country, selected_state, selected_city } = useSelector((state) => state.address)
    const onSelectCountry = (e) => {
        let country = e.target.value
        dispatch(setSelectedCountry(country))
        dispatch(getStates(country))
    }
    const onSelectState = (e) => {
        let state = e.target.value
        dispatch(setSelectedState(state))
        dispatch(getCities(selected_country, state))
    }
    const onSelectCity = (e) => {
        dispatch(setSelectedCity(e.target.value))
    }
    const handleClick = async () => {
        if (selected_country === null || selected_state === null || selected_city === null || years.trim() === "") {
            toast.error("Please Enter All Required Fields")
            return false;
        }
        let data = {
            country: selected_country,
            state: selected_state,
            city: selected_city,
            startingyear: years,
        }
        dispatch(add_address(data, history))
    }

    return (
        <>
            <div className="background-blur"></div>
            <div className='bg-text'>
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className=" startform px-5">
                            <a target='_blank' href={"https://www.clearviewbirds.com"}>
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{ width: '50%' }}
                                    className="start-img-fluid mt-3 mb-3"
                                />
                            </a>
                            <p style={{ fontSize: '27px', fontWeight: 'bold' }}>Welcome! We see this is your first attempt to achieve your bird song certification. Good luck!</p>
                            <form className='seletion-from'>
                                <div className="form-outline mb-4 mt-5" style={{ textAlign: 'left' }}>
                                    <label  style={{ fontSize: '18px' }}>Select country</label>
                                    <select onChange={onSelectCountry} id="country" class="form-control mt-2">
                                        <option disabled selected value> select country </option>
                                        {countries.map((item, index) => <option value={item.isoCode}>{item?.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-outline  mb-4 mt-2" style={{ textAlign: 'left' }}>
                                    <label style={{ fontSize: '18px' }}>Select state</label>
                                    <select onChange={onSelectState} id="state" class="form-control mt-2">
                                        <option disabled selected value> select state </option>
                                        {states.map((item, index) => <option value={item.isoCode}>{item?.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-outline mb-4 mt-2" style={{ textAlign: 'left' }}>
                                    <label style={{ fontSize: '18px' }}>Select city</label>
                                    <select onChange={onSelectCity} id="city" class="form-control mt-2">
                                        <option disabled selected value> select city </option>
                                        {cities.map((item, index) => <option value={item.isoCode}>{item?.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-outline mb-4 mt-2" style={{ textAlign: 'left' }}>
                                    <label className='yeartext' style={{ fontSize: '18px' }}>How many years have you been birdwatching?</label>
                                    <input type="number" onChange={(e) => setYears(e.target.value)} class="form-control mt-2" placeholder="birding years" />
                                </div>
                                <div className="text-center pt-1 mb-5 pb-1">
                                    <button onClick={() => handleClick()} className="btn btn-block fa-lg gradient-custom-2 mb-3 p-3 btnsubmit" type="button">Continue</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressPage

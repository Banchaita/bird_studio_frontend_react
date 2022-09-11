import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { setLoading } from "./auth";

let countryData = [
    {
        isoCode: "US",
        name: "United States",
    },
    {
        isoCode: "CA",
        name: "Canada",
    },
    {
        isoCode: "MX",
        name: "Mexico",
    },
]

const addressSlice = createSlice({
    name: 'address',
    initialState: {
        countries: [...countryData],
        selected_country: null,

        states: [],
        selected_state: null,

        cities: [],
        selected_city: null,
    },
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload;
        },
        setSelectedCountry: (state, action) => {
            state.selected_country = action.payload;
        },

        setStates: (state, action) => {
            state.states = action.payload;
        },
        setSelectedState: (state, action) => {
            state.selected_state = action.payload;
        },

        setCities: (state, action) => {
            state.cities = action.payload;
        },
        setSelectedCity: (state, action) => {
            state.selected_city = action.payload;
        },
    }
})

export const { setCountries, setSelectedCountry, setStates, setSelectedState, setCities, setSelectedCity } = addressSlice.actions

export const get_countries = () => async dispatch => {
    try {
        dispatch(setLoading(true))
        let countryResponse = await api.post('user/get_address', { address: "country", country: "", state: "" })
        if (countryResponse.data.status) {
            dispatch(setCountries(countryResponse.data.data))
        }
    } catch (e) {
        return console.error("getCountries ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const getStates = (country) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let stateResponse = await api.post('user/get_address', { address: "state", country: country, state: "" })
        if (stateResponse.data.status) {
            dispatch(setStates(stateResponse.data.data))
        }
    } catch (e) {
        return console.error("getStates ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const getCities = (country, state) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let cityResponse = await api.post('user/get_address', { address: "city", country: country, state: state })
        console.log(cityResponse)
        if (cityResponse.data.status) {
            dispatch(setCities(cityResponse.data.data))
        }
    } catch (e) {
        return console.error("getCities ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const add_address = (data, history) => async dispatch => {
    try {
        const { country, state, city, startingyear } = data
        dispatch(setLoading(true))
        let add_addressResponse = await api.post('user/addlocation', { country, state, city, startingyear })
        if (add_addressResponse.data.status) {
            history.push('/welcomepage')
        }
    } catch (e) {
        return console.error(e);
    } finally {
        dispatch(setLoading(false))
    }
}

export default addressSlice.reducer
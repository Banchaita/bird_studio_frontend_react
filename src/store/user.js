import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";
import { get_user_detail, setLoading } from "./auth";
import toast from "../Components/common/toast"

const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : null

const userSlice = createSlice({
    name: 'user',
    initialState: {
        levels: [],
        selected_level: null,

        questions: [],
        selected_question: 0,

        advertisements: [],
        selected_advertisement: 0,

        progress: null,
        addProgress: null
    },
    reducers: {
        setLevels: (state, action) => {
            state.levels = action.payload;
        },
        setSelectedLevel: (state, action) => {
            state.selected_level = action.payload;
        },

        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setAdvertisements: (state, action) => {
            state.advertisements = action.payload;
        },
        setSelectedQuestion: (state, action) => {
            state.selected_question = action.payload;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setAddProgress: (state, action) => {
            state.addProgress = action.payload;
        }
    }
})

export const { setLevels, setSelectedLevel, setQuestions, setAdvertisements, setSelectedQuestion, setProgress, setAddProgress } = userSlice.actions

export const get_levels = () => async dispatch => {
    try {
        dispatch(setLoading(true))
        let levelResponse = await api.post('levels/get_all_level_web', {}, { headers: { Authorization: `Bearer ${initialToken}` } })
        if (levelResponse.data.status) {
            dispatch(setLevels(levelResponse.data.data))
        }
    } catch (e) {
        return console.error("getLevels ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const get_questions = (level_id) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let questionResponse = await api.post('question/get_question_by_level', { level_id })
        if (questionResponse.data.status) {
            dispatch(setQuestions(questionResponse.data.data))
            dispatch(setAdvertisements(questionResponse.data.other))
        }
    } catch (e) {
        return console.error("getQuestions ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const check_progress = (level_id, history) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let progressResponse = await api.post('progress/check_progress', { level_id })
        if (progressResponse.data.status) {
            dispatch(setSelectedLevel(level_id))
            dispatch(setProgress(progressResponse.data?.data))
            history.push('/processpage')
        }else{
            toast.error(progressResponse.data.message)
        }
    } catch (e) {
        return console.error("check_progress ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export const add_progress = (level_id, progress, marks_obtained, passed, setIsModalVisible) => async dispatch => {
    try {
        dispatch(setLoading(true))
        let progressResponse = await api.post('progress/add_progress', { level_id, progress, marks_obtained, passed }, { headers: { Authorization: `Bearer ${initialToken}` }} )
        if (progressResponse.data.status) {
            dispatch(setAddProgress(progressResponse.data?.data))
            dispatch(get_levels())
            dispatch(get_user_detail())
            setIsModalVisible(true)
        }
    } catch (e) {
        return console.error("add_progress ==> ", e);
    } finally {
        dispatch(setLoading(false))
    }
}

export default userSlice.reducer
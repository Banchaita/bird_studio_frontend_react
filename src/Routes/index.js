import React, { useEffect } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import LoadingOverlay from 'react-loading-overlay'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logout } from '../store/auth'
import {
    Intro1,
    Intro2,
    Intro3,
    TrialPage1,
    TrialPage2,
    TrialPage3,
    TrialPage4,
    TrialPage5,
    TrialPage6,
    TrialPage7,
    TrialPage8,
    TrialQuestion,

    BeginPage,
    Login,
    ForgotOtp,
    ChangePassword,
    Signup,
    Otp,
    AddressPage,
    WelcomePage,
    BeginTextPage,
    LevelPage,
    ProcessPage,
    QuizHome,
    Congratulationspage,
    SocialMediaPost
} from "../Screens"
import { setAuth } from '../store/auth'

const Routes = () => {
    const { isloading, isAuth, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const history = useHistory();

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = () => {
        const initialToken = localStorage.getItem('token') ? localStorage.getItem('token') : null
        if (initialToken) {
            dispatch(setAuth(true))
        }
    }

    const handleLogout = () => {
        dispatch(logout())
        history.push('/login')
    }

    console.log("is_email_verified========>", user?.is_email_verified)

    // if (user?.is_email_verified == 0) {
    //     return (
    //         <LoadingOverlay active={isloading} spinner>
    //             <view style={{ position: 'absolute', zIndex: 100, right: 20, top: 20 }}>
    //                 <div className='logout'>
    //                     <p onClick={() => handleLogout()}>Logout <i class="fas fa-sign-out-alt"></i></p>
    //                 </div>
    //             </view>
    //             <Router>
    //                 <Switch>
    //                     <Route exact={true} path="/otp" component={Otp} />
    //                 </Switch>
    //             </Router>
    //         </LoadingOverlay>
    //     )
    // }
    if (isAuth && user?.is_email_verified == 0) {
        return (<LoadingOverlay active={isloading} spinner>
            <view style={{ position: 'absolute', zIndex: 100, right: 20, top: 20 }}>
                <div className='logout'>
                    <p onClick={() => handleLogout()}>Logout <i class="fas fa-sign-out-alt"></i></p>
                </div>
            </view>
            <Router>
                <Switch>
                    <Route exact={true} path="/otp" component={Otp} />
                    <Redirect to={"/otp"} />
                </Switch>
            </Router>
        </LoadingOverlay>)
    } else if (isAuth) {
        return (
            <LoadingOverlay active={isloading} spinner>
                <view style={{ position: 'absolute', zIndex: 100, right: 20, top: 20 }}>
                    <div className='logout'>
                        <p onClick={() => handleLogout()}>Logout <i class="fas fa-sign-out-alt"></i></p>
                    </div>
                </view>
                <Router>
                    <Switch>
                        <Route exact={true} path="/otp" component={Otp} />

                        <Route exact={true} path="/" component={LevelPage} />
                        <Route exact={true} path="/addresspage" component={AddressPage} />
                        <Route exact={true} path="/welcomepage" component={WelcomePage} />
                        <Route exact={true} path="/begintextpage" component={BeginTextPage} />
                        <Route exact={true} path="/levelpage" component={LevelPage} />
                        <Route exact={true} path="/processpage" component={ProcessPage} />
                        <Route exact={true} path="/quizhome" component={QuizHome} />
                        <Route exact={true} path="/congratulationspage" component={Congratulationspage} />
                        <Route exact={true} path="/socialmediapost" component={SocialMediaPost} />
                        <Redirect to={"/levelpage"} />
                    </Switch>
                </Router>
            </LoadingOverlay>
        )
    } else {
        return (
            <LoadingOverlay active={isloading} spinner>
                <Router>
                    <Switch>
                        <Route exact={true} path="/" component={Intro1} />
                        <Route exact={true} path="/intro1" component={Intro1} />
                        <Route exact={true} path="/intro2" component={Intro2} />
                        <Route exact={true} path="/intro3" component={Intro3} />
                        <Route exact={true} path="/trialpage1" component={TrialPage1} />
                        <Route exact={true} path="/trialpage2" component={TrialPage2} />
                        <Route exact={true} path="/trialpage3" component={TrialPage3} />
                        <Route exact={true} path="/trialpage4" component={TrialPage4} />
                        <Route exact={true} path="/trialpage5" component={TrialPage5} />
                        <Route exact={true} path="/trialpage6" component={TrialPage6} />
                        <Route exact={true} path="/trialpage7" component={TrialPage7} />
                        <Route exact={true} path="/trialpage8" component={TrialPage8} />
                        <Route exact={true} path="/trialquestion" component={TrialQuestion} />
                        <Route exact={true} path="/socialmediapost" component={SocialMediaPost} />

                        <Route exact={true} path="/beginpage" component={BeginPage} />
                        <Route exact={true} path="/login" component={Login} />
                        <Route exact={true} path="/forgot_otp" component={ForgotOtp} />
                        <Route exact={true} path="/change_password" component={ChangePassword} />
                        <Route exact={true} path="/signup" component={Signup} />
                        <Redirect to={"/login"} />
                    </Switch>
                </Router>
            </LoadingOverlay>
        )
    }
}

export default Routes
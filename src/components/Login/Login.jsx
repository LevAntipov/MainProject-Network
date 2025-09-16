import React from 'react';
import { login, logout } from './../../redux/authReducer'
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { LoginForm } from './LoginForm';
import styles from './Login.module.css'

import { authAPI } from '../../api/api';

const Login = ({login,isAuth,validationMessage,captchaUrl}) => {

    return (<div>
        <h1 className={styles.loginItem}>Login</h1>
        {isAuth
            ? <Navigate to='/profile' replace />
            : <LoginForm login={login} validationMessage ={validationMessage} captchaUrl={captchaUrl}/>}
    </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        validationMessage: state.auth.validationMessage,
        captchaUrl:state.auth.captchaUrl
    }

}

export default connect(mapStateToProps, { login, logout })(Login)

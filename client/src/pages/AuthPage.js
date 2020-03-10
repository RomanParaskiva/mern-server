import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";


const AuthPage = () =>{
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, error, request, clearError} = useHttp();
    const[form, setForm]  = useState({
         password: '', email: ''
    });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form});
            message(data.message);
        } catch (e) { }
    };
    const loginHandler = async () => {
        try {
            const data = await request('api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId, data.isAdmin)
        } catch (e) { }
    }
    return  (
            <div className="auth_container black-text">
                <div className="card">
                    <div className="card-content">
                        <h2 className="card-title center-align">Sign up / Sign in</h2>
                        <div className="mt">
                            <div className="input-field">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="validate"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    type="password"
                                    className="validate black-text"
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>



                    <div className="card-action">
                        <button
                            className="btn blue waves-orange darken-2 white-text mr"
                            onClick={registerHandler}
                            disabled={loading}
                        >Sign up
                        </button>
                        <button
                            className="btn  amber lighten-2 black-text mr"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
    )
};

export default AuthPage;
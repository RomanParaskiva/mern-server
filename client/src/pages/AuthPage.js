import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";


const AuthPage = () =>{
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading,error,request,clearError} = useHttp();
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
        <div className="row">
            <div className="col l6 m12 s12 offset-l3">
                <div className="card purple lighten-2">
                    <div className="card-content black-text">
                        <h2 className="card-title">Sign up / Sign in</h2>
                        <div className="mt">
                            <div className="input-field ">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="validate"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email" className="black-text">Email</label>
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
                                <label htmlFor="password" className="black-text">Password</label>
                            </div>
                        </div>
                    </div>



                    <div className="card-action">
                        <button
                            className="btn blue-grey darken-2 white-text mr"
                            onClick={registerHandler}
                            disabled={loading}
                        >Sign up
                        </button>
                        <button
                            className="btn grey darken-2 mr"
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AuthPage;
import React , {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import  { Redirect } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import "../css/login.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(clearMessage());
    },[dispatch]);

    const initialValues = {
        username:"",
        password:"",
    };
    const validationSchema = Yup.object().shape({
        username:Yup.string().required("This field is required"),
        password:Yup.string().required("This field is required"),
    });
    const handleLogin = (formValue) => {
        const { username, password } = formValue;
        setLoading(true);

        dispatch(login({username,password}))
        .then((res) => {
            let message = res.error?'Credentials Mismatched':'Kindly Refresh the Screen';
            toast(message);
            if(!res.error) {
                <Redirect to="/profile"/>;
            }
            setLoading(false);
        });
    };
    if(isLoggedIn){
        return <Redirect to="/profile"/>;
    }
    return (
        <div className="col-md-12 login-form">
            <div className="box">
                <ToastContainer />
                <div className="graphic1"></div>
                <div className="graphic2"></div>
                <div className="graphic3"></div>
                <div className="graphic4"></div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">UserName</label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage 
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage 
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>
                        <div className="form-group button">
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                    </Form>
                </Formik>
                <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
            </div>
            {/* {message && (<div className="form-group">
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
                </div>
                )} */}
        </div>
    );
}
export default Login;
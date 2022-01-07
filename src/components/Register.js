import React,{ useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form , ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../slices/auth";
import { clearMessage } from "../slices/message";

const Register = (props) => {
    const [successful,setSuccessful] = useState(false);
    const { message } = useSelector((state)=>state.message);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(clearMessage());
    },[dispatch]);

    const initialValues = {
        username : "",
        email : "",
        password : "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .test(
            "len",
            "The username must be between 3 and 20 characters.",
            (val) => val && val.toString().length >= 3 && val.toString().length <=20
        )
        .required("This Field is Required"),
        email: Yup.string()
        .email("This is not a valid email")
        .required("This Field is Required"),
        password: Yup.string()
        .test(
            "len",
            "The Password must be between 6 and 20 characters.",
            (val)=> val && val.toString().length >= 6 && val.toString().length <=20
        )
        .required("This Field is Required"),
    });

    const handleRegister = (formValue) => {
        const { username, email, password } = formValue;

        setSuccessful(false);

        dispatch(register({username,email,password}))
        .unwrap().then(()=>{
            setSuccessful(true);
            props.history.push("/profile");
            window.location.reload();
        })
        .catch(()=>{
            setSuccessful(false);
        });
    };

    return (
            <div className="col-md-12 signup-form">
        <div className="card card-container">
            <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
            />
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
            >
            <Form>
                {!successful && (
                <div>
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                        name="username"
                        component="div"
                        className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                        name="password"
                        type="password"
                        className="form-control"
                    />
                    <ErrorMessage
                        name="password"
                        component="div"
                        className="alert alert-danger"
                    />
                    </div>

                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>
                )}
            </Form>
            </Formik>
        </div>

        {message && (
            <div className="form-group">
            <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
            >
                {message}
            </div>
            </div>
        )}
        </div>

    );
};

export default Register;
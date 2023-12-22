"use client"
import { useDeferredValue, useState } from 'react';
import Head from 'next/head';
import registrationStyles from '../style/Registration.module.css'; // Import styles from RegistrationPage module
import Grid from '@mui/material/Grid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import * as yup from "yup";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import style from '../style/Registration.module.css'

const theme = createTheme();
export default function Registration() {
    const router = useRouter()
    const [valid, setValid] = useState(false)
    const [userin, setUserin] = useState()
    const [usermail, setUsermail] = useState(false)

    const userRegister = yup.object().shape({
        firstName: yup.string().required("This field is required"),
        lastName: yup.string().required("This field is required"),
        mob: yup.number().min(999999999, "less than 10 numbers").max(12345678900, "10 number exceeded").required(),
        email: yup.string().email("Enter a valid email").required("This field is required"),
        password: yup.string().min(6, "too short password").required('password required'),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null!], 'Passwords must match').required()
    })

    const initialValues = {
        firstname: '',
        lastName: '',
        mob: '',
        email: '',
        password: '',
        confirmpassword: ''

    }
    let Submit = async (values: any, props: any) => {
        const userVal = {
            firstName: values.firstName,
            lastName: values.lastName,
            mob: values.mob,
            email: values.email,
            password: values.password,
            confirmpassword: values.confirmpassword
        }
        console.log(userVal);
        const response = await axios.post("/api/registration", userVal)
        console.log(response);

        if (response.data.success) {
            setValid(true)
            setUsermail(false)

            router.push('/Moredetails')

        }
        else {
            setValid(false)
            setUsermail(true)

        }

    }






    return (
        <div className={registrationStyles.registrationContainer}>


            <Head>
                <title style={{ color: "black" }}>RegistrationPage</title>
                <link rel="stylesheet" href="/styles/Registration.module.css" />
            </Head>

            <div className={style.registrationForm}>
                <h2 style={{color:'grey'}}>REGISTRATION FORM</h2>
                <Formik initialValues={initialValues} validationSchema={userRegister} onSubmit={Submit}>
                    {
                        (props) => (
                            <Form>
                                {valid ? <Alert severity="success">Registered Succesfully!!!</Alert> : ''}
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        {userin ? <Alert severity="error" sx={{ borderRadius: "10" }}> User Already Registered !</Alert> : ''}
                                        <Grid item xs={12} sm={6}>
                                            < Field as={TextField}
                                                autoComplete="given-name"
                                                name="firstName"

                                                fullWidth
                                                id="firstName"
                                                label="First Name *"
                                                autoFocus
                                                helperText={<ErrorMessage name="firstName" />}
                                            />

                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                id="lastName"
                                                label="Last Name *"
                                                name="lastName"
                                                autoComplete="family-name"
                                                helperText={<ErrorMessage name="lastName" />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                id="mob"
                                                label="Enter Mobile Number with country Code *"
                                                name="mob"
                                                autoComplete="mob"
                                                helperText={<ErrorMessage name="mob" />}
                                            />
                                            {usermail ? <Alert severity="error" sx={{ borderRadius: "10" }}> This email and phone number Already Existed</Alert> : ''}
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                id="email"
                                                label="Email Address *"
                                                name="email"
                                                autoComplete="email"
                                                helperText={<ErrorMessage name="email" />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                name="password"
                                                label="Password*"
                                                type="password"
                                                id="password"
                                                helperText={<ErrorMessage name="password" />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                name="confirmpassword"
                                                label="Re-Enter Password *"
                                                type="password"
                                                id="confirmpassword"
                                                helperText={<ErrorMessage name="confirmpassword" />}
                                            />
                                        </Grid>
                                        

                                    </Grid>
                                    {valid ? '' : <Alert severity="error" sx={{ borderRadius: "10" }}> Fill Out All Star Fields !</Alert>}
                                    <Button
                                        className={style.loginButton}
                                        type="submit"

                                        variant="contained"

                                    >
                                        Register
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <link>
                                            </link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Form>
                        )
                    }
                </Formik>
                <p className={registrationStyles.message}>
                    Already have an account?
                    <button onClick={() => {
                        router.push('/login')
                    }} className={registrationStyles.signupButton}>
                        Login
                    </button>
                </p>
            </div>



        </div>
    );
}

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
export default function Personal() {
    const router = useRouter()
    const [valid, setValid] = useState(false)
    const [userin, setUserin] = useState()
    const [usermail, setUsermail] = useState(false)

    const userRegister = yup.object().shape({
        DateOfBirth: yup.date().required("This field is required"),
        currentaddress: yup.string().required("This field is required"),
        petname: yup.string().required("This field is required"),
        status: yup.string().required("This field is required"), 
        hobby: yup.string().required("This field is required"),
        
    })

    const initialValues = {
        DateOfBirth: '',
        currentaddress: '',
        petname: '',
        status: '',
        hobby: '',
      

    }
    let Submit = async (values: any, props: any) => {
        const userVal = {
            DateOfBirth: values.DateOfBirth,
            currentaddress: values.currentaddress,
            petname: values.petname,
            status: values.status,
            hobby: values.hobby,
        }
        console.log(userVal);
        // const response = await axios.post("/api/registration", userVal)
       

        if (true) {
            setValid(true)
            setUsermail(false)

           
        }
        else {
            setValid(false)
            setUsermail(true)

        }

    }






    return (
        <div className={registrationStyles.registrationContainer}>


            <Head>
                <title style={{ color: "black" }}>Personal Information</title>
                <link rel="stylesheet" href="/styles/Registration.module.css" />
            </Head>

            <div className={style.registrationForm}>
                <h2 style={{color:'grey'}}> FORM</h2>
                <Formik initialValues={initialValues} validationSchema={userRegister} onSubmit={Submit}>
                    {
                        (props) => (
                            <Form>
                                {valid ? <Alert severity="success">Added Information Succesfully!!!</Alert> : ''}
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        {userin ? <Alert severity="error" sx={{ borderRadius: "10" }}> User Already Registered !</Alert> : ''}
                                        <Grid item xs={12} sm={6}>
                                            < Field as={TextField}
                                                autoComplete="given-name"
                                                name="DateOfBirth"
                                                type ='date'
                                                fullWidth
                                                id="date"
                                                label="Date of Birth *"
                                                autoFocus
                                                helperText={<ErrorMessage name="Date-Of-Birth" />}
                                            />

                                        </Grid>
                                        <Grid style={{width:"50%"}} item xs={12} sm={4}>
                                            < Field as={TextField}

                                                type="text"
                                                id="currentaddress"
                                                label="current address *"
                                                name="currentaddress"
                                                autoComplete="family-name"
                                                helperText={<ErrorMessage name="lastName" />}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                id="howlong"
                                                label="How long have you lived at this address?"
                                                name="howlong"
                                                autoComplete="mob"
                                                helperText={<ErrorMessage name="howlong" />}
                                            />
                                            {usermail ? <Alert severity="error" sx={{ borderRadius: "10" }}> This email and phone number Already Existed</Alert> : ''}
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                id="petname"
                                                label="Pet Name?"
                                                name="petname"
                                              
                                                helperText={<ErrorMessage name="petname" />}
                                            />
                                        </Grid>
                                        <Grid  item xs={12} sm={4}>
                                            < Field  as={TextField}

                                                fullWidth
                                                name="status"
                                                label="Current status *"
                                                
                                                id="status"
                                                helperText={<ErrorMessage name="status" />}
                                            />
                                        </Grid>
                                        <Grid style={{width:"50vw",height:"10vh"}} item xs={12} sm={4}>
                                            < Field as={TextField}

                                                fullWidth
                                                name="hobby"
                                                label="Hobbies? let's know!"
                                                style={{width:"50vw",height:"50%"}}
                                                id="hobby"
                                                helperText={<ErrorMessage name="hobby" />}
                                            />
                                        </Grid>

                                    </Grid>
                                    {valid ? '' : <Alert severity="error" sx={{ borderRadius: "10" }}> Fill Out All Star Fields !</Alert>}
                                    <Button
                                        className={style.loginButton}
                                        type="submit"

                                        variant="contained"

                                    >
                                       Update
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

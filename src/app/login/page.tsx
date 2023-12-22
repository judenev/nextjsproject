"use client"
import { useState } from 'react';
import Head from 'next/head';
import style from '../style/LoginForm.module.css'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { setToken } from '@/Redux/features/userAuthSlice';


export default function LoginForm() {
   
    const dispatch =useDispatch()
    const router =useRouter()
    const [found,setFound]=useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Signup details:', formData);
        // Handle signup logic here (e.g., send data to server)
        const userData =formData
        const resp = await axios.post('/api/login',userData)
        console.log("response login",resp.data.token);
        if(resp.data.found){
            dispatch(setToken(resp.data.token))
            setFound(false)
            router.push('/home')
        }else{
            setFound(true)
        }
        

    };

    return (
        <div className={style.signupContainer}>
            <Head>
                <title >Signup Page</title>
                <link rel="stylesheet" href="/styles.css" />
            </Head>
            <h2 style={{ color: 'black' }}>Sign Up</h2>
            <div style={{ display: 'flex' }}>
            {found ? <Alert severity="error" sx={{ borderRadius: "10" }}> User Not found Please Register!</Alert> : ''}


                <form className={style.signupForm} onSubmit={handleSubmit}>

                    <input
                        style={{ color: "black" }}
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        style={{ color: "black" }}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button className={style.signupButton} type="submit">Sign Up</button>
                </form>
            </div>
            <p style={{color:'black'}}>
                Don't have an account please register!!
            </p>
            
                <Button onClick={()=>{
                    router.push('/registration')
                }} >
                    Register
                </Button>

        </div>
    );
}

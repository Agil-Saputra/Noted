import React, { useContext, useState } from 'react'
import { Box, TextField, Button, Container, Typography, Divider, IconButton, InputAdornment, Icon, Link, Alert } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword , signInWithPopup } from '@firebase/auth'
import { AuthContext } from "../context/authContext";
import { auth, provider } from '../config/client';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Google from '../assets/logos_google-icon.svg';
import logo from "/Group 1.svg"


export default function login() {
  const [showPwd, setShowPwd] = useState(false)
  const [errorCode, setErrorCode] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  async function signIn(email, password) {
      await  signInWithEmailAndPassword (auth, email, password)
     .then((userCredential) => {
       const user = userCredential.user;
       navigate('/home')
       dispatch({type: "LOGIN", payload:user})
     })
     .catch((err) => {
       setErrorCode(err.code)
       // ..
     });
  }

  console.log(errorCode);

  function errorHandle() {
    switch(errorCode){
      case('auth/user-not-found'): {
        return <Alert severity="error" sx={{placeSelf: 'start', px: 1, mb : 1, }}>User-not-found! please Login with another Acccount or create new one.</Alert>
      }
      case('auth/wrong-password'): {
        return <Alert severity="error" sx={{placeSelf: 'start', px: 1, mb : 1, }}>Something went Wrong! please Check your Email & Password</Alert>
      }
      case ('auth/network-request-failed') : {
        return <Alert severity="error" sx={{placeSelf: 'start', px: 1, mb : 1, }}>Network Error! please check your internet connection</Alert>
      }
      default :{
       return null
      }
    }
  }



  async function signInWithGoogle() {
     await signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        dispatch({type: "LOGIN", payload:user})
        navigate('/home')
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      }); 
  }

  function handleShowPwd() {
    setShowPwd(!showPwd)
  }

  return (
  <Container
  sx={{
      display: 'grid',
      placeItems : 'center',
      // mt: '10rem'
      minHeight: '100vh'
    }}>
      <Box 
      component="form" 
      sx={{
      display: 'grid',
      placeItems : 'center',
      width: {xs: '95%', sm:'25rem'},
      // bgcolor: 'primary.main',
      // padding: '4rem',
      // color: '#fff'
     
    }} 
      onSubmit={handleSubmit((data) => {
      signIn(data.email, data.password)
      })}
      >
  
      <Box sx={{
        mb: '2rem',
        placeSelf: 'start'
      }}>
      <Box 
        component="img"
        src={logo}
        width={70}
        height={70}
      />
      <Typography sx={{mt: 2, fontSize: {xs: '1.6rem', sm: '2.125rem'} }}>Welcome back!</Typography>
      <Typography variant='subtitle2'>Enter to get unlimited access to data & information.</Typography>
      </Box>
      {
        errorHandle()
      }
      <TextField
        label="Your Email"
        variant="outlined"
        fullWidth
        sx={{ 
          mb: 3,
          }}
        {...register("email", { 
        required : "Please, add your Email!", 
        pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Whoops, make sure it's an email"
          }}
        )}
        error={!!errors.email}
        helperText={errors.email && errors.email.message}
        />

      <TextField
        label="Your Password"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        {...register('password', { 
        required : "Add Your Password",
        pattern: {
          value : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
          message : "Minimum 8 Characters with Uppercase and Special character"
        },
        
         })}
        type={showPwd ? "text" : "password"}
        error={!!errors.password}
        helperText={errors.password && errors.password.message}
        InputProps={{endAdornment: (
        <InputAdornment position="end">
         <IconButton onClick={handleShowPwd}>
         {
          showPwd ? <VisibilityIcon/> : <VisibilityOffIcon/>
         }
         </IconButton>
        </InputAdornment>
        )}}
      />

<Button 
type='submit'
variant='contained'
fullWidth
>Sign In</Button>
<Divider sx={{
  width: '100%',
  my: 2,
  fontFamily: 'poppins',
  fontSize: '13px'
  }}>Or, Login with</Divider>
<Button 
variant='outlined'
fullWidth
sx={{
  p:1
}}
onClick={signInWithGoogle}
startIcon={
  <Icon
  sx={{
    width: '100%',
    height: '100%',
    fontSize: 0
  }}
  >
  <Box
    component='img'
    src={Google}
    width={20}
    height={20}
  />
    </Icon>
}
>Sign in With Google
</Button>

<Typography sx={{
  my: 2
}}>
Don't have an account? <Link href='/signup' underline='always'>Register here</Link>
</Typography>
    </Box>
  </Container>
  )
}

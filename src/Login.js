import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStylesInputs = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '95%',
      },
    },
}));

const useStylesButtons = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const Login = (props) => {

    const classes = useStylesInputs();

    const{email,setEmail,password,setpassword,handleLogin,hasAccount,setHasAccount,emailError,passwordError,handleSignUp} = props;
    return(
        <section className="login">

            <div className="loginContainer">

                <form className={classes.root} noValidate autoComplete="off">
                    <TextField className="outlined-basic" label="Username" variant="outlined" value={email} onChange={e => setEmail(e.target.value)}/>

                    <p classname="errorMsg">{emailError}</p>

                    <TextField className="outlined-basic" label="Password" type="password" variant="outlined" value={password} onChange={e => setpassword(e.target.value)}/>

                    <p className="errorMsg">{passwordError}</p>
                </form>
                

                <div className="btnContainer">


                    {hasAccount ? (
                        <>

                            <Button 
                                variant="outlined"
                                color="secondary"
                                component="label"
                                className="SignInUp"
                            >   
                                Sign In
                                <button className="loginButton" onClick={handleLogin} hidden>Sign in</button>
                            </Button>
                        

                        <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                        </>
                    ):(
                        <>
                        <Button 
                            variant="outlined"
                            color="secondary"
                            component="label"
                            className="SignInUp"
                            
                        >  Sign Up
                            <button  className="loginButton" onClick={handleSignUp} hidden>Sign up</button>
                        </Button>
                        <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}




                </div>
            </div>
        </section>
    )
}

export default Login;
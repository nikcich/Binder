import React, {useState, useEffect } from "react";
import fire from './fire';
import {storage} from'./fire';
import './App.css';
import Login from './Login';
import Hero from './Hero';
import Settings from './Settings';

function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [list, setList] = useState([]);
  const [image, setImage] = useState(null);
  const [pages, setPages] = useState('');

  const ref = fire.firestore().collection("usersList");
  const imgRef = fire.firestore().collection("images");
  //db.collection("cities").doc("new-city-id").set(data);
    

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${user.uid}/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images/${user.uid}/`)
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            imgRef.doc(user.uid).set({img: url, right: 0, left: 0, user: user.uid});
          });
      }
    )
  }

  const fileChange = e => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    setPages('');
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleSignUp = () => {
    setPages('');
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  }

  const handleLogout = () => {
    fire.auth().signOut();
    setPages('');
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user =>{
      if(user){
        clearInputs();
        setUser(user);
        ///////////////////////////////////// lol this works
        let obj = {id:user.uid, email:user.email};
        if(!list.includes(obj)){
          ref.doc(user.uid).set({id:user.uid, email:user.email});
        }
        ///////////////////////////////////// lol this works

      }else{
        setUser('');
      }
    });
  }

  useEffect(() => {
    authListener();
  }, [])

  // if(user && pages=="Settings"){
  //   return(
  //     <>
  //     <Settings handleLogout={handleLogout} fileChange={fileChange} handleUpload={handleUpload}/>
  //     </>
  //   )
  // }

  return (
    <div className="App">
      {user ? (
        <Hero 
          handleLogout={handleLogout} 
          user={user} 
          list={list} 
          setList={setList} 
          handleUpload={handleUpload} 
          fileChange={fileChange}
          setPages={setPages}
          pages={pages}
        />
      ):(
      
      
        <Login 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setpassword={setPassword} 
          handleLogin={handleLogin}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          handleSignUp={handleSignUp}
        />
      
      
      )}

      
      
    </div>
  );
}

export default App;




// {user ? (
        
//   <Hero 
//     handleLogout={handleLogout} 
//     user={user} 
//     list={list} 
//     setList={setList} 
//     handleUpload={handleUpload} 
//     fileChange={fileChange}
//   />


// ):(


//   <Login 
//     email={email} 
//     setEmail={setEmail} 
//     password={password} 
//     setpassword={setPassword} 
//     handleLogin={handleLogin}
//     hasAccount={hasAccount}
//     setHasAccount={setHasAccount}
//     emailError={emailError}
//     passwordError={passwordError}
//     handleSignUp={handleSignUp}
//   />


// )}

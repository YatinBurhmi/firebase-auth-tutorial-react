import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

firebase.initializeApp({
  apiKey:"AIzaSyATRQnmfeW9Vgxvh-qOG-2MKswFtVYHua8", 
  authDomain: "fir-auth-90af3.firebaseapp.com" 
})

class App extends Component {
  state = {isSignedIn: false}

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callBacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user})
    })
  }

  render() { 
    return (  
      <div className="App">
        {this.state.isSignedIn ?
        <span>
          <div>Signed In</div>
          <button onClick = {()=> firebase.auth().signOut()}>Log Out</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <img alt="profilePic" src={firebase.auth().currentUser.photoURL}/>
        </span>  
          :
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
          }
      </div>
    );
  }
}
 
export default App;

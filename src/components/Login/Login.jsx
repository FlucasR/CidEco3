import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style.css';
import './login.css';
import { codificar64 } from '../../utils/Methods';

var firebase = require("firebase/app");

class Login extends Component {

  state = {
    email: '',
    password: '',
    erro: false,
  }

  logar(){
    debugger;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
      if(!!(user.user))
        window.location.replace('#/main');
    
    }).catch( e => { this.setState({erro: true})  });

  }
  logarComFace(){
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const db = firebase.database();
    

    firebase.auth().signInWithPopup(fbProvider).then(function (result){

      var user = result.user;
      
      const userId = codificar64(user.email);
    
      db.ref('usuarios/').once("value")
        .then(function(snapshot){
          var r = snapshot.child(userId).exists();
          if(!r)  window.location.replace('#/signUpFace');  
      })

    }).catch(function (error){
      this.setState({erro: true})
    })
  }

  logado(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      //if(firebaseUser)  window.location.replace('#/main');
    })
  }

  
  renderAlert(){
    return(
      <div class=" mt-3 alert alert-danger" role="alert">
        Erro: Usuário ou senha inválidos
      </div> 
    ) 
  }

  renderContent(){

    const { email, password } = this.state;
    return(

      <React.Fragment>
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <img className="img-fluid image" src={require('../../assets/web_hi_res_512.png')} alt="CidEco"/>
          </div>
        </div>
        <form className="form">
          <div className="form-group">
            <label for="exampleInputEmail1">E-mail</label>
            <input 
              value={email} 
              onChange={e => this.setState({email: e.target.value})} 
              type="email" 
              className="form-control" 
              id="exampleInputEmail1" 
              aria-describedby="emailHelp" 
              placeholder="E-mail"/>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Senha</label>
            <input 
              value={password} 
              onChange={e => this.setState({password: e.target.value})} 
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
              placeholder="Senha"/>
            <Link className="float-right mb-3 text" to="esqueciSenha">Esqueci minha senha</Link>
          </div>
          <button 
            onClick={() => this.logar()} 
            type="submit" 
            className="btn btn-primary btn-block mt-1">
              Entrar
          </button>
        </form>
        <Link className="mt-2" to="SignUp">Não possui login? Cadastre-se!</Link>
        <button className="btn btn-secondary mt-5" onClick = { () => this.logarComFace() }>Entrar com o Facebook</button>
      </React.Fragment>
    )
  }
  render() {
    this.logado();
    
    if(this.state.erro){
      return (
        <div className="container d-flex flex-column align-items-center justify-content-center height">
          {this.renderContent()}
          {this.renderAlert()}
        </div>
        
      );
    }
    else{
      return(
        <div className="container d-flex flex-column align-items-center justify-content-center height">
          {this.renderContent()}
        </div>
      )
    }
    
  }
}

export default Login;


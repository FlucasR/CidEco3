import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import '../../style.css';
import './main.css';
import { codificar64 } from '../../utils/Methods';

var firebase = require("firebase/app");

class MainAdmin extends Component {

  constructor(props){
    super(props);
    
  
  }

  logado(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)  window.location.replace('#/login')
      else{
        if(firebaseUser.email !== 'admcideco@gmail.com') window.location.replace('#/main')
      }
    })
  }

  sair(){
    firebase.auth().signOut();
    window.location.replace('#/login');
  }

  irpara(destino){
    window.location.replace(destino)
  }

  

  render() {
    return(
      <React.Fragment>
        <div className="container heightMaior d-flex flex-column">
          <div className="row justify-content-center heightMaior">
              <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="col-3 m-3 rounded w-100 h-25 align-self-center pointer"
                onClick= {() => this.irpara('#/gerenciarPerguntas')} >
                  <p className="my-5 py-4 text-center w-100 font-weight-bold text-white">Gerenciar Perguntas</p>
              </div>
              <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="col-3 rounded m-3 w-100 h-25 align-self-center pointer"
                onClick= {() => this.irpara('#/relatorios')}>
                <p className="my-5 py-4 text-center w-100 font-weight-bold text-white">Extrair Relatório</p>
              </div>
              <div onClick={() => this.sair()} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} 
              className="col-3 m-3 rounded w-100 h-25 align-self-center pointer">
                <p className="my-5 py-4 text-center w-100 font-weight-bold text-white">Sair</p>
              </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default MainAdmin;

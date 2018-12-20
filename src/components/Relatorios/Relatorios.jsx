import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Relatorio1 from './Relatorio1';
import Relatorio2 from './Relatorio2';
import Relatorio3 from './Relatorio3';
import Relatorio4 from './Relatorio4';

import '../../style.css';
import { codificar64 } from '../../utils/Methods';

var firebase = require("firebase/app");

class Relatorios extends Component {
    constructor(props){
        super(props)
        this.state = {
            destiny: 'Grid',
            idUser: null,
        }
    }

    componentDidMount() {
        this.logado();
      }

    logado(){
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if(!firebaseUser)  window.location.replace('#/login')
          else{
            if(firebaseUser.email !== 'admcideco@gmail.com') window.location.replace('#/main')
            else   this.setState({idUser : codificar64('admcideco@gmail.com')})
          }
        })
      }

      renderButton(){
        return (
          <button onClick={() => {
              window.location.replace('#/mainAdmin')
          }} className= "mt-3 btn btn-primary">Voltar</button>
        )
      }

      content() {
          switch(this.state.destiny) {
            case 'Grid':
                return(
                    <React.Fragment>
                        {this.renderGrid()}
                    </React.Fragment>
                )
            case 'Relatorio1':
                return(
                    <React.Fragment>
                        <Relatorio1 backTo = {(location) => {this.backTo(location)}} idUser = {this.state.idUser} />
                    </React.Fragment>
                )
            case 'Relatorio2':
                return(
                    <React.Fragment>
                        <Relatorio2 backTo = {(location) => {this.backTo(location)}} idUser = {this.state.idUser} />
                    </React.Fragment>
                )
            case 'Relatorio3':
                return(
                    <React.Fragment>
                        <Relatorio3 backTo = {(location) => {this.backTo(location)}} idUser = {this.state.idUser} />
                    </React.Fragment>
                )
            case 'Relatorio4':
                return(
                    <React.Fragment>
                        <Relatorio4 backTo = {(location) => {this.backTo(location)}} idUser = {this.state.idUser} />
                    </React.Fragment>
                )
          }

        }
      renderGrid() {
        return(
          <React.Fragment>
            <div className="container heightMaior d-flex flex-column">
              <div className="row justify-content-center heightMaior">
                  <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="col-3 m-3 rounded w-100 h-25 align-self-center pointer"
                    onClick= {() => this.setState({destiny: 'Relatorio1'})} >
                      <p className="my-5 py-4 text-center w-100 font-weight-bold text-white">Usuários</p>
                  </div>
                  <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="col-3 rounded m-3 w-100 h-25 align-self-center pointer"
                    onClick= {() => this.setState({destiny: 'Relatorio2'})}>
                    <p className="my-5 py-4 text-center w-100 font-weight-bold text-white">Ranking por usuário</p>
                  </div>
                  <div onClick= {() => this.setState({destiny: 'Relatorio3'})} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} 
                  className="col-3 m-3 rounded w-100 h-25 align-self-center pointer">
                    <p className="my-5 py-4 text-center w-100 font-weight-bold text-white">Pontuações por Região</p>
                  </div>
                  <div onClick= {() => this.setState({destiny: 'Relatorio4'})} style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} 
                  className="col-3 m-3 rounded w-100 h-25 align-self-center pointer">
                    <p className="my-5 py-4 text-center w-100 font-weight-bold text-white
                    ">Desempenho por níveis</p>
                  </div>
              </div>
            </div>
          </React.Fragment>
        )
      }
    
    render(){
        return(
            <React.Fragment>
                {this.content()}
            </React.Fragment>
        )
        
    }

    backTo(location) {
    
        this.setState(
          {
            destiny: location,
          }
          )
      }

}


export default Relatorios;
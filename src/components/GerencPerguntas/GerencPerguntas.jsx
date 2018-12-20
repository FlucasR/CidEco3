import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Subnivel from '../Subnivel/Subnivel'
import '../../style.css';
import './gerencPerguntas.css'
import { codificar64 } from '../../utils/Methods';

var firebase = require("firebase/app");

class GerencPerguntas extends Component {

    constructor(props){
        super(props);
        this.state = {
          destiny: 'Grid',
          idDestiny: 0,
          niveis: [],
          subniveis: [],
          idUser: codificar64('admcideco@gmail.com')
        }
      }

      logado(){
        firebase.auth().onAuthStateChanged(firebaseUser => {
          if(!firebaseUser)  window.location.replace('#/login')
          else{
            if(firebaseUser.email !== 'admcideco@gmail.com') window.location.replace('#/main')
          }
        })
      }

      componentDidMount() {
        this.logado();
        const db = firebase.database();
        db.ref('niveis/').once('value').then((res) => {
          this.setState({niveis: Object.values(res.val() )})
        });    
    
      }
    
      content() {
        if (this.state.niveis.length === 0) {
          return(
            <div>Carregando...</div>
          )
        }
        switch(this.state.destiny) {
          case 'Grid':
              return (
                <React.Fragment>
                  {this.renderGrid()}
                  {this.renderButton()}
                </React.Fragment>
              )
            case 'Subnivel':
                console.log(this.state.progressos)
                return(
                    <React.Fragment>
                        <Subnivel backTo = {(location) => {this.backTo(location)}} subniveis = {this.state.subniveis} 
                        cor = {this.state.cor}  nivel = {this.state.nivel} idUser = {this.state.idUser}/>
                    </React.Fragment>
                )
            
        }
      }

      renderButton(){
        return (
          <button onClick={() => {
              window.location.replace('#/mainAdmin')
          }} className= "mt-3 btn btn-primary">Voltar</button>
        )
      }


      
      goTo(destiny, subniveis, cor, subProgressos){
        this.setState(
          {
            destiny: destiny,
            subniveis: subniveis ? Object.values(subniveis) : [],
            nivel: Object.keys(subniveis)[0].toString().substring(0, 1),
            cor : cor ? cor : null
          }
          )
      }
      renderGrid() {
        const titles = this.state.niveis;
        return titles.map( (item, i) => {
          return (
            <div onClick={() => this.goTo("Subnivel", item.subniveis, item.cor)} 
              style={{backgroundColor: item.cor}} className="row m-3 rounded w-50 pointer">
              <p className="title m-3 text-center w-100 font-weight-bold">{item.name}</p>
            </div>
          )
        });
      }

      backTo(location) {
        debugger;
    
        this.setState(
          {
            destiny: location,
          }
          )
      }

    render(){
        console.log("Main", this.state)
    return(
      <React.Fragment>
        <div className="container height">
          <div className="row d-flex flex-column align-items-center w-100 mt-5">
            {this.content()}
          </div>
        </div>
      </React.Fragment>
    )
    }
}
export default GerencPerguntas;

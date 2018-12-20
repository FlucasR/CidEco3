import React, { Component } from 'react';
import '../../style.css';
import './main.css';
import Header from '../Header/Header'
import Subnivel from '../Subnivel/Subnivel'
import FeedGeral from '../FeedGeral/FeedGeral'
import {codificar64, currentDate} from '../../utils/Methods'


var firebase = require("firebase/app");

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      destiny: 'Grid',
      idDestiny: 0,
      niveis: [],
      subniveis: [],
      cor : null,
      progressos: [],
      nivel: null,
      idUser: null,
      fim: null,
      totalPontos: null
    }
  }

  componentDidMount() {
    this.logado();
    
    const db = firebase.database();
    
    db.ref('niveis/').once('value').then((res) => {
      this.setState({niveis: Object.values(res.val() )})
    })
    
  }

  logado(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser){
        window.location.replace('?#/login')
      }
      else{
        const idUser = codificar64(firebaseUser.email);
        if(firebaseUser.email === 'admcideco@gmail.com') window.location.replace('#/mainAdmin')

        this.setState({idUser: idUser})
        this.getDataFim();
        this.getProgresso();
        this.total();
        
      } 
    })
  }


  content() {
    if (this.state.niveis.length === 0) {
      return(
        <div>Carregando...</div>
      )
    }
    else{
      switch(this.state.destiny) {
        case 'Grid':
          if(!this.confere()){
            return (
              <React.Fragment>
                {this.renderGrid()}
                <div  style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="row my-3 rounded w-50">
                    <p className="my-3 text-center w-100 font-weight-bold text-white">Feedback</p>
                </div>
              </React.Fragment>
            )
          }else{
            return (
              <React.Fragment>
                {this.renderGrid()}
                <div onClick={() => this.setState({destiny: 'Feedback'})}  style={{backgroundColor: 'rgba(0, 0, 0, 1)'}} className="row my-3 rounded w-50 pointer">
                    <p className="my-3 text-center w-100 font-weight-bold text-white">Feedback</p>
                </div>
              </React.Fragment>
            )
          }
        case 'Subnivel':
          console.log(this.state.progressos)
          return(
            <React.Fragment>
              <Subnivel backTo = {(location) => {this.backTo(location)}} subniveis = {this.state.subniveis} 
              cor = {this.state.cor}  progressos = {this.state.progressos}  nivel = {this.state.nivel} idUser = {this.state.idUser}/>
            </React.Fragment>
          )      
        case 'Feedback':
          return(
            <FeedGeral backTo = {(location) => {this.backTo(location)}} progressos = {this.state.progressos} idUser = {this.state.idUser}
              niveis = {this.state.niveis}>
            </FeedGeral>
          )
    }
    
    }
  }
  goTo(destiny, subniveis, cor, subProgressos){
    this.setState(
      {
        destiny: destiny,
        subniveis: subniveis ? Object.values(subniveis) : [],
        progressos: subProgressos ?  Object.values( Object.values(subProgressos)[0] ): [],
        nivel: Object.keys(subniveis)[0].toString().substring(0, 1),
        cor : cor ? cor : null
      }
      )
  }
  renderGrid() {
    const titles = this.state.niveis;
    const progressos = this.state.progressos;
    return titles.map( (item, i) => {
      return (
        <div onClick={() => this.goTo("Subnivel", item.subniveis, item.cor, progressos[i],)} 
          style={{backgroundColor: item.cor}} className="row my-3 rounded w-50 pointer">
          <p className="title my-3 text-center w-100 font-weight-bold align-self-center">{item.name}</p>
        </div>
      )
    });
  }

  backTo(location) {
    this.getDataFim();
    this.getProgresso();
    this.total();

    this.setState(
      {
        destiny: location,
      }
      )
  }

  confere(){
    let soma= 0;
    const db = firebase.database();
    const x = this;
    if(this.state.progressos.length > 0 ){
      this.state.progressos.forEach((item) =>{
        Object.values(item).forEach((item)=>{
            Object.values(item).forEach(item => {
              soma +=  Object.values(item)[0]
            });
        })
      })
  
      let qtdPerguntas = 0;
      this.state.niveis.forEach((item)  =>{
          Object.values(item.subniveis).forEach((item) =>{
            qtdPerguntas += Object.values(item.questoes).length;
          })
      })
  
      debugger;
      if(soma === qtdPerguntas){
        if(this.state.fim === null){
          var updates = {};
          updates['dataFim/'] = currentDate();
          updates['pontos/total/'] = this.state.totalPontos;
          db.ref('testes/' + this.state.idUser).update(updates, 
            function(error){
              if(error){
                alert(error.message)
              }
              else{
                x.setState({fim: currentDate() })
              }
            })
        }
        return true;
      }
      else{
        return false;
      }

    }
    
  }

  total(){
    let pontos;
    let total = 0;
    
    const db = firebase.database();
    db.ref('testes/' + this.state.idUser +'/pontos').once('value').then((res) => {
      if(res.val() !== null){
        pontos = Object.values( res.val() );
        pontos.forEach(item =>{
          Object.values(item).forEach((item)=>{
            Object.values(item).forEach(item => {
              total +=  Object.values(item)[0]
          });
          })
        })
        this.setState({totalPontos: total})
        this.confere();
      }
      
    })  

  }  

  


  getDataFim(){
    debugger;
    let dataFim;
    let idUser = codificar64(firebase.auth().currentUser.email)
    const db = firebase.database();
    
    
    db.ref('testes/' + idUser).once('value').then((res) => {
      if( res.val().dataFim){
        dataFim = res.val().dataFim;
        this.setState({fim: dataFim})
      }
      else{
        this.setState({fim: null})
      }
    })
  }

  getProgresso(){
    let progressos;
    let idUser = codificar64(firebase.auth().currentUser.email);
    const db = firebase.database();
    
    
    db.ref('testes/' + idUser +'/progressos').once('value').then((res) => {
      progressos = Object.values( res.val() )
      this.setState({progressos: progressos})
    })
  }

  render() {
    console.log("Main", this.state)
    return(
      <React.Fragment>
        <Header/>
        <div className="container height d-flex flex-column align-items-center w-100">
          {this.content()}
        </div>
      </React.Fragment>
    )
  }
}

export default Main;

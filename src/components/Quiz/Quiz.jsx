import React, { Component } from 'react';
import './quiz.css';
import {codificar64} from '../../utils/Methods'
import lixo from '../../assets/images/lixo.jpg'
var firebase = require("firebase/app");

class Quiz extends Component {

  constructor(props){
    super(props);
    this.state = {
      backTo: props.backTo,
      questoes: props.questoes,
      keysOfQuestions: props.keysOfQuestions,
      mistakes: [],
      ultima: props.questoes.length,
      current: Object.values(props.progresso)[0],
      nome: Object.keys(props.progresso)[0],
      score: Object.values(props.ponto)[0]
    }
  }

  componentDidMount(){
    this.getErros()
  }

  getErros(){
    const idUser = codificar64(firebase.auth().currentUser.email)
    const db = firebase.database();
    let erros;
    const idNivel = this.state.keysOfQuestions[0].toString().substring(0,1);
    const idSubnivel = this.state.keysOfQuestions[0].toString().substring(0, 2)
    const path = idNivel + '/subniveis/' + idSubnivel + '/' + this.state.nome

    db.ref('testes/' + idUser + '/erros/' + path).once('value').then((res) => {
      if( res.val() !== null){
        erros = Object.values( res.val() )
        this.setState({mistakes: erros})
      }
    })
  }

  renderQuiz() {
    if (! (this.state.current > this.state.ultima) ) {
      return(
        <React.Fragment>
          {this.renderQuizTitle()}
          {this.renderQuizAnswers()}
          {this.renderButton()}
        </React.Fragment>
      )
    }
  }

  renderQuizTitle() {
    if(this.state.keysOfQuestions[this.state.current] === "611"){
      return(
        <React.Fragment>
          <div className="row my-3 rounded w-75 pointer p-1" style={{backgroundColor: this.props.cor}}>
              <p className="title my-3 text-center w-100 font-weight-bold">{this.state.questoes[this.state.current].pergunta}</p>
          </div>
          <img src ={lixo} alt="Lixo no chão" className="img-fluid m-2 w-25 h-25" ></img>  
        </React.Fragment>
      )
    }
    else{
      return (
          <div className="row my-3 rounded w-75 pointer p-1" style={{backgroundColor: this.props.cor}}>
            <p className="title my-3 text-center w-100 font-weight-bold">{this.state.questoes[this.state.current].pergunta}</p>
          </div>
      )
    }

  }

  renderQuizAnswers() {

    const answers = Object.values(this.state.questoes[this.state.current].respostas);
    return (
        <div className= "w-50">
            {
                answers.map((opcao) => {
                    return (
                        <div onClick ={() => {this.verificaCerta(opcao.certa)}} className="row w-100 bg-success p-1 pointer my-2 rounded" >
                            <p className="block">{opcao.titulo}</p>
                        </div>
                    )
                })
            }
        </div>
    )
  }

  verificaCerta(choice){

    let score = this.state.score;
    let current = this.state.current;
    let mistakes = this.state.mistakes;

    if (!choice) {
        mistakes.push(this.state.keysOfQuestions[current]);
    } else {
        score++;
    }
    current++;
    this.setState({
        score,
        current,
        mistakes
    })
  }

  renderButton(){
    return (
      <button onClick={() => {
        this.salvarBD()
      }} className= "btn btn-primary">Voltar</button>
    )
  }

  salvarBD(){
    const db = firebase.database();
    const idUser = codificar64(firebase.auth().currentUser.email)
    const idNivel = this.state.keysOfQuestions[0].toString().substring(0,1);
    const idSubnivel = this.state.keysOfQuestions[0].toString().substring(0, 2)
    const path = idNivel + '/subniveis/' + idSubnivel
    
    db.ref('testes/' + idUser + '/erros/' + path + '/' + this.state.nome).set(
      this.state.mistakes,
      function(error) {
        if (error) {
          alert(error.message);
        }
      }
    );
    
    db.ref('testes/' + idUser +'/progressos/' + path + '/' + this.state.nome).set(
      this.state.current, function(error) {
        if (error) {
          alert(error.message);
        }
      }
    );

    db.ref('testes/' + idUser + '/pontos/' + path + '/' + this.state.nome).set(
      this.state.score, function(error) {
        if (error) {
          alert(error.message);
        }
      }
    );
    this.voltar();
  }

  voltar(){
    this.state.backTo('Subnivel')
  }

  finalizado(){
    alert("Você já finalizou esse subnível! Siga para os próximos");
    this.salvarBD();
  }
  

  render() {
    if(this.state.current === this.state.ultima){
      return (
        <React.Fragment>
          {this.finalizado()} 
        </React.Fragment>
      )
    }
    console.log("Quiz-state", this.state);
    return(
      <React.Fragment>
        {this.renderQuiz()}
      </React.Fragment>
    )
  }

}

export default Quiz;

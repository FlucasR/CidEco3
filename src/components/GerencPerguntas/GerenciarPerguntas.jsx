import React, { Component } from 'react';
import NovaPergunta from './NovaPergunta'
import {decodificar64} from '../../utils/Methods'
import '../../style.css';

var firebase = require("firebase/app");

class GerenciarPerguntas extends Component {

  constructor(props){
    super(props);
    this.state = {
        backTo: props.backTo,
        questoes: props.questoes,
        idSub: props.keysOfQuestions[0].toString().substring(0, 2),
        keys: props.keysOfQuestions,
        idNivel: props.idNivel,
        idPergunta: null,
        destiny: 'GerenciarPerguntas'
    }
  }

  componentDidMount(){
    this.getQuestoes();
    
  }

  getQuestoes(){
    let keys, val;
    const db = firebase.database();
    db.ref('niveis/' + this.state.idNivel + '/subniveis/' + this.state.idSub + '/questoes').once('value').then((res) =>{
        keys = Object.keys( res.val() )
        val = Object.values( res.val() )
        this.setState({questoes: val, keys: keys});
    })
  }

  renderNovaPergunta(){
      return(
          <button className="btn btn-success">Nova Pergunta</button>
      )
  }

  renderPerguntas(){
      return this.state.questoes.map((item, i) => {
        return (
            <div className = "row my-2 w-100">
                <div style={{backgroundColor: this.props.cor}} onClick = {() => this.setState({destiny: 'NovaPergunta', idPergunta: item} ) }
                className="py-2 text-center w-90 font-weight-bold">{item.pergunta}</div>
                <button onClick = {() => this.apagarPergunta(item, i) } className="w-10 pointer btn btn-danger" />                 
            </div>
        )
      });
  }

  content() {
    switch(this.state.destiny) {
      case 'GerenciarPerguntas':
          return (
            <React.Fragment>
                {this.renderPerguntas()}    
                {this.renderNovaPergunta()}
                {this.renderButton()}
            </React.Fragment>
          )
        case 'NovaPergunta':
            return(
                <React.Fragment>
                    <NovaPergunta backTo = {(location) => {this.backTo(location)}} keys = {this.state.keys}
                    idNivel = { this.state.idNivel} idPergunta = {this.state.idPergunta} />
                </React.Fragment>
            )
    }
  }

  voltar(){
    this.state.backTo('Subnivel')
  }


  renderButton(){
    return (
      <button onClick={() => {this.voltar()}
      } className= "btn btn-primary mt-5">Voltar</button>
    )
  }

  renderNovaPergunta(){
    return (
        <button onClick={() => {this.setState({destiny: 'NovaPergunta', idPergunta:  null})}
        } className= "btn btn-success mt-5">Nova Pergunta</button>
      )   
  }

  backTo(location) {
    this.getQuestoes();
    this.setState({
      destiny:location
    });
  }


  render(){
      console.log(this.state);
      return (
        <React.Fragment>
            {this.content()} 
        </React.Fragment>     
      )     
  }


  apagarPergunta(item, i){
    const x = this;
    console.log(this.state.keys[i]);
    const db = firebase.database();
    db.ref('niveis/' + this.state.idNivel + '/subniveis/' + this.state.idSub + '/questoes/' + this.state.keys[i] ).set(
        null, function(error) {
            if (error) {
                alert(error.message);
            } else {
              alert('Pergunta Apagada!');
              x.getQuestoes();
            }
        }
    )
    
    
  }

}
export default GerenciarPerguntas
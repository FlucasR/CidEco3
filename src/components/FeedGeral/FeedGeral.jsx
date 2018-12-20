import React, { Component } from 'react';
import { codificar64 } from '../../utils/Methods';
import '../../style.css'

var firebase = require("firebase/app");


class FeedGeral extends Component {

  constructor(props){
    super(props);
    debugger;
    
    this.state = {        
        backTo: props.backTo,
        pontos: null,
    }
  }
  
  componentDidMount(){
    this.getPontos();
    
  }

    getPontos(){
    const db = firebase.database();
    let pontos;
    debugger;
    db.ref('testes/' + this.props.idUser + '/pontos/').once('value').then((res) => {
      pontos = Object.values( res.val() )
      this.setState({pontos: pontos})
    })
  }

  backTo(location) {
    this.setState({
      destiny:location
    });
  }

  render(){
    if(this.state.pontos === null){
        return(
            <div>Carregando...</div>
        )
    }
    else{
        return(
            <div className ="row  justify-content-center todo"> 
                <div className="col-8 left">
                    {this.renderResultado()}
                </div>
                
            </div>
            
        )
    }
  }

  processResult(subniveis) {
    let totalPoints = 0;
    Object.values(subniveis).forEach(item => {
        totalPoints += parseInt(Object.values(item));
    });
    return totalPoints;
  }

  getQtdPerguntas(i){
    let totalQuestions = 0;
    Object.values(this.props.niveis[i].subniveis).forEach(item => {
        return totalQuestions += Object.values(item.questoes).length;
    });
    return totalQuestions;
  }
  
  buildFeedBack(){
    let msg = [];
    const t = this;
    this.state.pontos.forEach((ponto, i) => {
        if (t.props.niveis[i])
            msg.push(t.props.niveis[i].name + ': ' + t.processResult(ponto.subniveis) + ' de ' + t.getQtdPerguntas(i) + ' perguntas');
    })
    return (
        <React.Fragment>
            <p style = {{fontSize: 22, fontWeight: "bold"} } className = "text-white text-center">Veja seus acertos por nível</p>
            {
                msg.map(item => (
                    <p className= "w-100 my-3" style={{fontSize: 19 }}>{item}</p>
                ))
            }
        </React.Fragment>
    )
  }

  renderResultado(){
      return(
        <div className="row align-items-center">
            <div className=" col-12 mt-4 rounded align-self-center shadow bg-success">
                {this.buildFeedBack()}
                
            </div>
            <div className="col-12 mt-4 text-center">
                {this.renderButton()}
            </div>
        </div>
      )

  }

  renderButton(){
    return (
      <button onClick={() => {this.state.backTo('Grid')}} className= "btn btn-primary">Voltar</button>
    )
  }
}

export default FeedGeral

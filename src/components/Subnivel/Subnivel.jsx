import React, { Component } from 'react';
import Quiz from '../Quiz/Quiz'
import {decodificar64} from '../../utils/Methods'
import Feedback from '../Feedback/Feedback'
import GerenciarPerguntas from '../GerencPerguntas/GerenciarPerguntas'
import '../../style.css';
var firebase = require("firebase/app");

class Subnivel extends Component {

  constructor(props){
    super(props);
    this.state = {
        backTo: props.backTo,
        destiny: 'Subnivel',
        subniveis : props.subniveis,
        questoes: props.questoes,
        keysOfQuestions: [],
        progressos: [],
        pontos: [],
        idNivel: props.nivel,
        qtdPerguntas: null,
        ponto: null,
        progresso: null,
        erro: -1
    }
  }

  content(){
    switch(this.state.destiny){
      case 'Subnivel':
        if(decodificar64(this.props.idUser) === 'admcideco@gmail.com'){
          return(
            <React.Fragment>
              {this.renderSubnivel()}
              {this.renderButton()}
            </React.Fragment>
          )        
        }
        else{
          return(
            <React.Fragment>
                {this.renderSubnivel()}
                {this.renderButton()}
                {this.renderFeedbackButton()}
            </React.Fragment>
          )
        }
      case 'Quiz':
        return(
            <Quiz backTo = {(location) => {this.backTo(location)}} questoes = {this.state.questoes} 
            keysOfQuestions = {this.state.keysOfQuestions} cor = {this.props.cor} idUser = {this.props.idUser}
            progresso = {this.state.progresso} ponto = {(this.state.ponto) } />
        )
      case 'FeedbackSub':
          return(
            <Feedback cor = {this.props.cor} idNivel = {this.state.idNivel} pontos = {this.state.pontos } idUser = {this.props.idUser}
              qtdPerguntas = {this.state.qtdPerguntas}  backTo = {(location) => {this.backTo(location)}}/>
          )
      case 'GerenciarPerguntas':
            return(
              <GerenciarPerguntas backTo = {(location) => {this.backTo(location)}} questoes = {this.state.questoes} 
              keysOfQuestions = {this.state.keysOfQuestions} idNivel = {this.state.idNivel} cor = {this.props.cor} />
            )
    }
  }

  renderFeedbackButton(){
    if( this.confere()){
      return(
        <React.Fragment>
          <div style={{backgroundColor: 'rgba(0, 0, 0)'}} className="row my-3 rounded w-50 pointer" onClick ={ () => {this.setState(
            { destiny: 'FeedbackSub', }) }}
          >
            <p className="my-3 text-center w-100 font-weight-bold text-white align-self-center">Feedback</p>
          </div>  
          <div className="row my-3 rounded w-50 pointer">
            <button className= "btn btn-outline-dark btn-block font-weight-bold align-self-center" data-toggle="modal" data-target="#dialog2"> 
              Reiniciar Progresso
            </button>
          </div>
        </React.Fragment>
      )
    }
    else{
      return(
        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}} className="row my-3 rounded w-50">
          <p className="my-3 text-center w-100 font-weight-bold text-white">Feedback</p>
        </div>
      )
    }
  }

  componentDidMount(){
    this.getQtdPerguntas();
    this.getProgresso();
    this.getPontos();
  }

  

  getQtdPerguntas(){
    let todasPerguntas = this.state.subniveis;
    let quantidadePerguntas = 0;
    todasPerguntas.map( (item)  =>{
      quantidadePerguntas += Object.values(item.questoes).length
    })
    
    this.setState({qtdPerguntas : quantidadePerguntas});
  }

  confere(){
    debugger;
    let progressos = 0;
    this.state.progressos.map((item) => {
      progressos += Object.values(item)[0]
    })

    if(progressos === this.state.qtdPerguntas){
        return true;
    }

    return false;
  }

  backTo(location) {
    this.getProgresso();
    this.getPontos();
    this.setState({
      destiny:location
    });
  }

  reiniciarProgresso(x){

    
    let path, zerado;
    path = x.state.idNivel + '/subniveis/'
    switch(x.state.idNivel){
      case "1":
        zerado = {
          11:{
            consumoRacional: 0
          },
          12:{
            reaproveitandoAgua: 0
          },
          13:{
            contraDesperdicio: 0
          },
          14:{
            despoluindoÁguas: 0
          }
        }
        break;
      case "2":
        zerado = {
          21:{
            cuidandoFlora: 0
          },
          22:{
            protegendoFauna: 0
          },
          23:{
            agindoEcoturista: 0
          }
        }
        break;
      case "3":
        zerado = {
          31:{
            arLimpo: 0
          },
          32:{
            transpSolidario: 0
          },
          33:{
            verdeNoAr:0
          }
        }
        break;
      case "4":
        zerado = {
          41:{
            consumoConsciente: 0
          },
          42:{
            descarteInteligente: 0
          }
        }
        break;
      case "5":
        zerado = 
        {
          51:{
            congelandoEnergia: 0
          },
          52:{
            cuidadosTemperatura: 0
          },
          53:{
            semDesperdicio: 0
          },
          54:{
            conscienciaNoLar: 0
          },
          55:{
            roupasMenosEnergia: 0
          },
          56:{
            novasPosturasEnergeticas: 0
          },
        }
        break;
      case "6":
      zerado = {
        61:{
          preservandoImagem: 0
        },
        62:{
          respeitandoSom: 0
        }
      }

      break;

    }

    var updates  = {};
    
    updates['pontos/' + path] = zerado;
    updates['progressos/' + path ] = zerado;
    updates['erros/' + path] = null;
    updates['dataFim/'] = null;
    updates['pontos/total'] = 0;
    const db = firebase.database();

    db.ref('testes/' + x.props.idUser).update(updates, 
      function(error){
        if(error){
          x.setState({erro: true})
        }
        else{
          
          alert('Nível reiniciado!')
          x.setState({erro: false })
          x.getProgresso();
          x.getPontos()
        }
      })
    }

  render(){
    console.log('Subnível', this.state)
    return (
      <React.Fragment>
        {this.content()}
        {this.modal()}
      </React.Fragment>
      )
  }

  modal(){
    return(
      <div class="modal fade" id="dialog2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Reiniciar Progresso</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Deseja Reiniciar seu progresso neste nível?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
              <button type="button" onClick = { () => this.reiniciarProgresso(this) } data-dismiss="modal"class="btn btn-primary">
                Sim
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getProgresso(){
    const db = firebase.database();
    let progressos;

    db.ref('testes/' + this.props.idUser + '/progressos/' + this.state.idNivel + '/subniveis/').once('value').then((res) => {
      progressos = Object.values( res.val() )
      this.setState({progressos: progressos})
    })
  }

  getPontos(){
    const db = firebase.database();
    let pontos;

    db.ref('testes/' + this.props.idUser + '/pontos/' + this.state.idNivel + '/subniveis/').once('value').then((res) => {
      pontos = Object.values( res.val() )
      this.setState({pontos: pontos})
    })
  }

  renderButton(){
    return (
      <button onClick={() => {this.state.backTo('Grid')}} className= "btn btn-primary align-self-center">Voltar</button>
    )
  }

  renderSubnivel(){
    const progressos = this.state.progressos
    const pontos = this.state.pontos
    let destino;

    if(decodificar64(this.props.idUser) === 'admcideco@gmail.com')  destino = 'GerenciarPerguntas'
    else  destino = 'Quiz'
    return this.state.subniveis.map( (item, i) => {
      return(
          <div onClick={() => {this.setState(
                {questoes: Object.values(item.questoes),
                keysOfQuestions: Object.keys(item.questoes),
                destiny: destino, progresso: progressos[i] ,
                  ponto: pontos[i], })
              }
              }  style={{backgroundColor: this.props.cor}} className="row my-3 rounded w-50 pointer">
              <p className="title my-3 text-center align-self-center w-100 font-weight-bold">{item.name}</p>
          </div>
      )
    })
  }
}
export default Subnivel

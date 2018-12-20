import React, { Component } from 'react';
import '../../style.css';
import './signUp.css';
import {codificar64, decodificar64, currentDate} from '../../utils/Methods'
import {anos, meses, days28, days29, days30, days31, 
  estados, cidadesAC, cidadesAL, cidadesAM, cidadesAP, cidadesBA, cidadesCE,
  cidadesDF, cidadesES, cidadesGO, cidadesMA, cidadesMG, cidadesMS, cidadesMT, 
  cidadesPA, cidadesPB, cidadesPE, cidadesPI, cidadesPR, cidadesRS, cidadesRO,
  cidadesRN, cidadesRJ, cidadesSC, cidadesSE, cidadesSP, cidadesTO} from '../../utils/Cadastro';

var firebase = require("firebase/app");


class SignUp extends Component {

  state = {
    email: '',
    senha: '',
    estado: 'AC',
    cidade: 'cidadesAC',
    nome: '',
    dia: '01',
    mes: 'Janeiro',
    ano: '1930',
    genero: 'Não desejo informar',
    erro: false
  }

  renderOptionsAno(){
    return anos.map(ano =>{
      return (
        <option value = {ano}>
          {ano}
        </option>
      )
    })
  }

  renderOptionsMeses(){
    return meses.map(mes =>{
      return (
        <option value = {mes}>
          {mes}
        </option>
      )
    })
  }
  renderOptionsDias(){
    let dias;
    switch(this.state.mes){
      case 'Janeiro':case 'Março':case 'Maio': case 'Julho': case 'Agosto': case 'Outubro': case 'Dezembro':
        dias = days31;
        break;
      case 'Fevereiro':
        dias = this.bissexto(this.state.ano);
        break;
      default:
        dias = days30;
        break;
    }
    return dias.map(dia =>{
      return (
        <option value = {dia}>
          {dia}
        </option>
      )
    })
  }

  renderOptionsEstados(){
    return estados.map(estado =>{
      return (
        <option value = {estado}>
          {estado}
        </option>
      )
    })
  }

  renderOptionsCidades(){
    switch(this.state.estado){
      case 'AC':
        return cidadesAC.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'AL':
        return cidadesAL.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'AM':
        return cidadesAM.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'AP':
        return cidadesAP.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'BA':
        return cidadesBA.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'CE':
        return cidadesCE.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'DF':
        return cidadesDF.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'ES':
        return cidadesES.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'GO':
        return cidadesGO.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'MA':
        return cidadesMA.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'MG':
        return cidadesMG.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'MS':
        return cidadesMS.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'MT':
        return cidadesMT.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'PA':
        return cidadesPA.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'PB':
        return cidadesPB.map(cidade  => {
          return (
            <option value = {cidade}>{cidade}</option>
          )
        })
        case 'PE':
        return cidadesPE.map(cidade => {
            return (
              <option value= {cidade}>{cidade}</option>
            )
        })
        case 'PI':
        return cidadesPI.map(cidade => {
            return (
              <option value= {cidade}>{cidade}</option>
            )
        })
        case 'PR':
        return cidadesPR.map(cidade => {
            return (
              <option value= {cidade}>{cidade}</option>
            )
        })
        case 'RJ':
        return cidadesRJ.map(cidade => {
            return (
              <option value= {cidade}>{cidade}</option>
            )
        })
        case 'RN':
        return cidadesRN.map(cidade => {
            return (
              <option value = {cidade}>{cidade}</option>
            )
        })
        case 'RO':
        return cidadesRO.map(cidade => {
            return (
              <option value = {cidade}>{cidade}</option>
            )
        })
        case 'RS':
        return cidadesRS.map(cidade => {
            return (
              <option value = {cidade}>{cidade}</option>
            )
        })
        case 'SE':
        return cidadesSE.map(cidade => {
            return (
              <option value = {cidade}>{cidade}</option>
            )
        })
        case 'SC':
        return cidadesSC.map(cidade => {
            return (
              <option value = {cidade}>{cidade}</option>
            )
        })
        case 'SP':
        return cidadesSP.map(cidade => {
            return (
              <option value = {cidade}>{cidade}</option>
            )
        })

        case 'TO':
        return cidadesTO.map(cidade => {
            return (
              <option value = {cidade}>{cidade}</option>
            )
        })
    }
  }

  bissexto(ano){
    if (ano % 4 == 0) {
      if (ano % 100 == 0){
          if( ano % 400 == 0) return days29;
          return days28;
      }
      else return days29;
  }
  else return days28;
  }

  authorization(){
    if(this.state.nome != '' && this.state.email != '' && this.state.senha != '')
      return true;
    else this.setState({erro: true});
  }

  cadastrar(){
    let preenchido = this.authorization();
    const auth2 = firebase.auth();
    
    if(preenchido){
      const promise = auth2.createUserWithEmailAndPassword(this.state.email, this.state.senha);
      promise.then( user => {
        if(!!user.user){
          this.cadastrarBD();
        }})
        .catch(e => this.setState({erro: true}));
    }
    
  }

  cadastrarBD(){
    const db = firebase.database();
    const dataInicio = currentDate();
    db.ref('usuarios/'+ codificar64(this.state.email) ).set(
    {
      nome: this.state.nome,
      email: this.state.email,
      cidade : this.state.cidade ,
      estado: this.state.estado,
      genero: this.state.genero,
      datNasc: this.state.dia + '/' +this.state.mes + '/' + this.state.ano
    }, function(error) {
    if (error) {
      this.setState({erro: true})

    } else {      
    }
   });

    db.ref('testes/'+ codificar64(this.state.email) ).set(
      {
          idUsuario: codificar64(this.state.email),
          dataInicio,
          dataFim: null,
          pontos:{
            1:{
              subniveis:{
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
            },
            2:{
              subniveis:{
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
            },
            3:{
              subniveis:{
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
            },
            4:{
              subniveis: {
                41:{
                  consumoConsciente: 0
                },
                42:{
                  descarteInteligente: 0
                }
              }
            },
            5:{
              subniveis:{
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
            },
            6:{
              subniveis:{
                61:{
                  preservandoImagem: 0
                },
                62:{
                  respeitandoSom: 0
                }
              }
            },
            total: 0
          },
          progressos:{
            1:{
              subniveis:{
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
            },
            2:{
              subniveis:{
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
            },
            3:{
              subniveis:{
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
            },
            4:{
              subniveis: {
                41:{
                  consumoConsciente: 0
                },
                42:{
                  descarteInteligente: 0
                }
              }
            },
            5:{
              subniveis:{
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
            },
            6:{
              subniveis:{
                61:{
                  preservandoImagem: 0
                },
                62:{
                  respeitandoSom: 0
                }
              }
            }
          },
          erros:{
            1:{
              subniveis:{
                11:{
                  consumoRacional: []
                },
                12:{
                  reaproveitandoAgua: []
                },
                13:{
                  contraDesperdicio: []
                },
                14:{
                  despoluindoÁguas: []
                }
              }
            },
            2:{
              subniveis:{
                21:{
                  cuidandoFlora: []
                },
                22:{
                  protegendoFauna: []
                },
                23:{
                  agindoEcoturista: []
                }
              }
            },
            3:{
              subniveis:{
                31:{
                  arLimpo: []
                },
                32:{
                  transpSolidario: []
                },
                33:{
                  verdeNoAr:[]
                }
              }
            },
            4:{
              subniveis: {
                41:{
                  consumoConsciente: []
                },
                42:{
                  descarteInteligente: []
                }
              }
            },
            5:{
              subniveis:{
                51:{
                  congelandoEnergia: []
                },
                52:{
                  cuidadosTemperatura: []
                },
                53:{
                  semDesperdicio: []
                },
                54:{
                  conscienciaNoLar: []
                },
                55:{
                  roupasMenosEnergia: []
                },
                56:{
                  novasPosturasEnergeticas: []
                },
              }
            },
            6:{
              subniveis:{
                61:{
                  preservandoImagem: []
                },
                62:{
                  respeitandoSom: []
                }
              }
            }
          }
      }, 
      function(error) {
          if (error) {
            this.setState({erro: true})
            
           } else {
            alert('Cadastro realizado com sucesso');
            window.location.replace('#/info');
          }
      }
  )
  }

  logado(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser)  window.location.replace('#/main');
    })
  }

  renderAlert(){
    return(
      <div class=" mt-3 alert alert-danger" role="alert">
        Erro ao cadastrar, tente novamente.
      </div> 
    ) 
  }

  renderContent(){
    const {
      email, 
      senha, 
      estado, 
      cidade, 
      nome, 
      dia,
      mes,
      ano,
      genero, 
    } = this.state;
    return(

    <React.Fragment>
      <img className="img-fluid image" src={require('../../assets/web_hi_res_512.png')} alt="CidEco"/>
            <form className="form">
              <div className="form-group">
                <label>Nome</label>
                <input type="text" className="form-control"  placeholder="Nome"
                  value={nome} 
                  onChange={e => this.setState({nome: e.target.value})} />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">Gênero</label>
                </div>
                <select onChange={e => this.setState({genero: e.target.value})} class="custom-select" id="inputGroupSelect01">
                  <option selected value="Não desejo informar">Não desejo informar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className="d-flex space-between">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Estado</label>
                  </div>
  
                  <select id="estado" onChange={e => this.setState({estado: e.target.value, cidade: ''})} class="custom-select">
                  {this.renderOptionsEstados()}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Cidade</label>
                  </div>
                  <select id="cidade" onChange={e => this.setState({cidade: e.target.value})} class="custom-select">
                  {this.renderOptionsCidades()}
                  </select>
                </div>
              </div>
              <div className="d-flex space-between">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Dia</label>
                  </div>
                  <select id="data" onChange={e => this.setState({dia: e.target.value})} class="custom-select">
                  {this.renderOptionsDias()}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Mês</label>
                  </div>
                  <select id="mes" onChange={e => this.setState({mes: e.target.value})} class="custom-select">
                  {this.renderOptionsMeses()}
                  </select>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Ano</label>
                  </div>
                  <select id="ano" onChange={e => this.setState({ano: e.target.value})} class="custom-select">
                  {this.renderOptionsAno()}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>E-mail</label>
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
                <label>Senha</label>
                <input 
                  value={senha} 
                  onChange={e => this.setState({senha: e.target.value})} 
                  type="password" 
                  className="form-control" 
                  id="exampleInputPassword1" 
                  placeholder="Senha"/>
              </div>
              <button type="submit" onClick= { ()=> this.cadastrar()} className="btn btn-primary btn-block mt-1">Cadastrar</button>
            </form>
      </React.Fragment>
    )
  }



  render() {
    this.logado();
    if(this.state.erro){
      return (
        <div className="container heightMaior">
          <div className="row d-flex flex-column align-items-center w-100">
            {this.renderContent()}
            {this.renderAlert()}
          </div>
        </div>
      )
    }
    else{
      return (
        <div className="container height">
          <div className="row d-flex flex-column align-items-center w-100">
            {this.renderContent()}
          </div>
        </div>
      )  
    }
    
  }


}



export default SignUp;

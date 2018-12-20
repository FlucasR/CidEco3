import React, { Component } from 'react';
import '../../style.css';
import '../../components/SignUp/signUp.css';
import {codificar64, decodificar64} from '../../utils/Methods'
import {anos, meses, days28, days29, days30, days31, 
  estados, cidadesAC, cidadesAL, cidadesAM, cidadesAP, cidadesBA, cidadesCE,
  cidadesDF, cidadesES, cidadesGO, cidadesMA, cidadesMG, cidadesMS, cidadesMT, 
  cidadesPA, cidadesPB, cidadesPE, cidadesPI, cidadesPR, cidadesRS, cidadesRO,
  cidadesRN, cidadesRJ, cidadesSC, cidadesSE, cidadesSP, cidadesTO} from '../../utils/Cadastro';

var firebase = require("firebase/app");


class MeuPerfil extends Component {

    constructor(props){
        super(props)
        this.state = {
            estado: 'AC',
            cidade: 'cidadesAC',
            nome: null,
            dia: '01',
            mes: 'Janeiro',
            ano: '1930',
            genero: 'Não desejo informar',
            erro: false
          }
    }

    componentDidMount(){
        const db = firebase.database();
        const idUser = codificar64(firebase.auth().currentUser.email)
        debugger;
        let cadastro, usuario
        cadastro = {
            estado: null,
            cidade: null,
            nome: null,
            dia: null,
            mes: null,
            ano: null,
            genero: null,
        }
        db.ref('usuarios/' + idUser).once('value').then( (res) => {
            usuario = res.val();

            cadastro.estado = usuario.estado;
            cadastro.cidade = usuario.cidade;
            cadastro.nome = usuario.nome;
            cadastro.mes = usuario.datNasc.substring(3, usuario.datNasc.substring(3).indexOf('/') + 3)
            cadastro.ano = usuario.datNasc.substring( usuario.datNasc.substring(3).indexOf('/') + 4 )
            cadastro.dia = usuario.datNasc.substring(0, 2)
            cadastro.genero = usuario.genero;
            
            this.setState(cadastro)
        })
        
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


  salvar(){
    const db = firebase.database();
    const idUser = codificar64( firebase.auth().currentUser.email )
    db.ref('usuarios/'+ idUser).set(
    {
      nome: this.state.nome,
      email: decodificar64(idUser),
      cidade : this.state.cidade ,
      estado: this.state.estado,
      genero: this.state.genero,
      datNasc: this.state.dia + '/' +this.state.mes + '/' + this.state.ano
    }, function(error) {
    if (error) {
      this.set({erro: true})

    } else {
      
    }
   });

  }

  irparaMain(){
    window.location.replace('#/main')
  }

  renderButton(){
    return (
      <button onClick={() => this.irparaMain()} className= "btn btn-primary my-3  ">Voltar</button>
    )
  }

  logado(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(!firebaseUser)  window.location.replace('#/login');
    })
  }

  renderContent(){
    const {
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
        <div>
                <div className="d-flex align-items-center justify-content-center">
                  <img className="img-fluid image" src={require('../../assets/web_hi_res_512.png')} alt="CidEco"/>
                </div>
              </div>
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
                  <select onChange={e => this.setState({genero: e.target.value})} class="custom-select" id="inputGroupSelect01" selected value = {this.state.genero}>
                    <option value="Não desejo informar">Não desejo informar</option>
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
      
                    <select id="estado" onChange={e => this.setState({estado: e.target.value, cidade: ''})} class="custom-select" selected value = {this.state.estado}>
                    {this.renderOptionsEstados()}
                    </select>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Cidade</label>
                    </div>
                    <select id="cidade" onChange={e => this.setState({cidade: e.target.value})} class="custom-select" selected value = {this.state.cidade}>
                    {this.renderOptionsCidades()}
                    </select>
                  </div>
                </div>
                <div className="d-flex space-between">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Dia</label>
                    </div>
                    <select id="data" onChange={e => this.setState({dia: e.target.value})} class="custom-select" selected value = {this.state.dia}>
                    {this.renderOptionsDias()}
                    </select>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Mês</label>
                    </div>
                    <select id="mes" onChange={e => this.setState({mes: e.target.value})} class="custom-select" selected value = {this.state.mes}>
                    {this.renderOptionsMeses()}
                    </select>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <label class="input-group-text" for="inputGroupSelect01">Ano</label>
                    </div>  
                    <select id="ano" onChange={e => this.setState({ano: e.target.value})} class="custom-select" selected value = {this.state.ano}>
                    {this.renderOptionsAno()}
                    </select>
                  </div>
                </div>
                <button type="submit" onClick= { ()=> {
                  this.salvar();
                  this.irparaMain()}} className="btn btn-primary btn-block mt-1">Salvar</button>
              </form>
              {this.renderButton()}
      </React.Fragment>
    )
  }

  renderAlert(){
    return(
      <div class=" mt-3 alert alert-danger" role="alert">
        Erro ao salvar, tente novamente.
      </div> 
    )
  }

  render() {
    this.logado();

    if(this.state.nome === null){
        return(
            <div>Carregando...</div>
        )
    }
    else{
      if(this.state.erro){
        return(
          <div className="container d-flex flex-column align-items-center justify-content-center height">
            {this.renderContent()}    
            {this.renderAlert()}
          </div>
        )
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
    
}

export default MeuPerfil;

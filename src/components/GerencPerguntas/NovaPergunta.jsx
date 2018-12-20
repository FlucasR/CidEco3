import React, { Component } from 'react';
import '../../style.css';

var firebase = require("firebase/app");

class NovaPergunta extends Component {

    constructor(props){
      super(props);
      let pergunta = null, feedback = null;
      let respostas = ["", "", "", "", "", ""];
      let respostasCertas = [true, true, true, true, true, true]
      let idDaPergunta = null;
      if(props.pergunta !== null){
        let aux
        pergunta = props.idPergunta.pergunta;
        feedback = props.idPergunta.feedback;
        idDaPergunta = Object.keys(props.idPergunta.respostas)[0].substring(0,3);
        aux = Object.values(props.idPergunta.respostas);
        aux.forEach((item, i) =>{
            respostas[i] = item.titulo;
            respostasCertas[i] = item.certa
        })

        }
        
      this.state = {
          idPergunta : idDaPergunta,
          pergunta: pergunta,
          feedback: feedback,
          respostas: respostas,
          respostasCertas: respostasCertas,
          backTo: props.backTo,
          keys: props.keys,
          idNivel: props.idNivel,
      }
    }

    render(){
        console.log(this.state);
        return(
            <form className="form">
                {this.renderPergunta()}
                {this.renderRespostas()}
                {this.renderFeedback()}
                {this.renderButton()}
            </form>
        )
    }

    renderPergunta(){
        let pergunta = this.state.pergunta;
        const x = this;
        return(
        <div className="form-group">
                <label className = "title">Pergunta</label>
                <input type="text" className="form-control"  placeholder="Pergunta"
                  value={pergunta} 
                  onChange={e => x.setState({pergunta: e.target.value})} />
        </div>
        )
    }

    renderRespostas(){
        let respostas = this.state.respostas;
        let respostasCertas = this.state.respostasCertas;
        const x = this;
        return respostas.map((item, i) =>{
            return(
                <div className="form-group">
                    <label className = "title">Resposta {i + 1}</label>
                    <input type="text" className="form-control"  placeholder="Resposta"
                    value={item} 
                    onChange={e => x.altera( i, e.target.value, "respostas" )    } />
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Resposta</label>
                        </div>
                        <select id={"certa" + i} onChange={e => x.altera(i, e.target.value, "opções") } class="custom-select" selected value = {respostasCertas[i]}>
                            <option value = "true">Certa</option>
                            <option value = "false">Errada</option>
                        </select>
                    </div>
                </div>
            )
        })
    }



    altera(indice, valor, local){
        switch(local){
            case "respostas":
                let respostas = this.state.respostas;
                respostas[indice] = valor;
                this.setState({respostas: respostas})
                break;
            case "opções":
                if(valor === "true"){
                    valor = true;
                }
                else if(valor === "false"){
                    valor = false;
                }

                let respostasCertas = this.state.respostasCertas;
                respostasCertas[indice] = valor;
                this.setState({respostasCertas: respostasCertas});
                break;
        }
        
    }

    renderFeedback(){
        let feedback = this.state.feedback
        return(
            <div className="form-group">
                <label className = "title">Feedback</label>
                <input type="text" className="form-control"  placeholder="Feedback"
                  value={feedback} 
                  onChange={e => this.setState({feedback: e.target.value})} />
            </div>
        )
    }


    renderButton(){
        return (
            <div className= "row my-5 justify-content-around">
                <button onClick={() => {this.salvar()}
                } className= "btn btn-success">Salvar</button>
                <button onClick={() => {this.voltar()}
                } className= "btn btn-secondary">Cancelar</button>
            </div>

        )
    }

    salvar(){
        if( this.valida() ){
            const db = firebase.database();
            const x = this;
            let respostaObj ={};
            let novaKey;
            if(this.state.idPergunta !== null){
                novaKey = this.state.idPergunta;
            }else{
                novaKey = ( parseInt(this.state.keys[this.state.keys.length - 1])  + 1);
            }
            
            let idSub = novaKey.toString().substring(0, 2);
            let keysRespostaStart = novaKey.toString() + "1"
            
            this.state.respostas.forEach((item, i) =>{
                if( !!item ){
                    respostaObj[`${keysRespostaStart}`] = {certa: x.state.respostasCertas[i], titulo: x.state.respostas[i]}
                    keysRespostaStart++;
                }
            })


            db.ref('niveis/' + this.state.idNivel + '/subniveis/' + idSub + '/questoes/' + novaKey).set(
            {
                feedback: this.state.feedback,
                pergunta: this.state.pergunta,
                respostas: respostaObj
            }, 
            function(error) {
                if (error) {
                    alert(error.message);
                    
                } else {
                    alert('Pergunta salva com sucesso!');
                    x.voltar();
                 }
            })

        }
        
        
    }

    valida(){
        debugger;
        const x = this;
        let respostasOk = false;
        let perguntaOk = false;
        let feedbackOk = false;
        let umacerta = false;
        let umaerrada = false;
        let resOk = 0;
        this.state.respostas.forEach((item, i) => {
            if(!!item){
                resOk++
                if(x.state.respostasCertas[i] === true){
                    umacerta = true;
                }
                else if(x.state.respostasCertas[i] === false){
                    umaerrada = true;
                }
            }
            
        })

        if(resOk >= 2){
            respostasOk = true;
        }

        if(!!this.state.pergunta){
            perguntaOk = true;
        }

        if(!!this.state.feedback){
            feedbackOk = true;
        }

        return (respostasOk && perguntaOk && feedbackOk && umacerta && umaerrada)


    }

    voltar(){
        debugger;
        this.state.backTo('GerenciarPerguntas')
    }
}

export default NovaPergunta;
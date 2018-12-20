import React, { Component } from 'react';
import {codificar64, decodificar64} from '../../utils/Methods'




var firebase = require("firebase/app");

class Relatorio4 extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            testes:[],
            agua: [],
            fauna: [],
            ar: [],
            lixo: [],
            energia: [],
            imagemSom: [],
            qtdPerguntas: [],
            total: 0,
        }
    }
    
    componentDidMount(){
        const rootRef = firebase.database().ref();
        let qtdPerguntas = [];
        let users = [];
        let testes = [];
        let agua = [], fauna = [], ar = [], lixo = [], energia = [], imagemSom = [];

        rootRef.child('niveis/').once('value').then((res) => {

             Object.values(res.val() ).forEach((item, i) =>{
                qtdPerguntas[i] = 0;
                Object.values(item.subniveis).forEach(item2 =>{
                    qtdPerguntas[i] += Object.values(item2.questoes).length;
                })
             })
        })
        

        

        rootRef.child('testes').orderByChild('pontos/total').limitToLast(100).on('child_added', testesSnap => {
            if(testesSnap.val().dataFim){
                testes.push(testesSnap.val());
                rootRef.child('testes/'+ testesSnap.val().idUsuario +'/pontos/1/subniveis').once('value').then( aguaSnap => {
                    agua.push( this.totaldoTroço(Object.values( aguaSnap.val() )));
                })

                rootRef.child('testes/'+ testesSnap.val().idUsuario +'/pontos/2/subniveis').once('value').then( faunaSnap => {
                    fauna.push( this.totaldoTroço(Object.values( faunaSnap.val() )));
                })

                rootRef.child('testes/'+ testesSnap.val().idUsuario +'/pontos/3/subniveis').once('value').then( arSnap => {
                    ar.push( this.totaldoTroço(Object.values( arSnap.val() )));
                })

                rootRef.child('testes/'+ testesSnap.val().idUsuario +'/pontos/4/subniveis').once('value').then( lixoSnap => {
                    lixo.push( this.totaldoTroço(Object.values( lixoSnap.val() )));
                })

                rootRef.child('testes/'+ testesSnap.val().idUsuario +'/pontos/5/subniveis').once('value').then( energiaSnap => {
                    energia.push( this.totaldoTroço(Object.values( energiaSnap.val() )));
                })

                rootRef.child('testes/'+ testesSnap.val().idUsuario +'/pontos/6/subniveis').once('value').then( imagemSomSnap => {
                    imagemSom.push( this.totaldoTroço(Object.values( imagemSomSnap.val() )));
                })

            
                rootRef.child('usuarios/'+ testesSnap.val().idUsuario ).once('value').then(usersSnap =>{
                    users.push(usersSnap.val())
                }).then(() => {
                    let total = 0;
                    qtdPerguntas.forEach((item, i) => {
                        total += item;
                    })

                    this.setState({users: users, testes: testes , agua: agua, 
                        fauna: fauna, ar: ar, lixo: lixo, 
                        energia: energia, imagemSom: imagemSom, qtdPerguntas: qtdPerguntas, total: total})        
                }) 
            }
                
        })
    }

    totaldoTroço(pontos){
        let soma = 0;
        pontos.forEach(item =>{
            soma += Object.values(item)[0];
        })
        return soma
    }


    render(){
        if(this.state.testes.length === 0 && this.state.users.length < this.state.testes.length){
            return( 
                <div className = "container">
                    <p className="text-center">Carregando...</p>
                </div>
                
            )
        }
        else{
            return (
                <div className= "container height">
                    <table className = "table mt-4">
                        <thead>
                            <tr style ={{backgroundColor: '#207534'}}>
                                <th className="text-center" >Nome</th>
                                <th className="text-center" >Desempenho Água</th>
                                <th className="text-center" >Desempenho Fauna e Flora</th>
                                <th className="text-center" >Desempenho Ar</th>
                                <th className="text-center" >Desempenho Lixo</th>
                                <th className="text-center" >Desempenho Energia</th>
                                <th className="text-center" >Desempenho Imagem e Som</th>
                                <th className="text-center" >Desempenho total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                    <div className ="row justify-content-center my-3">
                        {this.renderButton()}
                    </div>
                </div>
              )
        }
        
    }
    renderRows(){
        debugger;
        const t = this;

        if( this.state.testes.length > 0 && this.state.users.length == this.state.testes.length){
            return this.state.testes.map((item, i) => {
                return(
                    <tr key = {codificar64(t.state.users[i].email)}>
                        <td className ="mx bg-success text-white"> {t.state.users[i].nome}</td>
                        <td className ="mx-1 bg-success text-white"> { (t.state.agua[i] / t.state.qtdPerguntas[0] * 100).toFixed(2).concat(" %") }</td>
                        <td className ="mx-1 bg-success text-white"> { (t.state.fauna[i] / t.state.qtdPerguntas[1]* 100).toFixed(2).concat(" %") }</td>
                        <td className ="mx-1 bg-success text-white"> { (t.state.ar[i] / t.state.qtdPerguntas[2]* 100).toFixed(2).concat(" %")  }</td>
                        <td className ="mx-1 bg-success text-white"> { (t.state.lixo[i] / t.state.qtdPerguntas[3]* 100).toFixed(2).concat(" %") }</td>
                        <td className ="mx-1 bg-success text-white"> { (t.state.energia[i] / t.state.qtdPerguntas[4] * 100).toFixed(2).concat(" %") }</td>
                        <td className ="mx-1 bg-success text-white"> { (t.state.imagemSom[i] / t.state.qtdPerguntas[5] * 100).toFixed(2).concat(" %") }</td>
                        <td className ="mx-1 bg-success text-white"> { (item.pontos.total / t.state.total * 100).toFixed(2).concat(" %") }</td>
                    </tr>
                )
            })
                
        }
        else{
        }
        
    }
    renderButton(){
        return (
          <button onClick={() => {this.props.backTo('Grid')}} className= "btn btn-primary ">Voltar</button>
        )
    }

    
}

export default Relatorio4;
import React, { Component } from 'react';
import {codificar64, decodificar64} from '../../utils/Methods'


var firebase = require("firebase/app");

class Relatorio3 extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            testes: [],

        }

    }
    
    componentDidMount(){
        let users = [];
        let testes = [];

        const rootRef = firebase.database().ref();

        rootRef.child('testes').on('child_added', testesSnap => {

            if(testesSnap.val().dataFim){
                testes.push(testesSnap.val());
            
                rootRef.child('usuarios/'+ testesSnap.val().idUsuario ).once('value').then(usersSnap =>{
                    users.push(usersSnap.val())
                }).then(() => {
                    this.setState({users: users, testes: testes})        
                }) 
            }
                
        })
    }

    verificaEstado(estado){
        switch(estado){
            case 'AC': case 'AM': case 'AP': case 'TO': case 'RR': case 'PA': case '': case 'RO':
                return 'Norte'
            case 'MA': case 'PI': case 'BA': case 'CE': case 'RN': case 'SE': case 'PE': case 'PB': case 'AL':
                return 'Nordeste';
            case 'MT': case 'MS': case 'GO': case 'DF':
                return 'Centro-Oeste';
            case 'SP': case 'MG': case 'ES': case 'RJ':
                return 'Sudeste';
            case 'RS': case 'SC': case 'PR':
                return 'Sul';
        }


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
            //console.log(this.state);
            let norte = [], nordeste = [], centroeste = [], sudeste =[], sul =[];
            let norteTeste = [], nordesteTeste = [], centroesteTeste = [], sudesteTeste =[], sulTeste =[];
            const t = this;
            this.state.users.forEach((item, i) =>{
                switch( t.verificaEstado(item.estado) ){
                    case 'Norte':
                    debugger;
                        norte.push(item);
                        norteTeste.push(t.state.testes[i]);
                        break;
                    case 'Nordeste':
                        nordeste.push(item);
                        nordesteTeste.push(t.state.testes[i]);
                        break;                        
                    case 'Centro-Oeste':
                        centroeste.push(item);
                        centroesteTeste.push(t.state.testes[i]);
                        break;
                    case 'Sudeste':
                        sudeste.push(item);
                        sudesteTeste.push(t.state.testes[i]);
                        break;
                    case 'Sul':
                        sul.push(item);
                        sulTeste.push(t.state.testes[i]);
                        break;
                    default:

                }
            })

            return(

                <div className= "container height">
                    <table className = "table mt-4">
                        <thead>
                            <tr style ={{backgroundColor: '#207534'}}>
                                <th >Região</th>
                                <th> Estado</th>
                                <th >Nome</th>
                                <th >Pontos</th>
                                <th >Média Por Região</th>
                                <th >Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows(norte, norteTeste, 'Norte')}
                            {this.renderRows(nordeste, nordesteTeste, 'Nordeste' )}
                            {this.renderRows(centroeste, centroesteTeste, 'Centro-Oeste' )}
                            {this.renderRows(sudeste, sudesteTeste, 'Sudeste')}
                            {this.renderRows(sul, sulTeste,'Sul')}
                        </tbody>
                    </table>
                    <div className ="row justify-content-center my-3">
                        {this.renderButton()}
                    </div>
                </div>
            )
        }
        
    }

    renderRows(users, testes, regiao){

        const t = this;
        let soma = 0;
        testes.forEach( t =>{
            soma += t.pontos.total;
        })

        return testes.map((item, i) => {
            if(item.dataFim){
                return(
                    <tr key = {codificar64(users[i].email)}>
                        <td className ="bg-success text-white"> {regiao}</td>
                        <td className ="bg-success text-white"> {users[i].estado}</td>
                        <td className ="bg-success text-white"> {users[i].nome}</td>
                        <td className ="bg-success text-white"> {item.pontos.total}</td>
                        <td className ="bg-success text-white"> {(soma / users.length).toFixed(2)}</td>
                        <td className ="bg-success text-white"> {t.message(item.pontos.total, soma/users.length) }</td>
                        
                    </tr>
                )
            }
        })          
    }

    message(pontos, mediaRegiao){
        if(pontos < mediaRegiao - 2 ){
            return "Abaixo da Média"
        }
        else if( pontos > mediaRegiao + 2){
            return "Acima da Média"
        }
        else{
            return "Na média"
        }
    }

    renderButton(){
        return (
          <button onClick={() => {this.props.backTo('Grid')}} className= "btn btn-primary ">Voltar</button>
        )
    }

}

export default Relatorio3;
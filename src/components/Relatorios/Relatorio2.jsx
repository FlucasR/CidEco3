import React, { Component } from 'react';
import {codificar64, decodificar64} from '../../utils/Methods'


var firebase = require("firebase/app");

class Relatorio2 extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: [],
            testes: []
        }

    }
    
    componentDidMount(){
        let users = [];
        let testes = [];

        const rootRef = firebase.database().ref();

        rootRef.child('testes').orderByChild('pontos/total').limitToLast(100).on('child_added', testesSnap => {
            if(testesSnap.val().dataFim){
                testes.push(testesSnap.val());
                rootRef.child('usuarios/'+ testesSnap.val().idUsuario ).once('value').then(usersSnap =>{
                    users.push(usersSnap.val());
                    
                }).then(() => {
                    this.setState({users: users, testes: testes})        
                })   
                
            }
        })
        
    }

    render(){
        if(this.state.users.length === 0  && this.state.users.length < this.state.testes.length){
            return( 
                <div className = "container">
                    <p className="text-center">Carregando...</p>
                </div>
                
            )
        }
        else{
            console.log(this.state);
            return(
                <div className= "container height">
                    <table className = "table mt-4">
                        <thead>
                            <tr style ={{backgroundColor: '#207534'}}>
                                <th >Nome</th>
                                <th >Data Início</th>
                                <th >Data Fim</th>
                                <th >Estado</th>
                                <th >Pontos</th>
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
                        <td className ="bg-success text-white"> {t.state.users[i].nome}</td>
                        <td className ="bg-success text-white"> {item.dataInicio}</td>
                        <td className ="bg-success text-white"> {item.dataFim}</td>
                        <td className ="bg-success text-white"> {t.state.users[i].estado}</td>
                        <td className ="bg-success text-white"> {item.pontos.total}</td>
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

export default Relatorio2;
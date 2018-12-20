import React, { Component } from 'react';
import {codificar64, decodificar64} from '../../utils/Methods'
import '../../style.css'

var firebase = require("firebase/app");

class Relatorio1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            users : []
        }

    }

    componentDidMount(){
        let users = [];

        const rootRef = firebase.database().ref();
        rootRef.child('usuarios').orderByChild('nome').once('value').then(userSnap => {
            users = Object.values( userSnap.val() );
            this.setState({ users : users})
        })

    }
    
    render(){
        if(this.state.users.length === 0 ){
            return( 
                <div className = "container">
                    <p className="text-center">Carregando...</p>
                </div>
                
            )
        }
        else{
            return(
                <div className= "container height">
                    <table className = "table mt-4">
                        <thead>
                            <tr style ={{backgroundColor: '#207534'}}>
                                <th >Nome</th>
                                <th >E-mail</th>
                                <th >Data de Nascimento</th>
                                <th> Gênero</th>
                                <th >Estado</th>
                                <th >Cidade</th>
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
        return this.state.users.map(item => {
            return(
                <tr key = {codificar64(item.email)}>
                    <td className ="bg-success text-white"> {item.nome}</td>
                    <td className ="bg-success text-white"> {item.email}</td>
                    <td className ="bg-success text-white"> {item.datNasc}</td>
                    <td className ="bg-success text-white"> {item.genero}</td>
                    <td className ="bg-success text-white"> {item.estado}</td>
                    <td className ="bg-success text-white"> {item.cidade}</td>
                </tr>

                )
        })
    }

    renderButton(){
        return (
          <button onClick={() => {this.props.backTo('Grid')}} className= "btn btn-primary ">Voltar</button>
        )
    }

    
}

export default Relatorio1;
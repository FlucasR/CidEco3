
import React, { Component } from 'react';
import '../../style.css';


var firebase = require("firebase/app");

class EsqueciSenha extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: null
        }
    }
    redefinirSenha(){
        const auth = firebase.auth();
        auth.sendPasswordResetEmail(this.state.email).then(function() {
          }).catch(function(error) {
            alert(error.messagge)
          });
    }

    renderTxt(){
        return(
            <div className="rounded shadow p-3  mb-4">
                <p style={{fontSize: 22}}>Enviaremos um link de redefinição de senha para o seu e-mail</p>
                <p>Digite seu e-mail por favor:</p>
            </div>
        )
    }

    irparaLogin(){
        window.location.replace('#/login')
    }
    render(){
        return(
            <div className="container d-flex flex-column align-items-center justify-content-center height">
                {this.renderTxt()}
                <form className="form">
                    <div className="form-group mb-5">
                        <input  
                            onChange={e => this.setState({email: e.target.value})} 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="E-mail"/>
                    </div>
                    <button type="submit" onClick= { ()=> {
                            this.redefinirSenha()
                            this.irparaLogin()
                        }
                    } className="btn btn-primary btn-block mt-1">Redefinir Senha</button>
                </form>
            </div>
        )
    }
    
}


export default EsqueciSenha;

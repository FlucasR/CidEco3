import React, { Component } from 'react';
import '../../style.css';
import './info.css'


class Info extends Component {

    constructor(props){
      super(props);
    }


    iniciar(){
        window.location.replace('#/main');
    }
    render(){
        return(
            <React.Fragment>
            <div className =" bg d-flex align-items-center ">
                <div className = "row justify-content-center">
                    <h3 className ="col-10 text-white mx-5 p-5 bg-fosco" >
                        Inspirado pelas publicações do Caderno de Educação Ambiental – Ecocidadão, realizadas pela Secretaria do Meio de
                        Ambiente do Estado de Paulo, nos anos de 2008 e 2014, este aplicativo tem por objetivo avaliar, por meio de situações problemas
                        cotidianas, o comportamento dos cidadãos quanto à preservação e manutenção do meio ambiente. Além disso, despertar hábitos e
                        práticas ecologicamente corretos visando diminuir o impacto ambiental, tornando-se, dessa forma, "ecocidadãos"
                    </h3>
                    <button className= "bg-botao btn btn-lg m-5 p-3" onClick = { ()=> this.iniciar() }>Iniciar Testes</button>
                    
                </div> 
            </div>
            </React.Fragment>
        )
    }
}

export default Info;    
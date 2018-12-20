import './Header.css'
import React, {Component} from 'react'
import '../../style.css';
import {codificar64, currentDate} from '../../utils/Methods'

var firebase = require("firebase/app");

class Header extends Component {

  constructor(props){
    super(props);
    this.state ={
      erro: null,
    }
  }

deslogar(){
  firebase.auth().signOut();
  window.location.replace('#/login');
}

reiniciarProgresso(){
  const db = firebase.database();
  const idUser = codificar64( firebase.auth().currentUser.email )
  const dataInicio = currentDate();
  db.ref('testes/'+ idUser ).set(
    {
        idUsuario: idUser,
        dataInicio: dataInicio,
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
          alert("Progresso reiniciado!")
          window.location.reload()
        }
    })
}

render() {
  return (
    <React.Fragment>
      <div class="jumbotron bg-title heightMenorJumbo" >
        <nav class="navbar navbar-expand-lg navbar-light withoutShadow heightMenor">
          <a class="navbar-brand p-4 rounded shadow logoColor" href="#">CidEco</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse heightMenor" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto col d-flex justify-content-end">
              <li class="nav-item bg-item p-2  m-2 hover">
                <a class="nav-link link text-white" href="#meuPerfil">Meu Perfil</a>
              </li>
              <li class="nav-item bg-item p-2  m-2 hover">
                <a class="nav-link link text-white" data-toggle="modal" data-target="#dialog">Reiniciar Progresso</a>
              </li>
              <li class="nav-item bg-item p-2  m-2 hover">
                  <a class="nav-link link text-white " onClick = { ()=> this.deslogar() }>Sair<span class="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>

      </div>

      {this.modal()}
    </React.Fragment>
  )
}

modal(){
  return(
    <div class="modal fade" id="dialog" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Reiniciar Progresso</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Deseja Reiniciar todo o seu progresso?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Não</button>
            <button type="button" onClick = { () => this.reiniciarProgresso() }class="btn btn-primary" data-dismiss="modal">
              Sim
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
}
export default Header;
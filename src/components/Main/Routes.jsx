import React from 'react'
import {Switch, Route, Redirect} from 'react-router'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import SignUpFace from '../SignUp/SignUpFace';
import Info from '../Info/Info';
import Main from './Main';
import MainAdmin from './MainAdmin'
import GerencPerguntas from '../GerencPerguntas/GerencPerguntas'
import MeuPerfil from './../MeuPerfil/MeuPerfil'
import EsqueciSenha from './../EsqueciSenha/EsqueciSenha'
import Relatorio from './../Relatorios/Relatorios'

export default props =>
    <Switch>
        <Route path='/login' component={Login}/>
        <Route exact path='/SignUp' component={SignUp}/>
        <Route exact path='/SignUpFace' component={SignUpFace}/>
        <Route exact path='/info' component={Info}/>
        <Route exact path='/main' component={Main}/>
        <Route exact path='/meuPerfil' component={MeuPerfil}/>
        <Route exact path='/esqueciSenha' component={EsqueciSenha}/>
        <Route exact path= '/mainAdmin' component= {MainAdmin}/>
        <Route exact path= '/gerenciarPerguntas' component={GerencPerguntas}/>
        <Route exact path= '/relatorios' component={Relatorio}/>
        <Redirect from='*' to='/main'/>
    </Switch>
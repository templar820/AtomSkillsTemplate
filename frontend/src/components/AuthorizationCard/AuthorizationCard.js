import React, {useState} from 'react';
import './AuthorizationCard.scss'
import ModalBox from "../System/ModalBox";
import {inject, observer} from "mobx-react";
import MyError from "../../services/MyError";

const AuthorizationCard = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [viewState, setViewState] = useState('authorization');

  return (
    <ModalBox show={props.show} closeDialog={props.closeDialog}>
      <div className="card-body">
        <h5 className="card-title text-center">
          {viewState === 'authorization' && "Авторизация"}
          {viewState === 'register' && "Регистрация"}
        </h5>
        <form
          className="form-signin"
          onSubmit={(e) => {
            e.preventDefault();
            viewState === 'authorization' && props.services.requestService.login(email, password, isRemember);
            if (password !== password1 && viewState === 'register') throw new MyError({status: 400, detail: "Пароли не совпадают"})
            viewState === 'register' && props.services.requestService.register(email, password, isRemember);
          }}
        >
          <div className="form-label-group">
            <input
              id="inputEmail"
              type="email"
              className="form-control"
              placeholder="Адрес электронной почты"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="inputEmail">Адрес электронной почты</label>
          </div>

          <div className="form-label-group">
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              placeholder="Пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="inputPassword">Пароль</label>
          </div>
          {viewState === 'register' &&
          <div className="form-label-group">
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              placeholder="Повторите пароль"
              required
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <label htmlFor="inputPassword">Повторите пароль</label>
          </div>}

          {viewState === 'authorization' &&
            <div className="custom-control custom-checkbox mb-3">
              <input
                id="customCheck1Пароль"
                type="checkbox"
                className="custom-control-input"
                value={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}

              />
              <label className="custom-control-label" htmlFor="customCheck1">Запомнить пароль</label>
            </div>
          }

          <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
            {viewState === 'authorization' && "Войти"}
            {viewState === 'register' && "Зарегистрироватсья"}
          </button>
          <button className="btn btn-link mt-2" onClick={(e) => {
            e.preventDefault();
            const newState = viewState === 'register' ? 'authorization' : 'register'
            setViewState(newState)
          }}>
            {viewState === 'authorization' && "Зарегистрироватсья"}
            {viewState === 'register' && "Войти"}
          </button>
          <hr className="my-4"/>
          <button className="btn btn-lg btn-google btn-block text-uppercase">
            <i className="bi bi-google mr-2"/> Войти с Google
          </button>
        </form>
      </div>
    </ModalBox>
  )
}

export default inject('services')(AuthorizationCard);

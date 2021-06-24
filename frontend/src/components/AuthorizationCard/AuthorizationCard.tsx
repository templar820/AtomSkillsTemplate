import React, {useState} from 'react';
import './AuthorizationCard.scss'
import ModalBox from "../System/ModalBox";
import {inject, observer} from "mobx-react";
import MyError from "../../services/MyError";
import {useTranslation} from "react-i18next";

const AuthorizationCard = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [viewState, setViewState] = useState('authorization');
  const {t} = useTranslation();

  return (
    <ModalBox show={props.show} closeDialog={props.closeDialog}>
      <div className="card-body">
        <h5 className="card-title text-center">
          {viewState === 'authorization' && t('authorizationCard.authorization')}
          {viewState === 'register' && t('authorizationCard.registration')}
        </h5>
        <form
          className="form-signin"
          onSubmit={(e) => {
            e.preventDefault();
            viewState === 'authorization' && props.services.requestService.login(email, password, isRemember);
            if (password !== password1 && viewState === 'register') throw new MyError({status: 400, detail: t("authorizationCard.errorPasswordMismatch")})
            viewState === 'register' && props.services.requestService.register(email, password, isRemember);
          }}
        >
          <div className="form-label-group">
            <input
              id="inputEmail"
              type="email"
              className="form-control"
              placeholder={t('authorizationCard.email')}
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="inputEmail">{t('authorizationCard.email')}</label>
          </div>

          <div className="form-label-group">
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              placeholder={t('authorizationCard.password')}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="inputPassword">{t('authorizationCard.password')}</label>
          </div>
          {viewState === 'register' &&
          <div className="form-label-group">
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              placeholder={t('authorizationCard.repeatPassword')}
              required
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            <label htmlFor="inputPassword">{t('authorizationCard.repeatPassword')}</label>
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
              <label className="custom-control-label" htmlFor="customCheck1">{t('authorizationCard.rememberPassword')}</label>
            </div>
          }

          <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
            {viewState === 'authorization' && t('common.login')}
            {viewState === 'register' && t('authorizationCard.register')}
          </button>
          <button className="btn btn-link mt-2" onClick={(e) => {
            e.preventDefault();
            const newState = viewState === 'register' ? 'authorization' : 'register'
            setViewState(newState)
          }}>
            {viewState === 'authorization' && t('authorizationCard.register')}
            {viewState === 'register' && t('common.login')}
          </button>
          <hr className="my-4"/>
          <button className="btn btn-lg btn-google btn-block text-uppercase">
            <i className="bi bi-google mr-2"/> {t('authorizationCard.loginGoogle')}
          </button>
        </form>
      </div>
    </ModalBox>
  )
}

export default inject('services')(AuthorizationCard);

import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import {Navbar} from "react-bootstrap";
import AuthorizationCard from "../AuthorizationCard/AuthorizationCard";

const Header = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="d-flex flex-row align-items-center ml-4 mr-4 justify-content-between">
        <Navbar expand="lg">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            this.props.history.push('/')
          }}>
            <img src="https://cdn.eapteka.ru/local/templates/eapteka.v5/img/svg/sber-eapteka-logo.svg?_cvc=1621603449"
                 alt=""/></a>
        </Navbar>

        <div className="d-flex flex-row align-items-center">
          <button
            className='btn btn-link'
            onClick={() => setShow(true)}
          >Войти</button>
        </div>
      </div>
      <hr/>
      <AuthorizationCard show={show} closeDialog={() => setShow(false)}/>
    </>
  );
}

export default inject('services')(observer(Header));

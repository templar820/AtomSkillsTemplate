import React from 'react';
import {inject, observer} from 'mobx-react';
import {StoresNames} from '@/services/common/constDictionary';
import {Redirect, withRouter} from 'react-router-dom';
import {Navbar} from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.requestService = this.props.services.requestService;
    this.networkService = this.props.services.networkService;

  }

  render() {

    return (
      <>
        <div className={"d-flex flex-row align-items-center ml-4 mr-4 justify-content-between"}>
          <Navbar expand="lg">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              this.props.history.push('/')
            }}>
              <img src="https://cdn.eapteka.ru/local/templates/eapteka.v5/img/svg/sber-eapteka-logo.svg?_cvc=1621603449"
                   alt=""/></a>
          </Navbar>

          <div className="d-flex flex-row align-items-center">

          </div>

        </div>
        <hr/>
      </>
    );
  }
}

export default withRouter(inject('services')(observer(Header)));

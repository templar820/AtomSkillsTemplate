import React from 'react';
import './HomePage.scss';
import {inject, observer} from 'mobx-react';
import {StoresNames} from '@/services/common/constDictionary';
import {withRouter} from "react-router-dom";
import {toJS} from "mobx";


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div></div>
    );
  }
}

export default withRouter(inject("services")(observer(HomePage)));

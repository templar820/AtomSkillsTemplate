import React from 'react';
import './HomePage.scss';
import {inject, observer} from 'mobx-react';
import {withRouter} from "react-router-dom";
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";


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
      <div className="home-page">
        <h4 className="mb-3">Продукты</h4>
        <div className="row">
          {
            [...Array(10).keys()].map((value) => (
              <div key={value} className="home-page__card col-12 col-sm-6 col-lg-4 mb-3">
                <ContentLoader/>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default withRouter(inject("services")(observer(HomePage)));

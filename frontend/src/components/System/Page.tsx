import React from 'react';
import Header from '@/components/Header/Header';

class Page extends React.Component {

  render() {
    return (
      <div className="pageWrapper">
        <Header/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="grid search">
                <div className="grid-body">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;

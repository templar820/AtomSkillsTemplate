import React, {useState} from 'react';
import './HomePage.scss';
import {inject, observer} from 'mobx-react';
import {Link, withRouter} from "react-router-dom";
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";
import {useTranslation} from "react-i18next";


const HomePage:React.FC = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, 1000);

  return (
    <div className="home-page">
      <div className="row">
        <h4 className="mb-3 col-2">{t("homePage.products")}</h4>
      </div>
      <div className="row">
        {
          isLoading
            ? [...Array(12).keys()].map((value) => (
              <div key={value} className="product-card col-12 col-sm-6 col-lg-4 mb-3">
                <ContentLoader/>
              </div>
            ))
            : [...Array(12).keys()].map((value) => (
              <div key={value} className="product-card col-12 col-sm-6 col-lg-4 mb-3">
                <div className="product-card__wrapper card-body">
                  <h5 className="card-title">Название продукта {value}</h5>
                  <p className="card-text mb-1">Название вещества</p>
                  <p className="card-text">Код вещества</p>
                  <div className="d-flex justify-content-end">
                    <Link to="/" className="btn btn-primary">Кнопка</Link>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default withRouter(inject("services")(observer(HomePage)));

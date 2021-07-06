import React, {useEffect, useState} from 'react';
import './HomePage.scss';
import {inject, observer} from 'mobx-react';
import {Link, withRouter} from "react-router-dom";
import ContentLoader from "@/components/System/ContentLoader/ContentLoader";
import {useTranslation} from "react-i18next";
import {StoresNames} from "@/services/common/constDictionary";


const HomePage:React.FC<{services: any}> = (props) => {
  const {t} = useTranslation();

  useEffect(() => {
    props.services.productService.getProducts();
    return () => {
      props.services.productService.clearProducts()
    };
  }, []);

  return (
    <div className="home-page">
      <div className="row">
        <h4 className="mb-3 col-2">{t("homePage.products")}</h4>
      </div>
      <div className="row">
        {
          !props[StoresNames.ProductStore].products
            ? [...Array(12).keys()].map((value) => (
              <div key={value} className="product-card col-12 col-sm-6 col-lg-4 mb-3">
                <ContentLoader/>
              </div>
            ))
            : props[StoresNames.ProductStore].products.slice(0, 300).map((product) => (
              <div key={product.id} className="product-card col-12 col-sm-6 col-lg-4 mb-3">
                <div className="product-card__wrapper card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text mb-1">{product.substanceName}</p>
                  <p className="card-text">{product.substanceCode}</p>
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

export default withRouter(inject(StoresNames.ProductStore, "services")(observer(HomePage)));

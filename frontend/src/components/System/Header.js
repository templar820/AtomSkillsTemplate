import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import {Navbar} from "react-bootstrap";
import AuthorizationCard from "../AuthorizationCard/AuthorizationCard";
import {useTranslation} from "react-i18next";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '60px',
    marginLeft: 'auto',
    marginRight: '20px',
  },
}));

const Header = () => {
  const [show, setShow] = useState(false);
  const {t, i18n} = useTranslation();
  const classes = useStyles();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

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
        <FormControl className={classes.formControl}>
          <Select
            defaultValue={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
            label={t('header.language')}
          >
            <MenuItem value={'ru'}>RU</MenuItem>
            <MenuItem value={'en'}>EN</MenuItem>
          </Select>
        </FormControl>

        <div className="d-flex flex-row align-items-center">
          <button
            className='btn btn-link'
            onClick={() => setShow(true)}
          >{t("common.login")}</button>
        </div>
      </div>
      <hr/>
      <AuthorizationCard show={show} closeDialog={() => setShow(false)}/>
    </>
  );
}

export default inject('services')(observer(Header));

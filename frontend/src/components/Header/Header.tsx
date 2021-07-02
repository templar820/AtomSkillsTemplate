import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useTranslation} from "react-i18next";
import './Header.scss';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import colors from '@styles/colors.modules.scss';
import {IconButton} from "@material-ui/core";
import {StoresNames} from "@/services/common/constDictionary";
import {Link} from 'react-router-dom';
import {ButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";
import UserStore from "@/stores/UserStore";

const useStyles = makeStyles((theme) => ({
  formControl: {
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    }
  },
  select: {
    "& .MuiSelect-root": {
      paddingBottom: 0,
      paddingTop: 0,
    },
    '&:before': {
      border: "none"
    },
    '&:after': {
      border: "none"
    },
    "& .MuiSvgIcon-root": {
      color: colors.white,
    },
    "& .MuiInput-input": {
      color: colors.white,
    }
  },
  accountIcon: {
    color: colors.white,
  }
}));

const Header = (props: { services: any }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {t, i18n} = useTranslation();
  const classes = useStyles();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const logout = () => {
    props.services.authService.logout();
  };

  return (
    <header className="header d-flex align-items-center fixed-top">
      <div className="container align-items-center">
        <div className="d-flex align-items-center h-100">
          <Link to="/" className="d-flex align-items-center header__logo">
            <div className="header__logo-box d-flex align-items-center justify-content-center">
              <h2 className="header__logo-h2 m-0">HT</h2>
            </div>
            <h4 className="header__logo-h4 text-white ml-2 m-0">HackTemplate</h4>
          </Link>
          <div className="ml-auto d-flex align-items-center h-100">
            <DropdownButton
              variant="outlined text-white d-none d-sm-block"
              as={ButtonGroup}
              title={t("header.translations")}
            >
              <Dropdown.Item
                onClick={() => changeLanguage("ru")}
              >RU</Dropdown.Item>
              <Dropdown.Item
                onClick={() => changeLanguage("en")}
              >EN</Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="outlined text-white pr-0"
              as={ButtonGroup}
              title={props[StoresNames.UserStore].user.email}
            >
              <Dropdown.Item
                onClick={() => {
              }}>Личный кабинет</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item
                onClick={logout}
              >
                Выйти
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </header>
  );
}

export default inject('services', StoresNames.UserStore)(observer(Header));

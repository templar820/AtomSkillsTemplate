import React, {useState} from 'react';
import {inject, observer} from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderColor: colors.white
    }
  },
  select: {
    '&:before': {
      borderColor: colors.white,
    },
    '&:after': {
      borderColor: colors.white,
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

const Header = (props: {services: any}) => {
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
    <header className="header d-flex align-items-center">
      <div className="container align-items-center">
        <div className="row h-100">
          <div className="col-4 d-flex align-items-center">
            <Link to="/" className="d-flex align-items-center header__logo">
              <div className="header__logo-box d-flex align-items-center justify-content-center">
                <h2 className="header__logo-h2 m-0">HT</h2>
              </div>
              <h4 className="header__logo-h4 text-white ml-2 m-0">HackTemplate</h4>
            </Link>
          </div>
          <div className="col-2 col-lg-1 offset-4 offset-lg-6 d-none d-sm-flex align-items-center justify-content-end">
            <FormControl className={classes.formControl}>
              <Select
                defaultValue={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                label={t('header.language')}
                className={classes.select}
              >
                <MenuItem value={'ru'}>RU</MenuItem>
                <MenuItem value={'en'}>EN</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-2 col-lg-1 d-none d-sm-flex align-items-center justify-content-end">
            <div>
              <IconButton aria-controls="profile-menu" aria-haspopup="true" onClick={(event)=>setAnchorEl(event.currentTarget)}>
                <AccountCircleIcon className={classes.accountIcon} fontSize="large"/>
              </IconButton>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem>Что-то там</MenuItem>
                <MenuItem
                  onClick={logout}
                >{t('common.logout')}</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default inject('services', StoresNames.UserStore)(observer(Header));

import React, {useEffect, useState} from 'react';
import {makeStyles, TextField} from "@material-ui/core";
import ModalBox from "@/components/System/ModalBox";
import {useTranslation} from "react-i18next";
import ProductModel from "@/model/ProductModel";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '14px',
  }
}));

interface IProductDialogProps {
  closeDialog: () => void;
  mode: "create" | "update" | null;
  product?: ProductModel | null;
  services?: any;
}

const ProductDialog: React.FC<IProductDialogProps> = ({closeDialog, mode, services, product}) => {
  const classes = useStyles();
  const [productName, setProductName] = useState('');
  const [substanceName, setSubstanceName] = useState('');
  const [substanceCode, setSubstanceCode] = useState('');
  const {t} = useTranslation();

  const create = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await services.productService.createProduct(productName, substanceName, substanceCode);
    closeDialog();
  };

  const update = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    await services.productService.updateProduct(product.id, productName, substanceName, substanceCode);
    closeDialog();
  };

  useEffect(() => {
    if (mode !== "update" || !product) return;
    setProductName(product.name);
    setSubstanceName(product.substanceName);
    setSubstanceCode(product.substanceCode);
  }, [product])

  return (
    <div>
      <ModalBox
        title={`${mode === "create" ? t('homePage.createProduct') : ''}${mode === "update" ? t('homePage.updateProduct') : ''}`}
        show={mode !== null}
        closeDialog={closeDialog}
      >
        <form
          onSubmit={(e) => {
            mode === 'create' && create(e);
            mode === 'update' && update(e);
          }}
        >
          <TextField
            className={classes.input}
            label={t('homePage.productName')}
            variant="outlined"
            size="small"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={classes.input}
            label={t('homePage.substanceName')}
            variant="outlined"
            size="small"
            value={substanceName}
            onChange={(e) => setSubstanceName(e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <TextField
            className={classes.input}
            label={t('homePage.substanceCode')}
            variant="outlined"
            size="small"
            value={substanceCode}
            onChange={(e) => setSubstanceCode(e.target.value)}
            required
            InputLabelProps={{ required: false }}
          />
          <div className="d-flex justify-content-end">
            <button className="btn btn-info mr-4" onClick={(e) => {
              e.preventDefault();
              closeDialog();
            }}>
              {t('common.cancel')}
            </button>
            <button className="btn btn-primary" type="submit">
              {mode === 'create' && t('common.create')}
              {mode === 'update' && t('common.save')}
            </button>
          </div>
        </form>
      </ModalBox>
    </div>
  );
};

export default inject('services')(observer(ProductDialog));
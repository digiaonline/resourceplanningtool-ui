import React from 'react';
import {observer} from 'mobx-react';
import {PropTypes} from 'prop-types';
import css from './styles.css';
import deleteIcon from '../assets/icon_delete.svg';

const Image = observer(({imgURL, deleteImage, onChangeImage}) => (
  <div>
    <div className={css.image__container}>
      {imgURL.length > 7 && (
        <img
          className={css.delete__image}
          src={deleteIcon}
          alt="Delete"
          onClick={deleteImage}
        />
      )}
      {imgURL.length > 7 && (
        <img className={css.uploud__image} src={imgURL} alt="project logo" />
      )}
    </div>
    <div>
      <label className={css.label__file} htmlFor="file">
        Load Image
      </label>
      <input
        className={css.input__file}
        type="file"
        id="file"
        value=""
        onChange={onChangeImage}
      />
    </div>
  </div>
));

export default Image;

Image.propTypes = {
  imgURL: PropTypes.string.isRequired,
  deleteImage: PropTypes.func.isRequired,
  onChangeImage: PropTypes.func.isRequired,
};

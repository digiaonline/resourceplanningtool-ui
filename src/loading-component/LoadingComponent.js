// @flow

import React from 'react';
import Modal from 'react-modal';
import * as PropTypes from 'prop-types';
import {PulseLoader} from 'react-spinners';

const Loading = (props: Object) => (
  <Modal isOpen={props.isOpened} style={waitingModalStyle}>
    Please wait<PulseLoader color={'white'} />
  </Modal>
);

const waitingModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    background: 'transparent',
    color: 'white',
    border: '0',
    fontSize: '34px',
    textAlign: 'center',
    padding: '20px 30px',
    maxWidth: '300px',
    maxHeight: '200px',
    margin: '150px auto auto',
  },
};

Loading.propTypes = {
  isOpened: PropTypes.bool.isRequired,
};

export default Loading;

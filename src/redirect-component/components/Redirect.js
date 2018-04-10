import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Redirect} from 'react-router';
import {PulseLoader} from 'react-spinners';
import css from './Redirect.css';

@observer
class LoadFailedRedirect extends Component {
  @observable shouldRedirect = false;

  render() {
    const redirectInfo = {
      pathname: '/*',
      state: {
        message: this.props.message,
      },
    };
    setTimeout(() => {
      this.shouldRedirect = true;
    }, 8000);
    return this.shouldRedirect ? (
      <Redirect to={redirectInfo} />
    ) : (
      <div className={css.container}>
        <span className={css.container__message}>Loading &nbsp;</span>
        <div className={css.container__animation}>
          <PulseLoader size={10} />
        </div>
      </div>
    );
  }
}

LoadFailedRedirect.propTypes = {
  message: PropTypes.string,
};

export default LoadFailedRedirect;

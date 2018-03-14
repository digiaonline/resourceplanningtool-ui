import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ProjectStore from '../../projects-container/projects-store';
import form from '../form-config';
import {Input} from './inputs';
import css from './projectModal.css';
import addIcon from '../../assets/icon_add_b.svg';

@observer
class NewsForm extends Component {
  onSubmit = async e => {
    e.preventDefault();
    const newsLink = form.$('newsLink');
    const description = form.$('newsDescription');
    if (!newsLink.hasError && !newsLink.isEmpty) {
      await ProjectStore.createNews(newsLink.value, description.value);
    }
  };

  render() {
    return (
      <div className={css.news__url}>
        <Input field={form.$('newsLink')} />
        <Input field={form.$('newsDescription')} />
        <button onClick={this.onSubmit} className={css.news__url__button}>
          <img src={addIcon} alt="add" /> <span>ADD</span>
        </button>
      </div>
    );
  }
}

export default NewsForm;

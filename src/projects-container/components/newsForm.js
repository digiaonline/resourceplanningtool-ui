import React, {Component} from 'react';
import {observer} from 'mobx-react';
import ProjectStore from '../../projects-container/projects-store';
import form from '../form-config';
import {Input} from './inputs';
import css from './projectModal.css';
import addIcon from '../../assets/icon_add_b.svg';
import deleteIcon from '../../assets/icon_delete.svg';

@observer
class NewsForm extends Component {
  onSubmit = async e => {
    e.preventDefault();
    const newsLink = form.$('newsLink');
    const description = form.$('newsDescription');
    if (!newsLink.hasError && !newsLink.isEmpty) {
      await ProjectStore.createNews(newsLink.value, description.value);
      const newsArray = form.$('newNews').value.concat(ProjectStore.newsID);
      form.$('newNews').set('value', newsArray);
    }
  };

  componentWillUpdate() {
    ProjectStore.fetchNews();
  }

  render() {
    return (
      <div>
        <div className={css.news__url}>
          <Input field={form.$('newsLink')} />
          <Input field={form.$('newsDescription')} />
          <button onClick={this.onSubmit} className={css.news__url__button}>
            <img src={addIcon} alt="add" /> <span>ADD</span>
          </button>
        </div>
        {form.$('newNews').value.map((item, i) => {
          const news = ProjectStore.allNews.filter(({id, url, description}) => {
            return id === item;
          });
          if (news[0]) {
            return (
              <div key={i} className={css.table__item}>
                <span>{news[0].description}</span>&nbsp; &nbsp;&nbsp;
                <a href={news[0].url}>{news[0].url}</a>
                <img
                  className={css.form__icon}
                  src={deleteIcon}
                  alt="delete"
                  onClick={() => ProjectStore.removeNews(news[0].id)}
                />
              </div>
            );
          }
          return <p key={Math.random()}>loading...</p>;
        })}
      </div>
    );
  }
}

export default NewsForm;

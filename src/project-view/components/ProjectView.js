import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';
import Modal from 'react-modal';

import ProjectStore from '../../projects-container/projects-store';
import PeopleStore from '../../people-container/people-store';
import CustomersStore from '../../customers-container/customers-store';
import form from '../../projects-container/form-config';
import ProjectModal from '../../projects-container/components/projectModal';
import LoadFailedRedirect from '../../redirect-component/components/Redirect';

import css from './ProjectView.css';
import backIcon from '../../assets/icon_arrow_back.svg';
import deleteIcon from '../../assets/icon_delete.svg';
import editIcon from '../../assets/icon_edit.svg';

@observer
class ProjectView extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
    ProjectStore.fetchProject(this.props.match.params.id);
    ProjectStore.fetchTechnologies();
    ProjectStore.fetchNews();
    PeopleStore.fetchPeople();
    CustomersStore.fetchCustomers();
    ProjectStore.form_name('Edit project');
    ProjectStore.projectId = this.props.match.params.id;
    ProjectStore.Redirect = false;
    ProjectStore.pictureUrl = '';
  }

  openModalAndPassData = () => {
    ProjectStore.modalToggle();
    ProjectStore.updateForm();
  };

  onConfirm = () => {
    ProjectStore.deleteProject(this.props.match.params.id);
    this.props.history.push('/projects');
  };

  render() {
    if (ProjectStore.projectData === null || !ProjectStore.projectData.name) {
      return (
        <div>
          <LoadFailedRedirect
            message={`Timeout, no Project with id "${this.props.match.params
              .id}" was found`}
          />
        </div>
      );
    }
    const Data = ProjectStore.projectData;
    return (
      <div className={css.project__view}>
        <Link className={css.back__button} to="/projects">
          <img src={backIcon} alt="back" />
          <span>Back</span>
        </Link>
        <div className={css.project__heading}>
          <div className={css.project__title}>{Data.name}</div>
          <div className={css.project__buttons}>
            <Confirm
              onConfirm={this.onConfirm}
              body="Are you sure you want to delete this?"
              confirmBSStyle="danger"
              confirmText="Confirm Delete"
              title="Delete project"
            >
              <div>
                <img src={deleteIcon} alt="delete" />
                <span>Delete</span>
              </div>
            </Confirm>
            <div onClick={this.openModalAndPassData}>
              <img src={editIcon} alt="EDIT" />
              <span>EDIT</span>
            </div>
          </div>
        </div>
        {Data.picture && (
          <img
            className={css.project__image}
            src={`http://${Data.picture}`}
            alt={Data.name}
          />
        )}
        <div className={css.general__details}>
          <div className={css.details}>
            <div className={css.detail__row}>
              <span>Contact info</span>
              {Data.contactemail}
            </div>
            <div className={css.detail__row}>
              <span>Start time</span>
              {ProjectStore.convertDate(Data.starttime)}
            </div>
            <div className={css.detail__row}>
              <span>End time</span>
              {Data.endtime ? (
                ProjectStore.convertDate(Data.endtime)
              ) : (
                'Not avalable'
              )}
            </div>
            <div className={css.detail__row}>
              <span>Project on-going</span>
              {Data.ongoing ? 'Yes' : 'No'}
            </div>
          </div>
          <div>
            <div className={css.detail__title}>Description</div>
            <p>{Data.description ? Data.description : 'Not avalable'}</p>
          </div>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>People in project</div>
          {Data.persons.length > 0 ? (
            Data.persons.map(item => (
              <Link
                to={`/people/${item.id}`}
                key={item.id}
                className={css.members__view}
              >
                {item.name}
              </Link>
            ))
          ) : (
            <div>Not avalable</div>
          )}
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>Core technologies</div>
          {Data.technologies.length > 0 ? (
            Data.technologies.map(item => (
              <span key={item.id} className={css.technologies__view}>
                {item.name}
              </span>
            ))
          ) : (
            <div>Not avalable</div>
          )}
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>Live at</div>
          <p>
            {Data.liveat ? (
              <a href={Data.liveat}>{Data.liveat}</a>
            ) : (
              <span>Not avalable</span>
            )}
          </p>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>Github</div>
          <p>
            {Data.githuburl ? (
              <a href={Data.githuburl}>{Data.githuburl}</a>
            ) : (
              <span>Not avalable</span>
            )}
          </p>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>In the news</div>
          {Data.news.length > 0 ? (
            Data.news.map(item => (
              <div key={item.id}>
                <h4>
                  {item.description ? `${item.description} :` : ''}
                  <a href={item.url}>{item.url}</a>
                </h4>
              </div>
            ))
          ) : (
            <div>Not avalable</div>
          )}
        </div>
        <ProjectModal
          form={form}
          closeModal={ProjectStore.modalToggle}
          isOpen={ProjectStore.isOpen}
        />
      </div>
    );
  }
}

export default ProjectView;

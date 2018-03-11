import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import ProjectStore from '../../projects-container/projects-store';
import PeopleStore from '../../people-container/people-store';
import CustomersStore from '../../customers-container/customers-store';
import form from '../../projects-container/form-config';
import ProjectModal from '../../projects-container/components/projectModal';
import css from './ProjectView.css';
import backIcon from '../../assets/icon_arrow_back.svg';
import deleteIcon from '../../assets/icon_delete.svg';
import editIcon from '../../assets/icon_edit.svg';

@observer
class ProjectView extends Component {
  componentWillMount() {
    ProjectStore.fetchProject(this.props.match.params.id);
    ProjectStore.fetchTechnologies();
    PeopleStore.fetchPeople();
    CustomersStore.fetchCustomers();
  }

  openModalAndPassData = () => {
    ProjectStore.modalToggle();
    ProjectStore.updateForm();
  };

  render() {
    if (!ProjectStore.projectData.name) {
      return <h1>loading...</h1>;
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
            <div>
              <img src={deleteIcon} alt="delete" />
              <span>DELETE</span>
            </div>
            <div onClick={this.openModalAndPassData}>
              <img src={editIcon} alt="EDIT" />
              <span>EDIT</span>
            </div>
          </div>
        </div>
        <div className={css.general__details}>
          <div className={css.details}>
            <div className={css.detail__row}>
              <span>Customer email</span>
              {Data.contactemail}
            </div>
            <div className={css.detail__row}>
              <span>Start time</span>
              {ProjectStore.convertDate(Data.starttime)}
            </div>
            <div className={css.detail__row}>
              <span>End time</span>
              {ProjectStore.convertDate(Data.endtime)}
            </div>
            <div className={css.detail__row}>
              <span>Project on-going</span>
              {Data.ongoing ? 'Yes' : 'Finished'}
            </div>
          </div>
          <div>
            <div className={css.detail__title}>Description</div>
            <p>{Data.description}</p>
          </div>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>People in project</div>
          <p> people</p>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>Core technologies</div>
          <p> technologies</p>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>Live at</div>
          <p>
            <a href={Data.liveat}>{Data.liveat}</a>
          </p>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>Github</div>
          <p>
            <a href={Data.githuburl}>{Data.githuburl}</a>
          </p>
        </div>
        <div className={css.detail}>
          <div className={css.detail__title}>In the news</div>
          <p> News</p>
        </div>
        <ProjectModal
          form={form}
          closeModal={ProjectStore.modalToggle}
          modalName="Edit Project"
          isOpen={ProjectStore.isOpen}
        />
      </div>
    );
  }
}

export default ProjectView;

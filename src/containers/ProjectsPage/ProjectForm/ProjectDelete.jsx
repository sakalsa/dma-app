/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { withTranslation } from 'react-i18next';
import { withProjectViewModel } from '../ProjectViewModels/ProjectViewModelContextProvider';
import { Dropdown } from 'react-bootstrap';
import { Image as ComponentImage, Button } from 'aesirx-uikit';

const ModalComponent = lazy(() => import('../../../components/Modal'));

class ProjectActionBar extends Component {
  projectsListViewModel = null;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    const { viewModel } = props;
    this.projectsListViewModel = viewModel ? viewModel.getListViewModel() : null;
  }
  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handerDeleteProject = () => {
    this.projectsListViewModel.deleteProjects();
  };

  render() {
    const { t } = this.props;
    return (
      <div className="d-flex justify-content-end">
        <Dropdown>
          <Dropdown.Toggle className="p-3" variant="info" id="actions">
            {t('choose_an_action')}
          </Dropdown.Toggle>
          <Dropdown.Menu className="w-100 shadow">
            <Dropdown.Item className="px-3 py-2" onClick={this.handleShow}>
              {t('delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ModalComponent
          closeButton
          show={this.state.show}
          onHide={this.handleClose}
          contentClassName={'bg-white shadow'}
          body={
            <div className="d-flex flex-column justify-content-center align-items-center pb-5">
              <ComponentImage className="mb-3" src="/assets/images/ep_circle-close.png" />
              <h4 className="mb-4">{t('txt_are_you_sure')}</h4>
              <p className="text-center">{t('txt_delete_assets_popup_desc')}</p>
              <div className="row">
                <div className="col-auto">
                  <Button
                    text={t('txt_Cancel')}
                    onClick={this.handleClose}
                    className="btn btn-outline-gray-300 bg-white text-blue-0 border "
                  />
                </div>
                <div className="col-auto">
                  <Button
                    text={t('txt_yes_delete')}
                    onClick={this.handerDeleteProject}
                    className="btn btn-danger "
                  />
                </div>
              </div>
            </div>
          }
        />
      </div>
    );
  }
}
export default withTranslation()(withProjectViewModel(ProjectActionBar));

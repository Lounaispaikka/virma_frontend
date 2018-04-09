import React from 'react';
import { observer } from 'mobx-react';
import { Alert } from 'react-bootstrap';

import { modal } from '../../model/store';

import { ManageUsersModal } from './adminToolModals/ManageUsersModal';
import { ManageFeaturesModal } from './adminToolModals/ManageFeaturesModal';
import { ApproveFeaturesModal } from './adminToolModals/ApproveFeaturesModal';

import InfoModal from './utilModals/InfoModal';
import { SuccessAlert } from './utilModals/SuccessAlert';
import { ErrorAlert } from './utilModals/ErrorAlert';

const UtilModalContainer = observer(() => {
  if (modal.showInfo) {
    return (<InfoModal />);
  }

  if (modal.showSuccess) {
    return (<SuccessAlert />);
  }

  if (modal.showError) {
    return (<ErrorAlert />);
  }

  if (modal.showUsersModal) {
    return (
      <ManageUsersModal
        showManageUsersModal={modal.showUsersModal}
        hideManageUsersModal={modal.hideManageUsersModal}
      />
    );
  }

  if (modal.showFeaturesModal) {
    return (
      <ManageFeaturesModal
        showManageFeaturesModal={modal.showFeaturesModal}
        hideManageFeaturesModal={modal.hideManageFeaturesModal}
      />
    );
  }

  if (modal.showApproveModal) {
    return (
      <ApproveFeaturesModal
        showApproveFeaturesModal={modal.showApproveModal}
        hideApproveFeaturesModal={modal.hideApproveFeaturesModal}
      />
    );
  }

  return null;
});

export default UtilModalContainer;

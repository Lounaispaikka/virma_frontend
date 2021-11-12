import { observable, action } from 'mobx';

export default class Info {
  @observable showUsersModal = false;
  @observable showSearchModal = false;
  @observable showFeaturesModal = false;
  @observable showApproveModal = false;

  @observable showInfo = false;
  @observable showAlert = false;
  @observable showSuccess = false;
  @observable showError = false;

  @observable infoContent = '';
  @observable successContent = '';
  @observable errorContent = '';

  // Show modal actions
  @action.bound showManageUsersModal() { this.showUsersModal = true; }
  @action.bound showSearchTargetsModal() { this.showSearchModal = true; }
  @action.bound showManageFeaturesModal() { this.showFeaturesModal = true; }
  @action.bound showApproveFeaturesModal() { this.showApproveModal = true; }
  @action.bound showInfoModal(msg) { this.showInfo = true; this.infoContent = msg; }

  @action.bound showSuccessAlert(msg) { this.showSuccess = true; this.successContent = msg; }
  @action.bound showErrorAlert(msg) { this.showError = true; this.errorContent = msg; }

  // Hide modal actions
  @action.bound hideManageUsersModal(e) { e.preventDefault(); this.showUsersModal = false; }
  @action.bound hideSearchTargetsModal() { this.showSearchModal = false; }
  @action.bound hideManageFeaturesModal() { this.showFeaturesModal = false; }
  @action.bound hideApproveFeaturesModal() { this.showApproveModal = false; }
  @action.bound hideInfoModal() { this.showInfo = false; this.infoContent = ''; }

  @action.bound hideSuccessAlert() { this.showSuccess = false; this.successContent = ''; }
  @action.bound hideErrorAlert() { this.showError = false; this.errorContent = ''; }

}

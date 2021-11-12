import { observable, action } from 'mobx';

export default class Map {
  @observable mapReference = null;

  @observable isCreateOn = false;
  @observable createType = '';

  @observable buttonCreateOn = false;
  @observable buttonCreateType = '';

  @observable featureSelected = false;
  @observable toggleEditState = false;
  @observable manageFeature = false;
  @observable stopEdit = false;
  @observable checkFormEditOn = false;
  @observable formState = null;
  @observable bounds = null;

  @action.bound
  createOn(e, type) {
    e.preventDefault();
    this.isCreateOn = true;
    this.createType = type;
    this.buttonCreateOn = true;
    this.buttonCreateType = type;
  }

  @action.bound
  createOff() {
    this.isCreateOn = false;
    this.createType = '';
  }

  @action.bound
  createOffButtonStyling() {
    this.buttonCreateOn = false;
    this.buttonCreateType = '';
  }

  @action.bound
  setFeatureSelected(bool) {
    this.featureSelected = bool;
  }

  @action.bound
  manageTargetFeature() {
    this.manageFeature = !this.manageFeature;
  }

  @action.bound
  startEditFeature() {
    this.toggleEditState = true;
  }

  @action.bound
  stopEditFeature() {
    this.stopEdit = !this.stopEdit;
    this.toggleEditState = false;
  }

  @action.bound
  toggleFormEdit(bool, formState = null) {
    this.checkFormEditOn = bool;
    this.formState = formState;
  }

  
  @action.bound
  fitBounds(bounds) {
    console.log("map.fitBounds",bounds);
    this.bounds=bounds;
  }
}

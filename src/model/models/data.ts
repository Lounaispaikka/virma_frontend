import { observable, action, computed } from 'mobx';
import 'whatwg-fetch';

import { login, modal } from '../store';
import { appUrls } from '../../config';

export default class Data {
  @observable.shallow points = [];
  @observable.shallow lines = [];
  @observable.shallow areas = [];

  @observable.shallow pointsApproval = [];
  @observable.shallow linesApproval = [];
  @observable.shallow areasApproval = [];

  @observable.shallow pointsUser = [];
  @observable.shallow linesUser = [];
  @observable.shallow areasUser = [];

  @computed get pointUpdate() { return this.points }
  @computed get lineUpdate() { return this.lines }
  @computed get areaUpdate() { return this.areas }

  @computed get pointApprovalUpdate() { return this.pointsApproval }
  @computed get lineApprovalUpdate() { return this.linesApproval }
  @computed get areaApprovalUpdate() { return this.areasApproval}

  @computed get pointUserUpdate() { return this.pointsUser }
  @computed get lineUserUpdate() { return this.linesUser }
  @computed get areaUserUpdate() { return this.areasUser }

  fetchRequest(url, options, resultArray) {
    return fetch(url, options).then(response => response.json())
    .then(response => {
      resultArray.replace(resultArray.concat(response));
    }).catch(error => {
      console.log(error);
      modal.showErrorAlert('Tasoja ei pystytty hakemaan.');
    });
  }

  updateFeatures(featureDetails, type, approval) {
    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gid: featureDetails.gid, approval: approval })
    };

    if (type === 'point') {
      approval ? this.sendUpdateRequest(appUrls.pointIndividual, this.pointsApproval, featureDetails, queryOptions) :
        this.sendUpdateRequest(appUrls.pointIndividual, this.points, featureDetails, queryOptions);
    } else if (type === 'line') {
      approval ? this.sendUpdateRequest(appUrls.lineIndividual, this.linesApproval, featureDetails, queryOptions) :
        this.sendUpdateRequest(appUrls.lineIndividual, this.lines, featureDetails, queryOptions);
    } else if (type === 'polygon') {
      approval ? this.sendUpdateRequest(appUrls.areaIndividual, this.areasApproval, featureDetails, queryOptions) :
        this.sendUpdateRequest(appUrls.areaIndividual, this.areas, featureDetails, queryOptions);
    }
  }

  sendUpdateRequest(url, layer, feature, queryOptions) {
    layer.forEach((item, idx) => {
      if (item.gid === feature.gid) {
        layer.splice(idx, 1);
        this.fetchRequest(url, queryOptions, layer);
      }
    });
  }

  updateApprovalFeatures(features) {
    this.removeFeatures('approval', null, features);
    this.addApprovalFeatures(features);
  }

  @action.bound
  addFeatures(type, class1_fi, class2_fi) {
    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ class1_fi: class1_fi, class2_fi: class2_fi })
    };

    if (type === 'point') {
      this.fetchRequest(appUrls.pointsClass1_2, queryOptions, this.points);
    } else if (type === 'line') {
      this.fetchRequest(appUrls.linesClass1_2, queryOptions, this.lines);
    } else if (type === 'polygon') {
      this.fetchRequest(appUrls.areasClass1_2, queryOptions, this.areas);
    } else if (type === 'approval') {
      this.addApprovalFeatures(class2_fi);
    } else if (type === 'all') {
      this.addUserFeatures(class2_fi);
    }
  }

  @action.bound
  addApprovalFeatures(features) {
    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ loggedUser: login.loggedUser, isAdmin: login.isAdmin })
    };

    if (features === 'Pistekohteet') {
      this.fetchRequest(appUrls.pointApprovals, queryOptions, this.pointsApproval);
    } else if (features === 'Reittikohteet') {
      this.fetchRequest(appUrls.lineApprovals, queryOptions, this.linesApproval);
    } else if (features === 'Aluekohteet') {
      this.fetchRequest(appUrls.areaApprovals, queryOptions, this.areasApproval);
    }
  }

  @action.bound
  addUserFeatures(features) {
    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ updater_id: login.updater_id, isAdmin: login.isAdmin })
    };

    if (features === 'Pistekohteet') {
      this.fetchRequest(appUrls.pointsUser, queryOptions, this.pointsUser);
    } else if (features === 'Reittikohteet') {
      this.fetchRequest(appUrls.linesUser, queryOptions, this.linesUser);
    } else if (features === 'Aluekohteet') {
      this.fetchRequest(appUrls.areasUser, queryOptions, this.areasUser);
    }
  }

  @action.bound
  addAllFeatures(type, class1_fi) {
    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ class1_fi: class1_fi })
    };

    if (type === 'point') {
      this.fetchRequest(appUrls.pointsClass1, queryOptions, this.points);
    } else if (type === 'line') {
      this.fetchRequest(appUrls.linesClass1, queryOptions, this.lines);
    } else if (type === 'polygon') {
      this.fetchRequest(appUrls.areasClass1, queryOptions, this.areas);
    } else if (type === 'approval') {
      this.addAllApprovalFeatures();
    } else if (type === 'all') {
      this.addAllUserFeatures();
    }
  }

  @action.bound
  addAllApprovalFeatures() {
    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ loggedUser: login.loggedUser, isAdmin: login.isAdmin })
    };

    this.fetchRequest(appUrls.pointApprovals, queryOptions, this.pointsApproval);
    this.fetchRequest(appUrls.lineApprovals, queryOptions, this.linesApproval);
    this.fetchRequest(appUrls.areaApprovals, queryOptions, this.areasApproval);
  }

  @action.bound
  addAllUserFeatures() {
    const queryOptions: any = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ updater_id: login.updater_id, isAdmin: login.isAdmin })
    };

    this.fetchRequest(appUrls.pointsUser, queryOptions, this.pointsUser);
    this.fetchRequest(appUrls.linesUser, queryOptions, this.linesUser);
    this.fetchRequest(appUrls.areasUser, queryOptions, this.areasUser);
  }

  @action.bound
  removeFeatures(type, class1_fi, class2_fi) {
    if (type === 'point') {
      this.points.replace(this.points.filter(feature => {
        if (feature.class1_fi === class1_fi && feature.class2_fi === class2_fi) { return false; }
        return true;
      }));
    } else if (type === 'line') {
      this.lines.replace(this.lines.filter(feature => {
        if (feature.class1_fi === class1_fi && feature.class2_fi === class2_fi) { return false; }
        return true;
      }));
    } else if (type === 'polygon') {
      this.areas.replace(this.areas.filter(feature => {
        if (feature.class1_fi === class1_fi && feature.class2_fi === class2_fi) { return false; }
        return true;
      }));
    } else if (type === 'approval') {
      if (class2_fi === 'Pistekohteet') {
        this.pointsApproval = [];
      } else if (class2_fi === 'Reittikohteet') {
        this.linesApproval = [];
      } else if (class2_fi === 'Aluekohteet') {
        this.areasApproval = [];
      }
    } else if (type === 'all') {
      if (class2_fi === 'Pistekohteet') {
        this.pointsUser = [];
      } else if (class2_fi === 'Reittikohteet') {
        this.linesUser = [];
      } else if (class2_fi === 'Aluekohteet') {
        this.areasUser = [];
      }
    }
  }

  @action.bound
  removeAllFeatures(type, class1_fi) {
    if (type === 'point') {
      this.points.replace(this.points.filter(feature => {
        if (feature.class1_fi === class1_fi) { return false; }
        return true;
      }));
    } else if (type === 'line') {
      this.lines.replace(this.lines.filter(feature => {
        if (feature.class1_fi === class1_fi) { return false; }
        return true;
      }));
    } else if (type === 'polygon') {
      this.areas.replace(this.areas.filter(feature => {
        if (feature.class1_fi === class1_fi) { return false; }
        return true;
      }));
    } else if (type === 'approval') {
      this.pointsApproval = [];
      this.linesApproval = [];
      this.areasApproval = [];
    } else if (type === 'all') {
      this.pointsUser = [];
      this.linesUser = [];
      this.areasUser = [];
    }
  }
}

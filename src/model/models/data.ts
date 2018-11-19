import { observable, action, computed } from 'mobx';
import 'whatwg-fetch';

import { login, modal } from '../store';
import { appUrls } from '../../config/config';
import { postOptions } from '../../config/fetchConfig';

import {
  POINT,
  LINESTRING,
  POLYGON,
  APPROVAL,
  ALL,
  POINT_FEATURES,
  LINE_FEATURES,
  AREA_FEATURES,
} from '../../config/constants';

export default class Data {
  @observable.shallow points: any = [];
  @observable.shallow lines: any = [];
  @observable.shallow areas: any = [];

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
      }).catch(() => {
        modal.showErrorAlert('Tasoja ei pystytty hakemaan.');
      });
  }

  updateFeatures(featureDetails, type, approval) {
    postOptions.body = JSON.stringify({ gid: featureDetails.gid, approval: approval });

    if (type === POINT) {
      approval ? this.sendUpdateRequest(appUrls.pointIndividual, this.pointsApproval, featureDetails, postOptions) :
        this.sendUpdateRequest(appUrls.pointIndividual, this.points, featureDetails, postOptions);
    } else if (type === LINESTRING) {
      approval ? this.sendUpdateRequest(appUrls.lineIndividual, this.linesApproval, featureDetails, postOptions) :
        this.sendUpdateRequest(appUrls.lineIndividual, this.lines, featureDetails, postOptions);
    } else if (type === POLYGON) {
      approval ? this.sendUpdateRequest(appUrls.areaIndividual, this.areasApproval, featureDetails, postOptions) :
        this.sendUpdateRequest(appUrls.areaIndividual, this.areas, featureDetails, postOptions);
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
    this.removeFeatures(APPROVAL, null, features);
    this.addApprovalFeatures(features);
  }

  @action.bound
  addFeatures(type, class1_fi, class2_fi) {
    postOptions.body = JSON.stringify({ class1_fi: class1_fi, class2_fi: class2_fi });

    if (type === POINT) {
      this.fetchRequest(appUrls.pointsClass1_2, postOptions, this.points);
    } else if (type === LINESTRING) {
      this.fetchRequest(appUrls.linesClass1_2, postOptions, this.lines);
    } else if (type === POLYGON) {
      this.fetchRequest(appUrls.areasClass1_2, postOptions, this.areas);
    } else if (type === APPROVAL) {
      this.addApprovalFeatures(class2_fi);
    } else if (type === ALL) {
      this.addUserFeatures(class2_fi);
    }
  }

  @action.bound
  addApprovalFeatures(features) {
    postOptions.body = JSON.stringify({ loggedUser: login.loggedUser, isAdmin: login.isAdmin });

    if (features === POINT_FEATURES) {
      this.fetchRequest(appUrls.pointApprovals, postOptions, this.pointsApproval);
    } else if (features === LINE_FEATURES) {
      this.fetchRequest(appUrls.lineApprovals, postOptions, this.linesApproval);
    } else if (features === AREA_FEATURES) {
      this.fetchRequest(appUrls.areaApprovals, postOptions, this.areasApproval);
    }
  }

  @action.bound
  addUserFeatures(features) {
    postOptions.body = JSON.stringify({ updater_id: login.updater_id, isAdmin: login.isAdmin });

    if (features === POINT_FEATURES) {
      this.fetchRequest(appUrls.pointsUser, postOptions, this.pointsUser);
    } else if (features === LINE_FEATURES) {
      this.fetchRequest(appUrls.linesUser, postOptions, this.linesUser);
    } else if (features === AREA_FEATURES) {
      this.fetchRequest(appUrls.areasUser, postOptions, this.areasUser);
    }
  }

  @action.bound
  addAllFeatures(type, class1_fi) {
    postOptions.body = JSON.stringify({ class1_fi: class1_fi });

    if (type === POINT) {
      this.fetchRequest(appUrls.pointsClass1, postOptions, this.points);
    } else if (type === LINESTRING) {
      this.fetchRequest(appUrls.linesClass1, postOptions, this.lines);
    } else if (type === POLYGON) {
      this.fetchRequest(appUrls.areasClass1, postOptions, this.areas);
    } else if (type === APPROVAL) {
      this.addAllApprovalFeatures();
    } else if (type === ALL) {
      this.addAllUserFeatures();
    }
  }

  @action.bound
  addAllApprovalFeatures() {
    postOptions.body = JSON.stringify({ loggedUser: login.loggedUser, isAdmin: login.isAdmin });

    this.fetchRequest(appUrls.pointApprovals, postOptions, this.pointsApproval);
    this.fetchRequest(appUrls.lineApprovals, postOptions, this.linesApproval);
    this.fetchRequest(appUrls.areaApprovals, postOptions, this.areasApproval);
  }

  @action.bound
  addAllUserFeatures() {
    postOptions.body = JSON.stringify({ updater_id: login.updater_id, isAdmin: login.isAdmin });

    this.fetchRequest(appUrls.pointsUser, postOptions, this.pointsUser);
    this.fetchRequest(appUrls.linesUser, postOptions, this.linesUser);
    this.fetchRequest(appUrls.areasUser, postOptions, this.areasUser);
  }

  @action.bound
  removeFeatures(type, class1_fi, class2_fi) {
    if (type === POINT) {
      this.points.replace(this.points.filter(feature => {
        if (feature.class1_fi === class1_fi && feature.class2_fi === class2_fi) { return false; }
        return true;
      }));
    } else if (type === LINESTRING) {
      this.lines.replace(this.lines.filter(feature => {
        if (feature.class1_fi === class1_fi && feature.class2_fi === class2_fi) { return false; }
        return true;
      }));
    } else if (type === POLYGON) {
      this.areas.replace(this.areas.filter(feature => {
        if (feature.class1_fi === class1_fi && feature.class2_fi === class2_fi) { return false; }
        return true;
      }));
    } else if (type === APPROVAL) {
      if (class2_fi === POINT_FEATURES) this.pointsApproval = [];
      else if (class2_fi === LINE_FEATURES) this.linesApproval = [];
      else if (class2_fi === AREA_FEATURES) this.areasApproval = [];
    } else if (type === ALL) {
      if (class2_fi === POINT_FEATURES) this.pointsUser = [];
      else if (class2_fi === LINE_FEATURES) this.linesUser = [];
      else if (class2_fi === AREA_FEATURES) this.areasUser = [];
    }
  }

  @action.bound
  removeAllFeatures(type, class1_fi) {
    if (type === POINT) {
      this.points.replace(this.points.filter(feature => {
        if (feature.class1_fi === class1_fi) { return false; }
        return true;
      }));
    } else if (type === LINESTRING) {
      this.lines.replace(this.lines.filter(feature => {
        if (feature.class1_fi === class1_fi) { return false; }
        return true;
      }));
    } else if (type === POLYGON) {
      this.areas.replace(this.areas.filter(feature => {
        if (feature.class1_fi === class1_fi) { return false; }
        return true;
      }));
    } else if (type === APPROVAL) {
      this.pointsApproval = [];
      this.linesApproval = [];
      this.areasApproval = [];
    } else if (type === ALL) {
      this.pointsUser = [];
      this.linesUser = [];
      this.areasUser = [];
    }
  }
}

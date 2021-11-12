import React from 'react';
import { observer } from 'mobx-react';
import { Popup } from 'react-leaflet';
import { Button } from 'react-bootstrap';
import validator from 'validator';

declare const L: any; // Some hack that works for including L & L.draw

import { login, map } from '../../model/store';
import { AREA, LINESTRING, POINT } from '../../config/constants';

import '../../../css/mapFeature.css!';
import '../../../css/customBootstrap.css!';

const NO_LINK = 'Linkkiä ei saatavilla';
const NON_EXIST = 'Tietoa ei saatavilla';

@observer
export class FeaturePopup extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getLink() {
    const { featureInfo } = this.props;

    return featureInfo.www_fi ?
      (validator.isURL(featureInfo.www_fi) ? <a href={featureInfo.www_fi} target="_blank">Linkki sivulle</a> : NO_LINK)
      : NO_LINK;
  }

  render() {
    const { featureInfo, type } = this.props;

    let okToModify = false;
    if (featureInfo.updater_id) {
      const updaters = featureInfo.updater_id.replace(/ /g, '').split(",");
      updaters.forEach((update) => {
        if (login.updater_id === update) {
          okToModify = true;
        }
      });
    }

    const name_fi = featureInfo.name_fi ? featureInfo.name_fi : NON_EXIST;
    const address = featureInfo.address ? featureInfo.address : NON_EXIST;
    const municipali = featureInfo.municipali ? featureInfo.municipali : NON_EXIST;
    const info_fi = featureInfo.info_fi ? featureInfo.info_fi : NON_EXIST;
    const ownerclass = featureInfo.ownerclass ? featureInfo.ownerclass : NON_EXIST;
    const upkeepclas = featureInfo.upkeepclas ? featureInfo.upkeepclas : NON_EXIST;
    const timestamp = featureInfo.timestamp ? featureInfo.timestamp : NON_EXIST;
    const length_m = featureInfo.length_m ? featureInfo.length_m : NON_EXIST;
    const picture = featureInfo.www_picture ? featureInfo.www_picture : false;
    const picture_info = featureInfo.picture ? featureInfo.picture : false;

    return (
      <Popup
        closeButton={false}
        keepInView={false}
        autoPanPadding={new L.Point(100, 100)}
        maxWidth={350}
      >
        <div className="featurePopup">
          <h4>{featureInfo.class1_fi}{' - '}{featureInfo.class2_fi}</h4>

          <ul>
            <li><b>Nimi: </b>{name_fi}</li>
            <li><b>Osoite: </b>{address}</li>
            <li><b>Kunta: </b>{municipali}</li>
            <li><b>Kuvaus: </b>{info_fi}</li>
            <li><b>Websivut: </b>{this.getLink()}</li>
            {type.toLowerCase().indexOf(LINESTRING) >= 0 &&
              <li><b>Reitin pituus: </b>{length_m}</li>
            }
            <li><b>Omistusluokka: </b>{ownerclass}</li>
            <li><b>Ylläpitoluokka: </b>{upkeepclas}</li>
            <li><b>Päivitetty: </b>{timestamp}</li>
            {picture &&
              <>
                <li><b>Kuva: </b><br/><img src={picture} width="128px"></img></li>
                <li><b>Kuvan tiedot: </b>{picture_info}</li>
              </>
            }
          </ul>

          {(map.featureSelected && (login.isAdmin || okToModify)) &&
            <div className={"featurePopupButton"}>
              {!map.toggleEditState && <Button id={"square-button-primary"} bsSize={"small"} bsStyle={"primary"} onClick={map.manageTargetFeature} block>Avaa kohteen hallinta</Button>}
            </div>
          }
        </div>
      </Popup>
    );
  }
}

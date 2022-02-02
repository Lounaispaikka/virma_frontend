import React from 'react';
import { observer } from 'mobx-react';
import imageReducer from 'image-blob-reduce';

const reduce = imageReducer();

import ControlSelectClasses from '../formUtils/ControlSelectClasses';
import ControlText from '../formUtils/ControlText';
import { ControlLabel } from 'react-bootstrap';
import ControlFile from '../formUtils/ControlFile';
import { ControlCheckbox } from '../formUtils/ControlCheckbox';

import { NO_ADDRESS, HIDDEN, ADDRESS, PICTURE } from '../../../../config/constants';

import { appUrls } from '../../../../config/config';
import { handleHttpErrorsGeneric } from '../../../../utils';
import { postOptions } from '../../../../config/fetchConfig';

@observer
export class BasicInfo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showAddress: this.props.parentState[NO_ADDRESS] === 'T' ? true : false,
      hidden: this.props.parentState[HIDDEN],
    };
  }

  handleCheckbox = (e) => {
    this.setState({ showAddress: !this.state.showAddress });
    e.target.value = this.state.showAddress ? 'T' : 'F';

    this.props.formConfig.forEach(() => {
      if (e.target.id === NO_ADDRESS) {
        this.props.formConfig.find(conf => conf.attr === ADDRESS).formError = this.state.showAddress ? true : false;
        this.props.formConfig.find(conf => conf.attr === ADDRESS).canBeUndefined = this.state.showAddress ? false : true;
      }
    });

    this.props.handleFormChange(e);
  }

  handleHiddenCheckbox = (e) => {
    const { hidden } = this.state;
    const { handleFormChange, formConfig } = this.props;

    this.setState({ hidden: !hidden });
    e.target.value = !hidden;

    handleFormChange(e);
  }





  handleFileUploading = (evt) => {
    const { hidden } = this.state;
    const { handleFormChange, formConfig } = this.props;
    const target = (evt.target as HTMLInputElement);

    const file = target.files && target.files[0];

    // construct a dummy event...
    var e = {
      target: {
        id: target.id,
        value: "https://via.placeholder.com/300x200.jpg?text=processing",
      }
    };

    handleFormChange(e);

    // preview the image in the meanwhile
    if (!file) {
      return;
    }

    const url_file = URL.createObjectURL(file);

    // verify at least clientside it's an image
    //var img = new Image();

    //img.src = url;

    //img.onload = (e3) => {

    reduce
      .toBlob(file, { max: 480 })
      .then(blob => {
        //const resizedCanvas = document.createElement("canvas")
        //resizedCanvas.height = 640
        //resizedCanvas.width = 480
        const url_blob_resized = URL.createObjectURL(blob);
        //var p = pica();

        //p.resize(img, resizedCanvas, {          })
        //    .then(result => p.toBlob(result, "image/jpg", 0.7))

        let reader = new FileReader();

        reader.onload = () => {
          this.setState({ www_picture: url_file });

          const options: any = postOptions;
          options.body = JSON.stringify({ featureType: "point", featureId: 123, image: reader.result });

          // start uploading image..
          fetch(appUrls.featureUploadImage, options)
            .then(handleHttpErrorsGeneric)
            .then(response => response.json())
            .then((response) => {
              console.log("success uploading", response, response.url);
              const url = response.url ? response.url : "https://via.placeholder.com/300x200.jpg?text=uploadfail";
              this.setState({ www_picture: url });

              e.target.value = url;
              handleFormChange(e);
            }).catch((e) => {
              alert(e);

              this.setState({ www_picture: "https://via.placeholder.com/300x200.jpg?text=uploadfail" });

              e.target.value = "https://via.placeholder.com/300x200.jpg?text=uploadfail";
              handleFormChange(e);

              console.log(e);
            });
        };
        reader.readAsDataURL(blob);

      });


  }

  getClass2Options(layer) {
    for (let i = 0; i < layer.length; i++) {
      if (layer[i].name_fi === this.props.parentState.class1_fi) {
        return layer[i].features;
      }
    }
  }

  render() {
    const { formConfig, formType, parentState, handleFormChange, layers, sortTabContent } = this.props;
    const tabContent = formConfig.sort(sortTabContent);

    return (
      <div className={"createModalBodyTab"}>
        {tabContent.map((info, idx) => {
          if (this.state.showAddress && info.attr === ADDRESS) {
            return null;
          }

          if (info.addedToForm && info.tab === 1) {
            if (info.type === 'select') {
              if (info.attr.indexOf('class1') >= 0) {
                return (
                  <ControlSelectClasses
                    key={idx}
                    controlName={info.desc}
                    formName={info.attr}
                    disabled={false}
                    stateValue={parentState[info.attr]}
                    handleChange={handleFormChange}
                    optionValues={layers}
                  />
                );
              } else if (info.attr.indexOf('class2') >= 0) {
                return (
                  <ControlSelectClasses
                    key={idx}
                    controlName={info.desc}
                    formName={info.attr}
                    disabled={false}
                    stateValue={parentState[info.attr]}
                    handleChange={handleFormChange}
                    optionValues={this.getClass2Options(layers)}
                  />
                );
              }
            }

            if (info.attr === NO_ADDRESS) {
              return (
                <ControlCheckbox
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  checkboxValue={this.state.showAddress}
                  handleChange={this.handleCheckbox}
                  formType={formType}
                />
              );
            }


            if (info.attr === HIDDEN) {
              return (
                <ControlCheckbox
                  key={idx}
                  controlName={info.desc}
                  formName={info.attr}
                  stateValue={parentState[info.attr]}
                  checkboxValue={this.state.hidden ? true : false}
                  displayFormError={info.formError}
                  handleChange={this.handleHiddenCheckbox}
                  formType={formType}
                />
              );
            }

            if (info.attr === PICTURE) {
              return (
                <>
                  <ControlLabel>{"Kohteen kuva"}</ControlLabel>
                  <br/>
                  <img style={{ maxHeight: "128px", maxWidth: "128px" }} src={parentState[info.attr]} />
                  <br/>
                  <ControlFile
                    key={idx}
                    formName={info.attr}
                    handleChange={this.handleFileUploading}
                    formType={formType}
                  />
                  <ControlText
                    key={idx}
                    controlName={"Kuvan URL"}
                    formName={info.attr}
                    readOnly={false}
                    stateValue={parentState[info.attr]}
                    handleChange={handleFormChange}
                    displayFormError={info.formError}
                    placeholder={"https://esimerkki.fi/kuva.jpg"}
                    formType={formType}
                  />

                </>
              );
            }

            return (
              <ControlText
                key={idx}
                controlName={info.desc}
                formName={info.attr}
                readOnly={false}
                stateValue={parentState[info.attr]}
                handleChange={handleFormChange}
                displayFormError={info.formError}
                placeholder={null}
                formType={formType}
              />
            );
          }

          return null;
        })}
      </div>
    );
  }
}

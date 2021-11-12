# Virma frontend
This repository contains frontend source code for Virma application. Application is hosted at https://virma.lounaistieto.fi.

# Getting started

## Prerequisities
Frontend is written with TypeScript. 
However, the full utility of writing proper typed JavaScript is not implemented on this application. 
Application is built with TypeScript and bundled with cBuild (https://github.com/charto/cbuild) which is built on SystemJs. 
Built and bundled content is injected to HTML dom by using dojo (https://dojotoolkit.org/). 
Since were are using Node package management (npm) application requires Node.js to be installed.


## Installing and running frontend
Frontend is made primarily with React framework with mobx state management. 
Other used frameworks are Leaflet & React-bootstrap.
**As of 2021** several packages are outdated/depreciated and many dependencies are therefore left not updated.

```bash
# Frontend requires TypeScript. Install it globally by running
npm install -g typescript@2.8.1

## You MAY also need the following (TODO)
# react-native-cli@2.0.1
# sequelize-cli@6.2.0
# expo-cli@3.15.5
# node-gyp@8.0.0
# node-sass@5.0.0


#Install bundler

( cd bundler && npm install )

#Install npm packages

npm ci # (or npm install) Know the difference: https://stackoverflow.com/questions/52499617/what-is-the-difference-between-npm-install-and-npm-ci

# Run build and then run bundle -> creates bundle file /dist/bundle.js
# Then runs a test web server

npm run build && npm run bundle && npm start

# By default running at http://localhost:8080
```

# Development
Development can be done locally by first configuring necessary config files to pointing a locally, VM or server run database (PostgreSQL + PostGIS). 
Config changes are needed for frontend & backend. In frontend by modifying /src/config.ts and in backend /config.js.
Sending email locally is not possible unless properly configured.

## Mapproxy
Mapproxy dependency can be avoided by using publicly avaible tileservice (e.g. Kapsi). 

**Production should use / uses mapproxy! This needs to be configured manually in production!


## Autoreload
During development, it is not necessary to build & bundle the application everytime when making modifications to the application.
System.js will automatically build the application when page is refreshed. 
However, **if the application is already built**, it is necessary to remove `bundle.js` file from `/dist/bundle.js` in order to run the application with the latest built changes.

## Adding new npm packages 

This may require manual labor for setting them up for System.js & TypeScript:

```
1. Install package normally and add typings:

$ npm install --save leaflet @types/leaflet

2. Add package manually to config-npm.js file (copy from other examples)
3. Make sure that install was successfull by running npm run build & npm run bundle
4. If error messages are shown at console, some other packages may need to be installed manually (error messages are complaining about missing package/s)
```


## Repository structure

```
.
|-- bin                       Express server used for hosting static content
|-- bundler                   Contains https://github.com/charto/cbuild bundler for building application
|-- css                       Stylesheets
|-- images                    Static images
|-- src
|   |-- components            Contains all of the React components
|   |   |-- layers            Feature related components
|   |   |-- modals            Modal related components (adminTools, featureModals, loginModals, utilModals etc.)
|   |-- config
|   |   |-- formConfig        Contains all configuration needed for making slight modifications for form content
|   |   |-- layerConfig       Contains all classes assigned for each layer feature type
|   |   |-- messageConfig     Contains notification messages and info modal content
|   |   |-- config.ts         API, Backgroundmap urls
|   |-- model
|   |   |-- models            Contains mobx state management
|   |-- App.tsx               Render ReactDOM
|   |-- tsconfig.json         TypeScript config
|-- vendor                    Folder consists manually loaded npm packages created by https://github.com/jjrv
|-- config-base.js            System.js configuration file
|-- config-npm.js             System.js configuration file for mapping npm packages
|-- config.js                 System.js configutation file
|-- package.json              Configure npm package & scripts
```

# License
Virma is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT)

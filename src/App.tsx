import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

import { LeafletMap } from './components/LeafletMap';
import { Sidebar } from './components/Sidebar';

import '../css/app.css!';

const renderApp = () => (
  <div className={'appContainer'}>
    <div className={'sidebarContainer'}>
      <Sidebar />
    </div>
    <div className={'mapContainer'}>
      <LeafletMap />
    </div>
  </div>
);

export class App {
  constructor() {
    const node = document.createElement('div');    
    node.id = 'root';

    document.body.appendChild(node);

    ReactDOM.render(
      renderApp(),
      document.getElementById('root')
    );
  }
}

new App();

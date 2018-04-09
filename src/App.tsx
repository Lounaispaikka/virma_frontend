import 'core-js/fn/object/assign';
import React from 'react';

import { AppLayout } from './AppLayout';
import { ReactWidget } from './ReactWidget';
import { DockLayout } from '@phosphor/widgets';

import { LeafletMap } from './components/LeafletMap';
import { Sidebar } from './components/Sidebar';

import '../css/app.css!';

export class App {
  constructor() {
    const map = new ReactWidget(<LeafletMap />);
    const sidebar = new ReactWidget(<Sidebar />);

    map.addClass('mapContainer');
    sidebar.addClass('sidebarContainer');

    this.layout.mainArea.addWidget(
      map,
      { placement: 'backdrop' }
    );

    this.layout.dockPanel.addWidget(
      sidebar,
      { mode: 'split-left', ref: this.layout.mainArea }
    );

    const layout = this.layout.dockPanel.saveLayout();
    const sizes: number[] = (layout.main as DockLayout.ISplitAreaConfig).sizes;

    sizes[0] = 0.01;
    sizes[1] = 0.8;
    this.layout.dockPanel.restoreLayout(layout);
  }

  layout = new AppLayout(document.body);
}

new App();

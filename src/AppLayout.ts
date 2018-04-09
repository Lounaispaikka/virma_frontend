import '@phosphor/dragdrop/style/index.css!';
import '@phosphor/widgets/style/index.css!';
import 'phosphor-float-area/style/index.css!';
import '../css/phosphor/index.css!';
import '../css/content.css!';

import { Widget, DockPanel } from '@phosphor/widgets';
import { FloatArea } from 'phosphor-float-area';

export class AppLayout {

	constructor(element: HTMLElement) {
		this.dockPanel.id = 'main';
		this.dockPanel.addWidget(this.mainArea);

		Widget.attach(this.dockPanel, element);

		window.onresize = () => this.dockPanel.update();
	}

	dockPanel = new DockPanel();
	mainArea = new FloatArea();
}

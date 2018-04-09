import React from 'react';
import ReactDOM from 'react-dom';

import { Widget } from '@phosphor/widgets';

export class ReactWidget extends Widget {

	static createNode(): HTMLElement {
		const node = document.createElement('div');
		return(node);
	}

	constructor(private element: JSX.Element) {
		super({ node: ReactWidget.createNode() });

		const component = ReactDOM.render(element, this.node);

		if (component instanceof React.Component) this.component = component;
	}

	onResize(msg: Widget.ResizeMessage) {
		if (this.component) this.component.render();
	}

	private component: React.Component<any, any>;

}

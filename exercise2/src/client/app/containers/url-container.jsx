import React, { Component } from 'react';
// import fetch from 'whatwg-fetch';

import SubmitURLForm from '../components/submit-url-form.jsx';
import LinkList from '../components/link-list.jsx';

class URLContainer extends Component {
	constructor() {
		super();

		this.state = {
			'url': null,
			'links': null
		}
	}

	componentWillMount() {
		document.addEventListener('url.url.changed', this.changeURL.bind(this));
		document.addEventListener('url.links.changed', this.changeLinks.bind(this));
	}

	componentWillDismount() {
		document.removeEventListener('url.url.changed', this.changeURL);
		document.removeEventListener('url.links.changed', this.changeLinks);
	}

	changeState(key, value) {
		let new_state = this.state; // copy existing state to modify (could immutable here)
		new_state[key] = value;
		this.setState(new_state);
	}

	changeURL(evt) {
		let url = evt.detail.url;
		this.changeState('url', url);

		fetch(`/url/${url}/links`).then(function (response) {
			response.json().then(function (response_json) {	
				if (response_json.hasOwnProperty('links')) {
					// emit an event in case there are other listeners outside of this file (even though we know there aren't)
					let links_change_event = new CustomEvent('url.links.changed', {
						'detail': {
							'links': response_json.links
						}
					});

					document.dispatchEvent(links_change_event);
				}
			});
		});	
	}

	changeLinks(evt) {
		this.changeState('links', evt.detail.links);
	}

	render() {
		return (
			<section>
				<SubmitURLForm url={this.state.url} />
				<LinkList url={this.state.url} links={this.state.links} />
			</section>
		);
	}
}

export default URLContainer;

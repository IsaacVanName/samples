import React, { Component } from 'react';

class SubmitURLForm extends Component {
	handleSubmit(evt) {
		evt.preventDefault();

		const button = evt.target;
		const form = button.form;
		const url = form.url.value;

		let url_change_event = new CustomEvent('url.url.changed', {
			'detail': {
				'url': url
			}
		});

		document.dispatchEvent(url_change_event);
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-6 col-md-offset-3">
					<form id="submit-url-form">
						<div className="form-group">
							<label htmlFor="url">URL to Check for Links:</label>
							<input type="text" name="url" className="form-control" placeholder="Enter URL here." />
						</div>
						<button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Check URL</button>
					</form>
				</div>
			</div>
		);
	}
}

export default SubmitURLForm;

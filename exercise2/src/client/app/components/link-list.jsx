import React, { Component } from 'react';

class LinkList extends Component {
	render() {
		let links = [];

		if (Array.isArray(this.props.links)) {
			links = this.props.links.map(function (link, i) {
				let classes = "link-item col-md-5 alert alert-warning";

				if (i % 2 == 1) {
					classes += " col-md-offset-1";
				}

				return (
					<div className={classes}>
						<a href={link} target="_blank">{link.length > 50 ? link.substring(0, 50) + '...' : link}</a>
					</div>
				);
			});

			return (
				<div id="link-list">
					<div className="panel panel-default">
						<div className="panel-heading">Links on Page</div>
						<div className="panel-body">
							{links}
						</div>
					</div>
				</div>
			);
		}

		if (!this.props.links) {
			links = (
		 		<div>{ /* No links found. */ }</div>
		 	);
		}

		if (!this.props.url) {
		 	links = (
		 		<div>{ /* No URL provided. */ }</div>
		 	);
		}

		return (
			<div id="link-list">{links}</div>
		);
	}
}

export default LinkList;

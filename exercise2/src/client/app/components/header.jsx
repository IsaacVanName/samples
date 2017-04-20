import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">Single Page App Sample</a>
					</div>

					<div id="primary-nav">
			    		<ul className="nav navbar-nav">
			    			<li className="active"><a href="#">Check URL for Links</a></li>
			    			{ /* In a perfect world, we'd have more links. Alas, we don't. */ }
			    		</ul>
			    	</div>
				</div>
			</nav>
		);
	}
}

export default Header;

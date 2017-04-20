import React, { Component } from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import '../public/css/main.css'; // i would normally split this out by component

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import URLContainer from './containers/url-container.jsx';

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<Header />
				<URLContainer />
				<Footer />
			</div>
		);
	}
}

render(<App />, document.getElementById('app'));

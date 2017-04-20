'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

const request = require('request');

server.connection({
	host: 'localhost',
	port: 8000
});

/**
 * URL routes
 **/

const URL_PREFIX = '/url';

server.route({
	method: 'GET',
	path: URL_PREFIX + '/{url}',

	handler: function (req, reply) {
		let url = req.params.url;

		if (!(/^https?:\/\//).test(url)) {
			url = 'http://' + url;
		}

		request({
			url
		}, function (error, response, body) {
			reply({
				'statusCode': response.statusCode
			});
		});
	}
})

server.route({
	method: 'GET',
	path: URL_PREFIX + '/{url}/links',

	handler: function (req, reply) {
		let url = req.params.url;

		if (!(/^https?:\/\//).test(url)) {
			url = 'http://' + url;
		}

		request({
			url
		}, function (error, response, body) {
			let links = [];
			let regex = /<a[^>]*href="([^"]*)"[^>]*>/g;
			let result = null;
			
			while (result = regex.exec(body)) {
				// ideally, this would have more things to exclude
				if (['#', 'javascript:void(0);'].indexOf(result[1]) === -1) {
					links.push(result[1]);	
				}
			}

			// remove duplicate links
			links = links.filter(function (item, i) {
				return links.indexOf(item) == i;
			});

			reply({
				'links': links
			});
		});
	}
});

server.register(require('inert'), (err) => {
	if (err) {
		throw err;
	}

	/**
	 * Static files
	 **/

	server.route({
		method: 'GET',
		path: '/',
		handler: function (req, reply) {
			reply.file('src/client/public/index.html');
		}
	});

	server.route({
		method: 'GET',
		path: '/{filename}',
		handler: function (req, reply) {
			reply.file('src/client/public/' + req.params.filename);
		}
	});

	/**
	 * Start server
	 **/

	server.start((err) => {
		if (err) {
			throw err;
		}

		console.log('Hapi server running at: ', server.info.uri);
	});
});

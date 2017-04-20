import urllib, urllib.request as request
import re as regex

def check_urls(*urls):
	broken = []

	for url in urls:
		if not regex.search(r'https?:\/\/[^\s"\']+', url):
			broken.append({
				'url': url,
				'reason': 'Invalid URL format.'
			})

			continue

		try:
			handle = request.urlopen(url)
		except urllib.error.URLError:
			broken.append({
				'url': url,
				'reason': 'Could not request URL.'
			})

			continue			

		if regex.search(r'^20\d$', str(handle.code)):
		 	continue

		error_codes = {
			400: "Bad Request",
			401: "Unauthorized",
			403: "Forbidden",
			404: "Not Found",
			410: "Gone",
			418: "I'm a teapot",
			500: "Internal Server Error",
			502: "Bad Gateway",
			503: "Service Unavailable"
		}

		if handle.code in error_codes:
			reason = 'HTTP Error: ' + error_codes[handle.code]
		else:
			reason = 'Request error.'

		broken.append({
			'url': url,
			'reason': reason
		})		

	return broken

results = check_urls('http://myemma.com', 'foo', 'ht://', 'http://www.asdfasdfasdf.com')
print(results)

const urlToRequest = function(url, root) {
	var moduleRequestRegex = /^[^?]*~/;
	var request;

	if(/^[a-zA-Z]:\\|^\\\\/.test(url)) {
		// absolute windows path, keep it
		request = url;
	} else if(root !== undefined && root !== false && /^\//.test(url)) {
		// if root is set and the url is root-relative
		switch(typeof root) {
			// 1. root is a string: root is prefixed to the url
			case "string":
				// special case: `~` roots convert to module request
				if (moduleRequestRegex.test(root)) {
					request = root.replace(/([^~\/])$/, "$1/") + url.slice(1);
				} else {
					request = root + url;
				}
				break;
			// 2. root is `true`: absolute paths are allowed
			//    *nix only, windows-style absolute paths are always allowed as they doesn't start with a `/`
			case "boolean":
				request = url;
				break;
			default:
				throw new Error("Unexpected parameters to loader-utils 'urlToRequest': url = " + url + ", root = " + root + ".");
		}
	} else if(/^\.\.?\//.test(url)) {
		// A relative url stays
		request = url;
	} else {
		// every other url is threaded like a relative url
		request = "./" + url;
	}

	// A `~` makes the url an module
	if (moduleRequestRegex.test(request)) {
		request = request.replace(moduleRequestRegex, "");
	}

	return request;
};

export default urlToRequest
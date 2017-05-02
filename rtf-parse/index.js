( function() {
	'use strict';

	const Parser = require( './Parser' );

	module.exports = new Parser();

	module.exports.model = require( './rtf/model' );
} )();
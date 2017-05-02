( function() {
	'use strict';

	// Note: technically it could be loaded automatically by listing synchronously files in __dirname - but that wouldn't
	// work in browsers.

	module.exports = {
		command: {
			Picture: require( './command/Picture' )
		},
		Command: require( './Command' ),
		Document: require( './Document' ),
		Group: require( './Group' ),
		Model: require( './Model' ),
		Text: require( './Text' )
	};
} )();

( function() {
	'use strict';

	const Token = require( './Token' );

	class GroupEnd extends Token {
		constructor() {
			super();
			this.tokenRegexp = /\}/;
		}

		applyToModel( model ) {
			// With group end we simply want to change the content back to the parent group.
			return model._parent;
		}
	}

	module.exports = GroupEnd;
} )();

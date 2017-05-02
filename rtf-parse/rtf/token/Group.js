( function() {
	'use strict';

	const Token = require( './Token' ),
		GroupModel = require( '../model/Group' );

	class Group extends Token {
		constructor() {
			super();
			this.tokenRegexp = /\{/;
		}

		applyToModel( model ) {
			let group = new GroupModel( model );
			model.append( group );
			return group;
		}
	}

	module.exports = Group;
} )();

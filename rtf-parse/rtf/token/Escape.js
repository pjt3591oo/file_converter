( function() {
	'use strict';

	const TextToken = require( './Text' ),
		Token = require( './Token' );

	/**
	 * Escape token.
	 *
	 * @class Escape
	 * @extends {Token}
	 */
	class Escape extends TextToken {
		constructor( value ) {
			super( value );
			this.tokenRegexp = /\\./;
		}

		match( code ) {
			return Token.prototype.match.call( this, code );
		}
	}

	module.exports = Escape;
} )();

( function() {
	'use strict';

	const Model = require( './Model' );

	class Text extends Model {
		constructor( parent ) {
			super( parent );

			this.value = '';
		}

		/**
		 * Adds `str` to the end of current text value.
		 *
		 * @param {String} str Text to be appended.
		 * @memberOf Text
		 */
		appendText( str ) {
			this.value += str;
		}
	}

	module.exports = Text;
} )();

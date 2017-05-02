( function() {
	'use strict';

	const Token = require( './Token' ),
		TextModel = require( '../model/Text' );

	/**
	 * Text Text.
	 *
	 * @class Text
	 * @abstract
	 */
	class Text extends Token {
		constructor( value ) {
			super();
			this.value = value;
		}

		/**
		 * Checks if Text occurs at the beginning of `code`
		 *
		 * @param {String} code
		 * @returns {Boolean}
		 * @memberOf Text
		 */
		match( code ) {
			// Text always matches.
			return true;
		}

		applyToModel( model ) {
			let lastModelChild = model.getLast(),
				text;

			if ( lastModelChild && lastModelChild instanceof TextModel ) {
				// Current scope has already tailing text, we could merge it. (#6)
				text = lastModelChild;
			} else {
				text = new TextModel( model );
				model.append( text );
			}

			text.appendText( this.value );
		}
	}

	module.exports = Text;
} )();

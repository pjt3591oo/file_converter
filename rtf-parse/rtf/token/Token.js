( function() {
	'use strict';

	/**
	 * A generic class for any RTF token/node.
	 *
	 * @class Token
	 * @abstract
	 */
	class Token {
		constructor() {
			this.tokenRegexp = null;
		}

		/**
		 * Checks if Token occurs in the given `code`.
		 *
		 * 		// Assuming groupOpenToken matches "{" character.
		 *		groupOpenToken.match( 'foo {\bar baz} {\bom}' );
		 *		// Evaluates to [ 4, '{' ]
		 *
		 * @param {String} code
		 * @returns {Array/Boolean} `false` if token was not matched.
		 * @memberOf Token
		 */
		match( code ) {
			if ( !this.tokenRegexp ) {
				throw new EvalError( 'Missing tokenRegexp property!' );
			}

			code = String( code );

			let match = this.tokenRegexp.exec( code );

			return match ? [ match.index, match[ 0 ] ] : false;
		}

		/**
		 * Applies changes to current RTF model based on this token.
		 *
		 * @param {Model} model Current model context.
		 * @returns {Model/null} If Model instance is returned it means that the parser should change context to the returned instance.
		 * @memberOf Token
		 */
		applyToModel( model ) {
			throw new Error( 'Method not implemented!' );
		}
	}

	module.exports = Token;
} )();

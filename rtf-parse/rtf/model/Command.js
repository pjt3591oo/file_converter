( function() {
	'use strict';

	const Model = require( './Model' );

	class Command extends Model {
		constructor( parent ) {
			super( parent );

			/**
			 * @property {String} name Name of the command.
			 * @memberOf Command
			 */
			this.name = '';
			this.value = '';
		}

		set value( val ) {
			this._value = val;
			this.name = Command._resolveName( val ) || '';
		}

		get value() {
			return this._value;
		}

		/**
		 * Returns command name picked from command token.
		 *
		 * E.g. for `"\foobar "` token it would return `"foobar"` string.
		 *
		 * @private
		 * @param {String} value Text value picked by parser.
		 * @returns {String/null}
		 * @memberOf Command
		 */
		static _resolveName( value ) {
			let match = value.match( /\\([a-z]+(-?[0-9]+)?) ?/ );

			return match ? match[ 1 ] : null;
		}
	}

	module.exports = Command;
} )();

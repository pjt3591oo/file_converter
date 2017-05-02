( function() {
	'use strict';

	const Document = require( './rtf/model/Document' ),
		Tokenizer = require( './Tokenizer' ),
		EventEmmiter = require( 'events' ),
		fsp = require( 'fs-promise' );

	class Parser extends EventEmmiter {
		parseString( str ) {
			return new Promise( ( resolve, reject ) => {
				let doc = new Document(),
					tokenizer = new Tokenizer(),
					modelContext = doc;

				tokenizer.on( 'matched', token => modelContext = this._tokenMatched( token, modelContext ) );

				let tokens = tokenizer.process( str );

				resolve( doc );
			} );
		}

		/**
		 * Parses a given file and returns a promise that resolves to Document model once parsing is done.
		 *
		 * @param {String} path Path to a file.
		 * @returns {Promise<Document>}
		 * @memberOf Parser
		 */
		parseFile( path ) {
			return fsp.readFile( path, {
					encoding: 'utf-8'
				} )
				.then( content => this.parseString( content ) );
		}

		_tokenMatched( token, currentContext ) {
			let targetContext = token.applyToModel( currentContext ) || currentContext;

			if ( targetContext !== currentContext ) {
				this.emit( 'contextChanged', targetContext, currentContext );
			}

			return targetContext;
		}
	};

	module.exports = Parser;
} )();

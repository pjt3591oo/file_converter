( function() {
	'use strict';

	const Text = require( './rtf/token/Text' ),
		EventEmitter = require( 'events' );

	class Tokenizer extends EventEmitter {

		constructor() {
			super();
			this.splitRegExp = new RegExp( Tokenizer.RTF_NEW_LINE, 'm' );
			this._loadTokens();
		}

		/**
		 * Parses given RTF code and returns an array of tokens.
		 *
		 * @param {String} code RTF code to be parsed.
		 * @returns {Token[]} An array of parsed tokens based on `code` provided.
		 * @memberOf Tokenizer
		 */
		process( code ) {
			let remaining = String( code ),
				separatorMatch = null,
				chunk = null,
				ret = [];

			// Tokenizer splits RTF content into chunks per space / new line.
			while ( chunk || remaining ) {
				if ( !chunk ) {
					// Current chunk has been processed, get a new one.
					separatorMatch = this.splitRegExp.exec( remaining );
					chunk = separatorMatch ? remaining.substr( 0, separatorMatch.index ) : remaining;
					remaining = separatorMatch ? remaining.substr( separatorMatch.index + separatorMatch[ 0 ].length ) : null;
				}

				let [ matchedText, matchedToken ] = this._processChunk( chunk );

				// Update current chunk.
				chunk = chunk.substr( matchedText.length );

				ret.push( matchedToken );
			}

			return ret;
		}

		/**
		 * New line feed used in RTF files.
		 *
		 * @readonly
		 * @static
		 * @memberOf Tokenizer
		 */
		static get RTF_NEW_LINE() {
			return '\r\n';
		}

		/**
		 * Processes a single chunk of RTF code.
		 *
		 * @private
		 * @param {String} chunk
		 * @returns {Array} An array of: `[ matchedText:String, closestMatch:Token ]`.
		 * @memberOf Tokenizer
		 */
		_processChunk( chunk ) {
			let closestMatch = null,
				matchedText = null,
				// At what offset the token was matched?
				matchIndex = null;

			for ( let token of this.tokens ) {
				let tokenMatched = token.match( chunk );

				// Only overwrite closest match if:
				// 1. No token has been matched so far.
				// 2. ... or this token has been found closer to the end of a string than the former one.
				if ( tokenMatched && ( matchIndex === null || tokenMatched[ 0 ] < matchIndex ) ) {
					closestMatch = token;
					matchIndex = tokenMatched[ 0 ];
					matchedText = tokenMatched[ 1 ];
				}

				if ( matchIndex === 0 ) {
					// Any token matched at 0 index, takes highest priority, and means no further processing is needed.
					break;
				}
			}

			if ( matchIndex !== 0 ) {
				// console.log( `not having a perfect match (${matchIndex}) :(( using text` );

				// No match perfect match, so we'll create a text run all the way until a best match. The best
				// match will be picked in next iteration at offset 0.
				matchedText = matchIndex !== null ? chunk.substring( 0, matchIndex ) : chunk;
				closestMatch = new Text( matchedText );
				matchIndex = 0;
			} else {
				// @todo: until there's no difference between token and model, we need to use the following.
				closestMatch = new closestMatch.constructor( matchedText );
			}

			this.emit( 'matched', closestMatch );

			return [ matchedText, closestMatch ];
		}

		/**
		 * Sets up known tokens array.
		 *
		 * @memberOf Tokenizer
		 */
		_loadTokens() {
			const Group = require( './rtf/token/Group' ),
				GroupEnd = require( './rtf/token/GroupEnd' ),
				Picture = require( './rtf/token/command/Picture' ),
				Command = require( './rtf/token/Command' ),
				Escape = require( './rtf/token/Escape' );

			this.tokens = [
				new Group(),
				new GroupEnd(),
				new Picture(),
				new Command()
			];

			// It's important to put Escape token at the end as it's the last one that should be used.
			this.tokens.push( new Escape() );
		}
	}

	module.exports = Tokenizer;
} )();

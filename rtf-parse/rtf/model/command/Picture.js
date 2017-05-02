( function() {
	'use strict';

	const Command = require( '../Command' ),
		Text = require( '../Text' );

	class Picture extends Command {
		/**
		 * Returns a buffer containing the image.
		 *
		 * @returns {Buffer}
		 * @memberOf Picture
		 */
		getPicture() {
			var input = this._getImageText(),
				inputLen = input.length,
				buffer = Buffer.alloc( inputLen / 2 );

			for ( var i = 0; i < inputLen; i += 2 ) {
				buffer.writeUInt8(
					parseInt( input.substr( i, 2 ), 16 ),
					i ? ( i / 2 ) : 0
				);
			}

			return buffer;
		}

		/**
		 * Browser-friendly version of {@link #getPicture}.
		 *
		 * @returns {String} Returns picture data as a string.
		 * @memberOf Picture
		 */
		getPictureAsString() {
			var input = this._getImageText(),
				inputLen = input.length,
				ret = '',
				i;

			for ( i = 0; i < inputLen; i += 2 ) {
				ret += String.fromCharCode( parseInt( input.substr( i, 2 ), 16 ) );
			}
			return ret;
		}

		/**
		 * @returns {String} Mime type of the image, e.g. `image/png`.
		 * @memberOf Picture
		 */
		getType() {
			let blip = this.getParent().getChild( child => child instanceof Command && child.name.endsWith( 'blip' ) );

			if ( blip ) {
				return 'image/' + blip.name.replace( 'blip', '' );
			}

			return 'image/bmp';
		}

		_getImageText() {
			return this.getParent().getChild( Text ).value;
		}
	}

	module.exports = Picture;
} )();

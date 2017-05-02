( function() {
	'use strict';

	const Command = require( '../Command' ),
		PictureModel = require( '../../model/command/Picture' );

	class Picture extends Command {
		constructor( matchedText ) {
			super( matchedText );

			this.tokenRegexp = /\\pict ?/;
		}

		applyToModel( model ) {
			let modelParent = model.getParent();

			// We don't want to create pictures that are children of nonshppict, as it's a deprecated construction.
			if ( !modelParent || !modelParent.getChild( child => child.name === 'nonshppict', true ) ) {
				model.append( new PictureModel( this.value ) );
			} else {
				return super.applyToModel( model );
			}
		}
	}

	module.exports = Picture;
} )();

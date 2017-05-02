( function() {
	'use strict';

	let isClass = require( 'is-class' );

	/**
	 * Base class for RTF model entries.
	 *
	 * @class Model
	 */
	class Model {
		/**
		 * Creates an instance of Model.
		 *
		 * @param {Model/null} parent
		 * @memberOf Model
		 */
		constructor( parent ) {
			this.children = [];
			this._parent = parent || null;
		}

		append( node ) {
			this.children.push( node );

			node.setParent( this );
		}

		setParent( parent ) {
			this._parent = parent;
		}

		getParent() {
			return this._parent;
		}

		/**
		 * @returns {Model/null} Returns last child of this item or `null` if none.
		 * @memberOf Model
		 */
		getLast() {
			return this.children[ this.children.length - 1 ] || null;
		}

		/**
		 * @returns {Model/null} Returns last child of this item or `null` if none.
		 * @memberOf Model
		 */
		getFirst() {
			return this.getChild();
		}

		/**
		 * Returns the first child matching `criteria`.
		 *
		 *		// Returns a first child which is instance of Group.
		 *		curModel.getChild( Group );
		 *
		 * @param {Class/Function} [criteria] If no criteria is given the first child is returned.
		 * @param {Boolean} [recursive=false]
		 * @returns {Model}
		 * @memberOf Model
		 */
		getChild( criteria, recursive ) {
			return this._getChildren( this, criteria, recursive ).next().value || null;
		}

		/**
		 * Returns an array of children matching `criteria`.
		 *
		 *		// Returns a first child which is instance of Group.
		 *		curModel.getChild( Group );
		 *
		 * @param {Class/Function} [criteria] If no criteria is given the first child is returned.
		 * @param {Boolean} [recursive=false]
		 * @returns {Model[]}
		 * @memberOf Model
		 */
		getChildren( criteria, recursive ) {
			let ret = [];

			for ( let child of this._getChildren( this, criteria, recursive ) ) {
				ret.push( child );
			}

			return ret;
		}

		* _getChildren( parent, criteria, recursive ) {
			let evaluator = this._getEvaluatorFromCriteria( criteria );

			for ( let child of parent.children ) {
				if ( evaluator( child ) === true ) {
					yield child;
				}
				if ( recursive ) {
					yield * this._getChildren( child, criteria, recursive );
				}
			}
		}

		_getEvaluatorFromCriteria( criteria ) {
			let evaluator;

			if ( !criteria ) {
				evaluator = () => true;
			} else if ( isClass( criteria ) ) {
				evaluator = val => val instanceof criteria;
			} else if ( typeof criteria === 'function' ) {
				evaluator = criteria;
			} else {
				evaluator = () => false;
			}

			return evaluator;
		}
	}

	module.exports = Model;
} )();

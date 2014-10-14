/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function()
{
	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	// The base Class implementation (does nothing)
	this.Class = function(){};

	// Create a new Class that inherits from this class
	Class.extend = function(prop)
	{
		var _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		var prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (var name in prop)
		{
			if(typeof prop[name] === 'function') prop[name].super = _super[name];
			prototype[name] = prop[name];
		}

		// The dummy class constructor
		function Class()
		{
			// All construction is actually done in the init method
			if ( !initializing && this._initialize ) this._initialize.apply(this, arguments);
		}
		
		Class.__definition__ = _.clone(prototype);
		Class.__parent__ = _.clone(this);
		prototype.__class__ = _.clone(Class);
		prototype.__parent__ = Class.__parent__;

		// Populate our constructed prototype object
		Class.prototype = prototype;

		// Enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// And make this class extendable
		Class.extend = arguments.callee;

		return Class;
	};
})();
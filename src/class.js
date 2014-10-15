ainur.define('aClass', function()
{
	var defer = ainur.require('aDefer');

	return Class.extend(
	{
		observable: false,
		promises: [],
		autoSetup: true,
		_initialize: function()
		{
			if(this.observable)
			{
				this._emitter = new TinyEmitter();
				this.on = function(event, callback, context) { this._emitter.on(event, callback, context || this); };
				this.one = function(event, callback, context) { this._emitter.one(event, callback, context || this); };
				this.off = function(event, callback) { this._emitter.off(event, callback); };
				this.trigger = function() { this._emitter.emit.apply(this._emitter, arguments); };
			}

			if(_.isArray(this.promises))
			{
				var deferredMap	= {};
				var promiseMap		= {};
				var parentClass	= this.__class__;
				var promises		= [];

				do
				{
					if(parentClass.__definition__)
					{
						promises = _.union(promises, parentClass.__definition__.promises);
					}
				}
				while(parentClass = parentClass.__parent__);

				promises.forEach(function(name)
				{
					deferredMap[name] = defer();
					promiseMap[name] = deferredMap[name].promise;
				});

				this.resolvePromise = function(name, result)
				{
					deferredMap[name].resolve(result);
				};

				this.rejectPromise = function(name, reason)
				{
					deferredMap[name].reject(reason);
				};

				this.promises = promiseMap;
			};

			if(this.autoSetup)
			{
				this.setup.apply(this, arguments);
			}
		},
		setup: function()
		{

		}
	});
});
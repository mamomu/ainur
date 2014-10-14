var ainur = {};

(function()
{
	ainur._defined = {};
	ainur._cached = {};

	ainur.class = function(defintion)
	{
		ainur.define(defintion.$name, function()
		{
			var ParentClass = ainur.require(defintion.$parent || 'ainur.class');
			return ParentClass.extend(defintion);
		});
	};

	ainur.state = function(defintion)
	{
		ainur.config(function()
		{
			ainur.require('ainur.stateManager').define(defintion);
		});
	};

	ainur.define = function(name, module, overwrite)
	{
		if(!ainur._defined[name] || overwrite === true)
		{
			ainur._defined[name] = module;
		}
		else
		{
			throw 'Module ' + name + ' already defined';
		}
	};

	ainur.require = function(name)
	{
		if(ainur._defined[name])
		{
			var module;

			if(ainur._cached[name])
			{
				return ainur._cached[name];
			}
			else
			{
				module = ainur._cached[name] = ainur._defined[name]();
			}

			return module;
		}
		else
		{
			throw ('Module ' + name + ' not defined');
		}
	}

	ainur.define('ainur._', _.constant(_));

	ainur.define('ainur.$', _.constant($));

	ainur.define('ainur.rivets', _.constant(rivets));

	ainur.define('ainur.router', _.constant(routie));

	ainur.define('ainur.ajax', _.constant(function(url, data, method)
	{
		var Promise = ainur.require('ainur.promise');
		var deferred = Promise.defer();

		$.ajax(
		{
			url: url,
			type: method || 'GET',
			data: data,
			success: function(result)
			{
				deferred.resolve(result);
			},
			error: function(result)
			{
				deferred.reject(result);
			}
		});

		return deferred.promise;
	}));

	var Promise = ayepromise;

	Promise.rejected = function(result)
	{
		var deferred = Promise();
		deferred.reject(result);
		return deferred.promise;
	};

	Promise.resolved = function(result)
	{
		var deferred = Promise();
		deferred.resolve(result);
		return deferred.promise;
	};

	ainur.define('ainur.promise', _.constant(Promise));

	var _config = [];
	var _appRunning = false;
	var _runDeferred = Promise.defer();

	ainur.config = function(func)
	{
		if(_appRunning)
		{
			func();
		}
		else
		{
			_config.push(func);
		}
	};

	ainur.run = function()
	{
		_appRunning = true;
		var func;
		while(func = _config.pop()) { func(); };
		setTimeout(function(){ _runDeferred.resolve(); }, 5);
	};

	ainur.run.then = function(){ _runDeferred.promise.then.apply(_runDeferred.promise, arguments); };
})();
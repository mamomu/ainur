ainur.define('ainur.stateManager', function()
{
	var router = ainur.require('ainur.router');
	var defer = ainur.require('ainur.defer');

	function getDiffIndex(a, b)
	{
		a = a.split('.');
		b = b.split('.');

		var length = a.length > b.length ? a.length : b.length;

		for(var i = 0; i < length; i++)
		{
			if(a[i] != b[i])
			{
				return i;
			}
		}

		return -1;
	}

	var RouteClass = ainur.require('ainur.class').extend(
	{
		_enter: function()
		{
			var that = this;

			function doEnter()
			{
				var View = _.isString(that.view) ? ainur.require(that.view) : that.view;
				that._view = new View();

				return that._view.promises.initialized.then(function()
				{
					if(that.onEnter) that.onEnter();
					that._view.appendTo(that.el);
				});
			}

			if(this.onBeforeEnter)
			{
				var beforeEnterReturn = this.onBeforeEnter();

				if(beforeEnterReturn && beforeEnterReturn.then)
				{
					return beforeEnterReturn.then(doEnter);
				}
				else if(beforeEnterReturn === false)
				{
					return defer.rejected();
				}
				else
				{
					return doEnter();
				}
			}
			else
			{
				return doEnter();
			}
		},
		_exit: function()
		{
			var that = this;
			var promise;

			if(this._view)
			{
				this._view.destroy();
				promise = this._view.promises.destroyed;
			}
			else
			{
				promise = defer.resolved();
			}

			return promise.then(function()
			{
				that._view = null;
				if(that.onExit) that.onExit();
			});
		}
	});

	var stateManager = ainur.require('ainur.class').extend(
	{
		states: {},
		currentState: null,
		exitStatesUpTo: function(nodeIndex)
		{
			if(!this.currentState) return defer.resolved();
			
			var that = this;
			var deferred = defer();
			var currentStateFamily = this.currentState.name.split('.');
			var i = currentStateFamily.length;
			
			var next = function()
			{
				i--;
				
				if(i > nodeIndex - 1)
				{
					var stateName = currentStateFamily.slice(0, i + 1).join('.');
					
					if(that.states[stateName])
					{
						that.states[stateName]._exit().then(next);
					}
					else
					{
						next();
					}
				}
				else
				{
					deferred.resolve();
				}
			};

			next();

			return deferred.promise;
		},
		enterStatesFrom: function(nodeIndex, newStateName)
		{
			var that = this;
			var deferred = defer();
			var newStateFamily = newStateName.split('.');
			var i = nodeIndex - 1;
			
			var next = function()
			{
				i++;

				if(i < newStateFamily.length)
				{
					var stateName = newStateFamily.slice(0, i + 1).join('.');
					
					if(that.states[stateName])
					{
						that.currentState = that.states[stateName];
						that.states[stateName]._enter().then(next, function(){ deferred.reject(); });
					}
					else
					{
						that.currentState = { name: stateName };
						next();
					}
				}
				else
				{
					deferred.resolve();
				}
			};

			next();

			return deferred.promise;
		},
		change: function(newStateName, debug)
		{
			if(this.currentState && this.currentState.name === newStateName) return;

			var that = this;
			var newState = this.states[newStateName];
			var diffIndex = this.currentState ? getDiffIndex(this.currentState.name, newState.name) : 0;

			this.exitStatesUpTo(diffIndex)
			.then(function()
			{
				return that.enterStatesFrom(diffIndex, newState.name);
			})
			.then(function()
			{
				that.currentState = newState;
			}, function()
			{
				that.exitStatesUpTo(0).then(function()
				{
					that.currentState = null;
				});
			});
		},
		define: function(definition)
		{
			var that = this;

			if(!this.states[definition.name])
			{
				var state = new (RouteClass.extend(definition));
				this.states[state.name] = state;

				if(state.abstract !== true && state.url)
				{
					ainur.config(function()
					{
						router(state.url, function()
						{
							that.change(state.name);
						});
					});
				}
			}
			else
			{
				throw 'State ' + definition.name + ' already defined';
			}
		}
	});

	return new stateManager();
});
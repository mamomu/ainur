ainur.define('ainur.stateManager', function()
{
	var router = ainur.require('ainur.router');
	var Promise = ainur.require('ainur.promise');

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
					return Promise.rejected();
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
			this._view.destroy();
			return this._view.promises.destroyed.then(function()
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
		destroyUpToNode: function(nodeIndex)
		{
			if(this.currentState)
			{
				var currentStateFamily = this.currentState.split('.');

				for(var i = currentStateFamily.length - 1; i >= nodeIndex; i--)
				{
					var stateName = currentStateFamily.slice(0, i + 1).join('.');
					this.states[stateName]._exit();
				}
			}
		},
		change: function(newState, debug)
		{
			if(this.currentState === newState) return;

			var that = this;
			var newStateFamily = newState.split('.');
			var diffIndex = this.currentState ? getDiffIndex(this.currentState, newState) : 0;

			this.destroyUpToNode(diffIndex);

			var next = function (i)
			{
				if(i < newStateFamily.length)
				{
					var stateName = newStateFamily.slice(0, i + 1).join('.');

					console.log(i, stateName, debug);

					if(that.states[stateName])
					{
						that.states[stateName]._enter().then(function()
						{
							next(diffIndex + 1);
						},
						function()
						{
							that.destroyUpToNode(0);
							this.currentState = null;
						});
					}
					else
					{
						next(diffIndex + 1);
					}
				}
				else
				{
					this.currentState = newState;
				}
			}

			next(diffIndex);
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
							ainur.run.then(function()
							{
								if(that.currentState === state.name) return;
								that.change(state.name);
							});
						});
					});
				}
			}
			else
			{
				throw 'State already defined';
			}
		}
	});

	return new stateManager();
});
ainur.define('aView', function()
{
	var ajax = ainur.require('aAjax');

	var templates = {};

	return ainur.require('aClass').extend(
	{
		template: null,
		templateUrl: null,
		attributes: null,
		promises: ['initialized', 'destroyed'],
		_initialize: function()
		{
			var that = this;
			var autoSetup = this.autoSetup;

			this.autoSetup = false;
			this._initialize.super.call(this);
			this.autoSetup = autoSetup;

			this.el = document.createElement('div');
			this.scope = this.scope || {};
			
			if(this.attributes) for(var key in this.attributes)
			{
				this.el.setAttribute(key, this.attributes[key]);
			}

			function templateAquired(template)
			{
				that.template = template;
				that.el.innerHTML = that.template;
				that._rivets = new rivets.bind(that.el, that.scope);
				that.resolvePromise('initialized');
			}

			if(this.template)
			{
				templateAquired(this.template);
			}
			else if(this.templateUrl)
			{
				templates[this.templateUrl] = templates[this.templateUrl] || ajax(this.templateUrl);
				templates[this.templateUrl].then(templateAquired);
			}
			else
			{
				templateAquired('');
			}

			if(this.autoSetup)
			{
				this.promises.initialized.then(function()
				{
					that.setup();
				});
			}
		},
		appendTo: function(parentEl)
		{
			$(parentEl).append(this.el);
		},
		destroy: function()
		{
			this.el.parentNode.removeChild(this.el);
			if(this._rivets) this._rivets.unbind();
			this.resolvePromise('destroyed');
		}
	});
});
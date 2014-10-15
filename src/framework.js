var ainur = {};

(function()
{
	var _config = [];
	var _run = [];
	var _appRunning = false;

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

	ainur.run = function(func)
	{
		if(_appRunning)
		{
			func();
		}
		else
		{
			_run.push(func);
		}
	};

	ainur.bootstrap = function()
	{
		var router = ainur.require('aRouter');

		if(!_appRunning)
		{
			_appRunning = true;
	
			var func; while(func = _config.pop()) { func(); };
			
			router.evaluate();

			var func; while(func = _run.pop()) { func(); };
		}
	};
})();
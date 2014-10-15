ainur._defined = {};
ainur._cached = {};

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
};
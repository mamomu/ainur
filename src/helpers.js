ainur.class = function(defintion)
{
	ainur.define(defintion.$name, function()
	{
		var ParentClass = ainur.require(defintion.$parent || 'aClass');
		return ParentClass.extend(defintion);
	});
};

ainur.state = function(defintion)
{
	ainur.config(function()
	{
		ainur.require('aStateManager').define(defintion);
	});
};
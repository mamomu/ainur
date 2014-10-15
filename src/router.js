ainur.define('aRouter', function()
{
	routie.evaluate = routie.reload;
	routie.reload = function(){};

	return routie;
});
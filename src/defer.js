ainur.define('aDefer', function()
{
	var defer = function()
	{
		return ayepromise.defer();
	};

	defer.rejected = function(result)
	{
		var deferred = defer();
		deferred.reject(result);
		return deferred.promise;
	};

	defer.resolved = function(result)
	{
		var deferred = defer();
		deferred.resolve(result);
		return deferred.promise;
	};

	return defer;
});
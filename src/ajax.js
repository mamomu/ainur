ainur.define('aAjax', _.constant(function(url, data, method)
{
	var defer = ainur.require('aDefer');
	var deferred = defer();

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
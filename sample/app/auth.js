ainur.define('auth', function()
{
	var defer = ainur.require('aDefer');
	var router = ainur.require('aRouter');
	var loggedIn = false;

	function ensureLogged()
	{
		if(loggedIn)
		{
			return defer.resolved();
		}
		else
		{
			_.defer(router, '/login');
			return defer.rejected();
		}
	}

	function login()
	{
		loggedIn = true;
	}

	function logout()
	{
		loggedIn = false;
	}

	return {
		login: login,
		logout: logout,
		ensureLogged: ensureLogged
	}
});
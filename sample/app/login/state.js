ainur.class(
{
	$parent: 'ainur.view',
	$name: 'LoginView',
	templateUrl: 'app/login/template.html',
	login: function()
	{
		var router = ainur.require('ainur.router');
		var auth = ainur.require('auth');

		auth.loggedIn = true;
		router('/home');
	},
	setup: function()
	{
		this.scope.login = this.login.bind(this);
	}
});

ainur.state(
{
	name: 'login',
	url: '/login',
	view: 'LoginView',
	el: 'body',
	onEnter: function()
	{
		console.log('enter login 1');
	}
});

ainur.state(
{
	name: 'login2',
	url: '/login2',
	view: 'LoginView',
	el: 'body',
	onEnter: function()
	{
		console.log('enter login 2');
	}
});
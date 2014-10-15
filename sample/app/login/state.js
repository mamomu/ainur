ainur.class(
{
	$parent: 'aView',
	$name: 'LoginView',
	templateUrl: 'app/login/template.html',
	login: function()
	{
		ainur.require('auth').login();
		ainur.require('aRouter')('/home');
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
	el: 'body'
});

ainur.state(
{
	name: 'login2',
	url: '/login2',
	view: 'LoginView',
	el: 'body'
});
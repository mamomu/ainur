ainur.class(
{
	$parent: 'aView',
	$name: 'MainView',
	templateUrl: 'app/main/template.html',
	setup: function()
	{
		this.scope.logout = this.logout.bind(this);
	},
	logout: function()
	{
		ainur.require('auth').logout();
		ainur.require('aRouter')('/login');
	}
});

ainur.state(
{
	name: 'main',
	abstract: true,
	view: 'MainView',
	el: 'body',
	onBeforeEnter: function()
	{
		return ainur.require('auth').ensureLogged();
	}
});
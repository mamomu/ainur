ainur.class(
{
	$parent: 'ainur.view',
	$name: 'MainView',
	templateUrl: 'app/main/template.html'
});

ainur.state(
{
	name: 'main',
	abstract: true,
	view: 'MainView',
	el: 'body'
});
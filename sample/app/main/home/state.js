ainur.class(
{
	$parent: 'aView',
	$name: 'MainHomeView',
	templateUrl: 'app/main/home/template.html'
});

ainur.state(
{
	name: 'main.home',
	url: '/home',
	view: 'MainHomeView',
	el: '[data-state-view="main"]'
});
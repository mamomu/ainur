ainur.class(
{
	$parent: 'aView',
	$name: 'MainMovieView',
	templateUrl: 'app/main/movie/template.html'
});

ainur.state(
{
	name: 'main.movie',
	url: '/movie',
	view: 'MainMovieView',
	el: '[data-state-view="main"]'
});
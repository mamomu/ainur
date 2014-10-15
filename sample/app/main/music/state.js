ainur.class(
{
	$parent: 'aView',
	$name: 'MainMusicView',
	templateUrl: 'app/main/music/template.html'
});

ainur.state(
{
	name: 'main.music',
	url: '/music',
	view: 'MainMusicView',
	el: '[data-state-view="main"]'
});
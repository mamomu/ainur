var gulp		= require('gulp');
var concat	= require('gulp-concat');
var uglify	= require('gulp-uglifyjs');

var sourceFiles =
[
	'src/lib/ayepromise.js',
	'src/lib/class.js',
	'src/lib/rivets.bundled.min.js',
	'src/lib/routie.min.js',
	'src/lib/tiny-emitter.min.js',
	'src/lib/underscore-min.js',
	'src/lib/zepto.min.js',
	'src/framework.js',
	'src/moduleManager.js',
	'src/class.js',
	'src/defer.js',
	'src/ajax.js',
	'src/router.js',
	'src/state.js',
	'src/view.js',
	'src/helpers.js'
];

gulp.task('default', [], function()
{
	return gulp.src(sourceFiles)
					.pipe(concat('ainur.bundled.min.js'))
					.pipe(uglify())
					.pipe(gulp.dest('./dist/'));
});
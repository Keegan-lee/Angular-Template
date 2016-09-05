var gulp = require('gulp');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var minifyJS = require('gulp-uglify');
var sass = require('gulp-sass');
var gnf = require('gulp-npm-files');
var del = require('del');

var srcPaths = {
	npmJS: ['./public/node_modules/**/*.min.js',
			'!./public/node_modules/angular-material/modules/**/*',
			'!./public/node_modules/angular-material/layouts/**/*',
			'!./public/node_modules/**/*.slim.min.js',
			'!./public/node_modules/**/sizzle.min.js'],
	npmCSS: ['./public/node_modules/**/*.min.css',
			 '!./public/node_modules/angular-material/modules/**/*',
			 '!./public/node_modules/angular-material/layouts/**/*'],

	src: './src/',
	index: './src/index.html',
	javascript: './src/js/*.js',
	style: './src/style/*.{scss, sass}',
	img: './src/img/**/*.*',
	html: './src/templates/**/*.html',
	php: './src/**/*.php',
	favicon: './src/favicon.ico',
	htaccess: './src/.htaccess'
}

var destPaths = {
	dest: './public/',
	index: './public/index.html',
	html: './public/templates/',
	javascript: './public/js/',
	style: {
		folder: './public/css/',
		files: './public/css/*.css'
	},
	img: './public/img/'
};

gulp.task('watch', function() {
	gulp.watch(srcPaths.javascript, ['js']);
	gulp.watch(srcPaths.style, ['style']);
	gulp.watch(srcPaths.html, ['html']);
	gulp.watch(srcPaths.index, ['inject']);
	gulp.watch(srcPaths.php, ['php']);
	gulp.watch(srcPaths.img, ['img']);
	gulp.watch(srcPaths.htaccess, ['htaccess']);
});

gulp.task('clean', function() {
	return del.sync(destPaths.dest);
})


gulp.task('style', function() {
	return gulp.src(srcPaths.style)
		.pipe(sass())
		.pipe(gulp.dest(destPaths.style.folder));
});


gulp.task('js', function() {
	return gulp.src(srcPaths.javascript)
		.pipe(minifyJS())
		.pipe(gulp.dest(destPaths.javascript))
});

gulp.task('img', function() {
	return gulp.src(srcPaths.img)
		.pipe(gulp.dest(destPaths.img));
});

gulp.task('php', function() {
	return gulp.src(srcPaths.php)
		.pipe(gulp.dest(destPaths.dest));
});

gulp.task('misc', function() {
	return gulp.src(srcPaths.favicon)
		.pipe(gulp.dest(destPaths.dest));
});

gulp.task('htaccess', function() {
	return gulp.src(srcPaths.htaccess)
		.pipe(gulp.dest(destPaths.dest));
});


gulp.task('html', function() {
	return gulp.src(srcPaths.html)
		.pipe(gulp.dest(destPaths.html));
});

gulp.task('npmInclude', function() {
	return gulp.src(gnf(), {base:'./'}).pipe(gulp.dest(destPaths.dest));
});

gulp.task('inject', ['npmInclude', 'style'], function() {

	var injectFiles = gulp.src(srcPaths.npmJS.concat(srcPaths.npmCSS).concat(srcPaths.javascript).concat(destPaths.style.files));
	var injectOptions = {
		addRootSlash : false,
		ignorePath : ['public', 'src']
	};

	return gulp.src(srcPaths.index)
		.pipe(inject(injectFiles, injectOptions))
		.pipe(gulp.dest(destPaths.dest));
});

gulp.task('default', ['clean', 'inject', 'html', 'htaccess', 'misc', 'php', 'img', 'watch', 'js', 'watch']);




var gulp = require('gulp'),
    sass = require('gulp-sass'),
    //error notifications
    notify = require("gulp-notify"),
    //adding prefixes CSS for browsers
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    //minify JS
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    //minify CSS 
    cssnano = require('gulp-cssnano'),
    //optimization of image files (https://tinypng.com/)
    tinypng = require('gulp-tinypng'),
    //Developer Api Key - https://tinypng.com/
    tinyApiKey = '',
    sourcemaps = require('gulp-sourcemaps'),
    bower = require('gulp-bower'),
    package = require('./package.json');


var banner = [
        '/*!\n' +
        ' * <%= package.name %>\n' +
        ' * <%= package.title %>\n' +
        ' * <%= package.url %>\n' +
        ' * @author <%= package.author %>\n' +
        ' * @version <%= package.version %>\n' +
        ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %>licensed.\n' +
        ' */',
        '\n'
        ].join('');

var config = {
    bowerDir: './bower_components' 
}


gulp.task('css', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'IE 8'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(banner, {
            package: package
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    gulp.src('src/js/main.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(header(banner, {
            package: package
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(uglify())
        .pipe(header(banner, {
            package: package
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({
            stream: true,
            once: true
        }));
});

gulp.task('bower', ['copyFiles'], function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('copyFiles', function () {
    /*copy fontawesome*/
    gulp.src(config.bowerDir + '/font-awesome/fonts/**/*.{ttf,woff,woff2,eof,eot,svg,otf}')
        .pipe(gulp.dest('./app/fonts'));
    gulp.src(config.bowerDir + '/font-awesome/scss/**/*')
        .pipe(gulp.dest('./src/sass/vendor/fontawesome'));
    /*copy normalize.css */
    gulp.src(config.bowerDir + '/normalize-css/normalize.css')
        .pipe(rename("_normalize.scss"))
        .pipe(gulp.dest('./src/sass/vendor/'));
    /*copy jQuery */
    gulp.src(config.bowerDir + '/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./app/js/vendor/'));
})

gulp.task('browserSync', function () {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});

//optimization 'tinypng'
gulp.task('image', () =>
    gulp.src('src/img/*')
    .pipe(tinypng(tinyApiKey))
    .pipe(gulp.dest('app/img'))
);

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browserSync'], function () {
    gulp.watch('src/sass/**/*.scss', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('app/*.html', ['bs-reload']);
})

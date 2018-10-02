const gulp = require('gulp'),
    debug = require('gulp-debug'),
    uglifyJs = require('gulp-uglify'),
    uglifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    copy = require('gulp-copy'),
    strip = require('gulp-strip-comments'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    pug = require('gulp-pug'),
    templateCache = require('gulp-angular-templatecache'),
    autoprefixeer = require('gulp-autoprefixer'),
    replace = require('gulp-replace'),
    babel = require('gulp-babel');

gulp.task('vendor:scripts', () => {
    return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-cookies/angular-cookies.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
        "node_modules/angular-route/angular-route.js",
        'node_modules/angular-local-storage/dist/angular-local-storage.min.js',
        'node_modules/angular-material-data-table/dist/md-data-table.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-datetime-input/dist/datetime.js',
        'node_modules/textangular/dist/textAngular-rangy.min.js',
        'node_modules/textangular/dist/textAngular-sanitize.min.js',
        'node_modules/textangular/dist/textAngular.min.js',
        'node_modules/textangular/dist/textAngularSetup.js',
        'node_modules/oclazyload/dist/ocLazyLoad.min.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/angular-ui-mask/dist/mask.min.js',
        'node_modules/angular-ui-grid/ui-grid.min.js',
        'node_modules/angularjs-slider/dist/rzslider.js',
        'node_modules/angular-rangeslider/angular.rangeSlider.js'
    ]).pipe(concat('vendor.min.js')).pipe(gulp.dest('src/assets/js'));
});

gulp.task('scripts:dev', () => {
    return gulp.src([
        'src/app/app.js',
        'src/app/app.controller.js',
        'src/app/**/*.js',
        '!src/app/templates.js',
        '!src/app/**/*.spec.js',
        '!src/app/**/conf.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('custom.js'))
        .pipe(uglifyJs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/assets/js/'));
});

gulp.task('scripts:prod', () => {
    return gulp.src([
        'src/app/app.js',
        'src/app/app.controller.js',
        'src/app/**/*.js',
        '!src/app/templates.js',
        '!src/app/**/*.spec.js',
        '!src/app/**/conf.js',
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('custom.js'))
        .pipe(uglifyJs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/assets/js/'));
});

gulp.task('vendor:styles', () => {
    return gulp.src([
        'node_modules/angular-material/angular-material.min.css',
        'node_modules/mdi/css/materialdesignicons.min.css',
        'node_modules/angular-material-data-table/dist/md-data-table.min.css',
        'node_modules/textangular/dist/textAngular.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/angular-ui-grid/ui-grid.min.css',
        'node_modules/angular-rangeslider/angular.rangeSlider.css',
        'node_modules/angularjs-slider/dist/rzslider.scss'
    ]).pipe(concat('vendor.min.css')).pipe(gulp.dest('src/assets/css'));
});

gulp.task('scss', () => {
    return gulp.src('src/assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(autoprefixeer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('custom.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/assets/css/'));
});

gulp.task('revision', () => {
    return gulp
        .src('src/index*.html')
        .pipe(replace(/\.(js|css)[\?0-9]*/g, '.$1?' + (new Date()).getTime()))
        .pipe(gulp.dest('src/', {overwrite: true}));
});

gulp.task('revisionRouter', () => {
    return gulp.src('src/app/config/router.config.js')
        .pipe(replace(/\.(html)[\?0-9]*\'/g, '.$1?' + (new Date()).getTime() + '\''))
        .pipe(gulp.dest('src/app/config/', {overwrite: true}));
});

gulp.task('watch', () => {
    gulp.watch(['src/app/**/*.scss', 'src/assets/scss/**/*.scss'], ['scss', 'revision', 'revisionRouter']);
    gulp.watch(['src/app/**/*.js'], ['scripts:dev', 'revision', 'revisionRouter']);
});
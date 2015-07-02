'use strict';

let gulp = require('gulp');
let browserify = require('browserify');
let babelify = require('babelify');
let watchify = require('watchify');
let buffer = require('vinyl-buffer');
let notify = require('gulp-notify');
let concat = require('gulp-concat');

let debug = require('gulp-debug');
// let plumber = require('gulp-plumber');
let source = require('vinyl-source-stream');
let gutil = require('gulp-util');
let gulpif = require('gulp-if');
let sourcemaps = require('gulp-sourcemaps');
let watch = require('gulp-watch');
let spawn = require('child_process').spawn;
let argv = require('yargs').argv;
let connect = require('gulp-connect');
let connectLiveReload = require('connect-livereload');
let liveReload = require('gulp-livereload');

let resolve = require('path').resolve;

const isProduction = process.env.NODE_ENV === 'production';
const LIVERELOAD_PORT = process.env.LIVERELOAD_PORT || 35729;
const STATIC_JS = 'static/js';

const baseBrowserifyOptions = {
    entries: ['app/index.js'], // application entry points - if not using index, add here!
    debug: !isProduction
};


let compiler = watchify(browserify(baseBrowserifyOptions));
compiler.transform(babelify);

function bundle () {
    return compiler.bundle()
        // handle errors
        .on('error', notify.onError('Error: <%= error.message %>'))
        .on('error', function(err) {
            gutil.log(gutil.colors.red(`Error (${err.plugin}) - ${err.message}`));
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(!isProduction, sourcemaps.init({
            loadMaps: true
        })))
        // .pipe(gulpif(isProduction, uglify()))
        .pipe(notify('Compiled <%= file.relative %>'))
        .pipe(gulpif(!isProduction, sourcemaps.write()))
        .pipe(gulp.dest(STATIC_JS))
        .pipe(debug())
        .pipe(liveReload());
}

compiler.on('update', function() {
    bundle();
});


gulp.task('client', bundle);

gulp.task('css', function() {
    return gulp.src('assets/css/**/*.css')
            .pipe(gulp.dest('static/css'))
            .pipe(liveReload());
});

gulp.task('html', function() {
    return gulp.src('assets/**/*.html')
                .pipe(gulp.dest('static'))
                .pipe(liveReload());
});

gulp.task('assets',['css', 'html']);

gulp.task('build', ['concat', 'assets']);



function mountFolder(server, dir) {
    return server.static(resolve(dir));
}

gulp.task('serve', ['build'], function() {
    connect.server({
        root: 'static',
        port: 9966,
        middleware: function(server) {
            return [connectLiveReload({
                port: LIVERELOAD_PORT
            }),
            mountFolder(server, 'static')
        ];
        }
    });
});

gulp.task('concat', function() {
    return gulp.src('es3/**/*.js')
            .pipe(concat('bundle.js'))
            .pipe(notify('Concatted <%= file.relative %>'))
            .pipe(gulp.dest('static/js'))
            .pipe(liveReload());
});

gulp.task('watch', function() {
    liveReload.listen();
    watch('assets/**/*.html', function() {
        return gulp.run('html');
    });
    watch('assets/**/*.css', function() {
        return gulp.run('css');
    });

});



gulp.task('auto-reload', function() {
    let nodeProcess;

    function spawnChildren() {
        // kill previous spawned process
        if (nodeProcess) {
            nodeProcess.kill();
        }
        // `spawn` a child `gulp` process linked to the parent `stdio`
        nodeProcess = spawn('gulp', [argv.task || 'default'], {stdio: 'inherit'});
    }

    gulp.watch('gulpfile.js', spawnChildren);
    spawnChildren();

    process.on('exit', function() {
        if (nodeProcess){
            nodeProcess.kill();
        }
    });
});

gulp.task('default', ['build', 'watch', 'serve']);


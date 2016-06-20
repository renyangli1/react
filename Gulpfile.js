var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var vinylPaths = require('vinyl-paths');
var reactify = require('reactify');
var babelify = require('babelify');
var del = require('del');
var revReplace = require('gulp-rev-replace');
var proxy = require("anyproxy");
var imagemin = require('gulp-imagemin');


var WEB_PORT = 7000;
var APP_DIR = 'app';
var DIST_DIR = 'dist';
var REV_DIR = 'rev';
/*
 *jshint 任务
 */
/*
 *清理
 */
function errorHandler(error) {
    console.log(error.toString());
    this.emit('end'); //报错仍继续
}

gulp.task('clean', function() {
    return gulp.src([DIST_DIR, REV_DIR], {
            read: false
        })
        .pipe($.clean());
});
// gulp.task('reactify-debug', function() {
//     return gulp.src(APP_DIR + '/views/**/*.jsx')
//         .pipe($.react())
//         .pipe(gulp.dest('dist'));
// });
/*
 *压缩html gulp-minify-html
 */
gulp.task('html-min', function() {
    return gulp.src([APP_DIR + '/**/*.html', '!app/demo.html'])
        .pipe($.minifyHtml())
        .pipe(gulp.dest('rev'));
});
gulp.task('html-min-debug', function() {
    return gulp.src(APP_DIR + '/**/*.html')
        .pipe($.minifyHtml())
        .pipe(gulp.dest(DIST_DIR));
});

/*
 *编译sass文件gulp-scss
 */
gulp.task('scss-compile', function() {
    return gulp.src(APP_DIR + '/scss/index.scss')
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe(gulp.dest('rev/css'));
});
gulp.task('scss-compile-debug', function() {
    return gulp.src(APP_DIR + '/scss/index.scss')
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe(gulp.dest('dist/css'));
});
/*
 *压缩图片gulp-imagemin
 */
gulp.task('image-debug', function() {
    return gulp.src(APP_DIR + '/img/**/*.{png,jpg,gif,ico}')
        .pipe($.imagemin({
            progressive: false,
            svgoPlugins: [{
                    removeViewBox: false
                }]
                /*            use: [pngquant(), gifsicle({
                                interlaced: true
                            })]*/
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('image', function() {
    return gulp.src(APP_DIR + '/img/*.{png,jpg,gif,ico}')
        .pipe($.imagemin({
            progressive: false,
            svgoPlugins: [{
                removeViewBox: false
            }],
            /*            use: [pngquant(), gifsicle({
                            interlaced: true
                        })]*/
        }))
        .pipe(gulp.dest('rev/img'));
});
/*
 *模块化转换
 */
gulp.task('browserify', function() {
    return browserify({
            entries: [APP_DIR + '/js/index.js'],
            transform: [reactify]
        }).ignore('zepto')
        // .transform(sassify(), {
        //     file: path.resolve('rev', 'css')
        // })
        // .transform(riotify())
        .bundle()
        .on('error', errorHandler)
        .pipe(source('index.js'))
        .pipe(gulp.dest(REV_DIR + '/js'));
});
gulp.task('browserify-debug', function() {
    return browserify({
            noParse: ['zepto', 'react'], //忽略
            entries: [APP_DIR + '/js/index.js'], //入口文件
            debug: true,
            transform: [reactify]
                //transform: ['reactify']
        }).ignore('zepto').ignore('react')
        //.transform(babelify)
        // .transform(reactify())
        // .transform(sassify(), {
        //     file: path.resolve('dist', 'css')
        // })
        .bundle()
        .on('error', errorHandler)
        .pipe(source('index.js')) //将流写入文件index.js
        .pipe(gulp.dest(DIST_DIR + '/js/')); //目标目录
});
/*
 *第三方库模块转换
 */
gulp.task('lib', function() {
    return browserify({
            entries: [APP_DIR + '/js/lib.js']
        })
        // .transform(sassify(), {
        //     'auto-inject': true, // Inject css directly in the code
        //     base64Encode: false, // Use base64 to inject css
        //     sourceMap: false // Add source map to the code
        // })
        .bundle().on('error', errorHandler)
        .pipe(source('lib.js'))
        .pipe(gulp.dest(REV_DIR + '/js/'));
});

gulp.task('lib-debug', function() {
    return browserify({
            entries: [APP_DIR + '/js/lib.js'],
            debug: true
        })
        // .transform(sassify(), {
        //     'auto-inject': true, // Inject css directly in the code
        //     base64Encode: false, // Use base64 to inject css
        //     sourceMap: false // Add source map to the code
        // })
        .bundle().on('error', errorHandler)
        .pipe(source('lib.js'))
        .pipe(gulp.dest(DIST_DIR + '/js/'));
});
/*
 *重新加载
 */
gulp.task('reload', function() {
    return gulp.src([DIST_DIR]).pipe($.connect.reload());
});
/*
 *监听文件改动
 */
//html改动
gulp.task('watch-html', function(cb) {
    $.sequence('html-min-debug', 'reload')(cb);
});
//资源文件改动
gulp.task('watch-assets', function(cb) {
    gulp.src(['dist/css'], {
            read: false
        })
        .pipe($.clean());
    $.sequence(
        'browserify-debug',
        'scss-compile-debug',
        //'lib-debug',
        'scss-compile-debug',
        //'css-concat-debug',
        //'post-assets-debug',
        'copy-cfg-debug',
        'reload'
    )(cb);
});
//图片改动
gulp.task('watch-img', function(cb) {
    gulp.src(['dist/img'], {
            read: false
        })
        .pipe($.clean());
    $.sequence('image-debug', 'reload')(cb);
});
gulp.task('watch', function() {
    gulp.watch(APP_DIR + '/**/*.html', ['watch-html']);
    gulp.watch([APP_DIR + '/**/*.js', APP_DIR + '/**/*.jsx', APP_DIR + '/**/*.css', APP_DIR + '/**/*.scss'], ['watch-assets']);
    gulp.watch([APP_DIR + '/img/*.*'], ['watch-img']);
    gulp.watch([APP_DIR + '/scss/*.scss', APP_DIR + '/js/*.js']);
});
/*
 *http服务 
 */
gulp.task('http-server-debug', function() {
    $.connect.server({
        root: DIST_DIR,
        port: WEB_PORT,
        livereload: {
            port: 35735
        }
    });
});
gulp.task('http-server', function() {
    $.connect.server({
        root: REV_DIR,
        port: WEB_PORT,
        livereload: false,
        middleware: function(connect) {
            return [
                connect.middleware.compress()
            ];
        }
    });
});
/*
 *添加文件hash
 */
gulp.task('asset-rev', function() {
    return gulp.src(['./rev/**/*.css', './rev/**/*.js'])
        //vinyl-paths 获取路径名称，作为第一个参数传入del:删除文件
        .pipe(vinylPaths(del))
        //文件名添加hash
        .pipe($.rev())
        //写到rev文件夹下
        .pipe(gulp.dest('rev'))
        //记录原名称与新名称的映射表
        .pipe($.rev.manifest({
            exclude: ['cfg.js']
        }))
        //将manifest到rev下
        .pipe(gulp.dest(REV_DIR));
});
/*
 *生成html5缓存manifest文件
 */
gulp.task('manifest', function() {
    return gulp.src(['rev/**/*'])
        .pipe($.rev.manifest({
            hash: true,
            preferOnline: true,
            network: ['http://*', 'https://*', '*'],
            filename: 'index.manifest',
            exclude: ['index.manifest', 'cfg.js']
        }))
        .pipe(gulp.dest(REV_DIR));
});
/*
 *html替换已hash名称的文件名
 */
gulp.task('html-assets-replace', function() {
    //读取mainfest文件
    var manifest = gulp.src("./rev/rev-manifest.json");
    return gulp.src("rev/**/*.html")
        //替换上html中manifest文件中的名称
        .pipe($.revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(REV_DIR));
});
/*
 *混淆js
 */
gulp.task('js-uglify', function() {
    return gulp.src(['rev/**/*.js'])
        .pipe(buffer())
        .pipe($.uglify()).on('error', errorHandler)
        .pipe(gulp.dest(REV_DIR));
});

gulp.task('css-minify', function() {
    return gulp.src(['rev/**/*.css'])
        .pipe(buffer())
        .pipe($.minifyCss({
            keepSpecialComments: 0
        })).on('error', errorHandler)
        .pipe(gulp.dest(REV_DIR));
});
/*
 *复制非压缩文件
 */
gulp.task('copy-cfg-debug', function() {
    return gulp.src(APP_DIR + '/cfg.js')
        .pipe(gulp.dest(DIST_DIR));
});
gulp.task('copy-cfg', function() {
    return gulp.src(APP_DIR + '/cfg.js')
        .pipe(gulp.dest(REV_DIR));
});

gulp.task('dev', function(cb) {
    $.sequence(
        'clean',
        'html-min-debug',
        'image-debug',
        'scss-compile-debug',
        'browserify-debug',
        'lib-debug',
        //'reactify-debug',
        //'css-concat-debug',
        //'post-assets-debug',
        'copy-cfg-debug',
        'http-server-debug',
        'watch'
    )(cb);
});
gulp.task('prod', function(cb) {
    $.sequence(
        'clean',
        'html-min',
        'image',
        'scss-compile',
        'browserify',
        'lib',
        'js-uglify',
        'css-minify',
        'asset-rev',
        'manifest',
        'html-assets-replace',
        //'post-assets',
        'copy-cfg')(cb);
});
gulp.task('default', ['dev']);
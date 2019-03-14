var gulp = require("gulp"),
    watch = require("gulp-watch"),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    webpack = require('webpack');

var prefixerOptions = {
    browsers: ["last 2 versions"]
};


//transform SASS to CSS 
gulp.task("style", function(){
    return gulp
        .src("./temp/sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({ includePaths: require("node-normalize-scss").includePaths }).on(
                "error",
                sass.logError
            )
        )
        .pipe(prefix(prefixerOptions))
        .on("error", function(errorInfo){
            console.log(errorInfo.toString());
            this.emit("end");
        })
        .pipe(rename("main.css"))
        .pipe(gulp.dest("./styles/"))
        .pipe(cssmin())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("./styles/"));
});

//webpack config
gulp.task('scripts', function(callback){
    webpack(require('./webpack.config'), function(err, stats){
        if(err){
            console.log(err.toString());
        }
        console.log(stats.toString());
        callback();
    });
});




//WATCH Tasks
gulp.task("watch", function(){
    gulp.watch('./temp/sass/**/*.scss',gulp.series('style'));
    gulp.watch('./temp/js/**/*.js', gulp.series('scripts'));
});


var gulp = require("gulp"),
    watch = require("gulp-watch"),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-cssnano'),
    rename = require('gulp-rename');

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

gulp.task("watch", function(){
    gulp.watch('./temp/sass/**/*.scss',gulp.series('style'));
});


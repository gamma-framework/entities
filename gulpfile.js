var gulp = require("gulp");
var util = require("gulp-util");
var typescript = require("gulp-typescript");
var yargs = require("yargs");
var clean = require("gulp-clean");
var karma = require("karma");
var path = require("path");

var sourceConfigName = path.resolve(yargs.argv["tsconfig"] || "tsconfig.code.json");
var karmaConfigName = path.resolve(yargs.argv["karma"] || "karma.conf.js");

util.log("-----------------------------------------");
util.log("Configuration: " + sourceConfigName);
util.log("-----------------------------------------");

var tsProject = typescript.createProject(sourceConfigName);

gulp.task("clean-sources", function ()
{
    return gulp
        .src(path.resolve(tsProject.config.compilerOptions.outDir))
        .pipe(clean({ force: true }));
});

gulp.task("build", ["clean-sources"], function ()
{
    var result = tsProject.src().pipe(tsProject());

    result.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
    result.dts.pipe(gulp.dest(tsProject.config.compilerOptions.outDir));

    gulp
    .src([path.resolve('./package.json'),
          path.resolve('./readme.md')])
    .pipe(gulp.dest(tsProject.config.compilerOptions.outDir));

    return result;
});

gulp.task("test", function (callback)
{
    var karmaServer = new karma.Server({ configFile: karmaConfigName }, callback);
    return karmaServer.start();
});

gulp.task("default", ["build"]);
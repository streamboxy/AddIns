const gulp = require("gulp");
const process = require("process");
var transformJson = require('gulp-transform-json');
var clean = require('gulp-clean');

function getBuildNumber() {
    console.log(`Getting current build number...`);
    const buildNo = process.env.BUILD_BUILDID;

    return buildNo;
}

gulp.task("write-version", () => {
    console.log("Writing buildNo to version...");

    return gulp.src('./package.json')
        .pipe(transformJson('**/version', (val, path) => {
            const el = val.split('.');

            return `${el[0]}.${el[1]}.${getBuildNumber()}`;

        }))
        .pipe(gulp.dest('.'));
});

gulp.task("copy-package-json", () => {
    console.log("Copying package.json to outDir...");

    return gulp.src("./package.json")
        .pipe(gulp.dest('./lib'));
});

gulp.task("clean-out-dir", () => {
    console.log("Cleaning outDir...");

    return gulp.src("./lib", { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task("clean-test-results", () => {
    console.log("Cleaning test results...");

    return gulp.src("./**/junit.xml", { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task("clean-coverage-results", () => {
    console.log("Cleaning coverage results...");

    return gulp.src("./coverage", { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task("clean", gulp.parallel(
    "clean-out-dir",
    "clean-test-results",
    "clean-coverage-results",
));
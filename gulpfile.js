const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
//const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const webpack = require("webpack-stream");

const dist = "./dist/"; // Тут адрес к вашему серверу

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch("dist/*.html").on("change", browserSync.reload);
  gulp.watch("dist/*.js").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/assets/sass/**/*.+(scss|sass)")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      rename({
        suffix: ".min",
        prefix: "",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("dist/assets/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/assets/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("fonts", function () {
  return gulp.src("src/assets/fonts/**/*").pipe(gulp.dest("dist/assets/fonts"));
});

gulp.task("icons", function () {
  return gulp.src("src/assets/icons/**/*").pipe(gulp.dest("dist/assets/icons"));
});

gulp.task("image", function () {
  return gulp.src("src/assets/img/**/*").pipe(gulp.dest("dist/assets/img"));
});

// gulp.task("images", function () {
//   return gulp
//     .src("src/assets/img/**/*")
//     //.pipe(imagemin())
//     .pipe(gulp.dest("dist/assets/img"));
// });

gulp.task("build-js", () => {
  return gulp
    .src("./src/js/main.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "script.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: true,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(dist))
    .on("end", browserSync.reload);
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "fonts",
    "icons",
    "image",
    "html",
    "build-js"
  )
);

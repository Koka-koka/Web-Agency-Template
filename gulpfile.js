const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const svgSprite = require("gulp-svg-sprite");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const include = require("gulp-include");

function assemblyPages() {
  return src("app/pages/*.html")
    .pipe(
      include({
        includePaths: "app/components",
      })
    )
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

function convertFonts() {
  return src("app/fonts/src/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("app/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("app/fonts"));
}

function optimizeImages() {
  return src(["app/images/src/**/*.*", "!app/images/src/**/*.svg"])
    .pipe(newer("app/images"))
    .pipe(avif({ quality: 50 }))

    .pipe(src("app/images/src/**/*.*"))
    .pipe(newer("app/images"))
    .pipe(webp())

    .pipe(src("app/images/src/**/*.*"))
    .pipe(newer("app/images"))
    .pipe(imagemin())

    .pipe(dest("app/images"));
}

function sprite() {
  return src("app/images/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("app/images"));
}

function buildStyles() {
  return src([
    "./node_modules/aos/src/sass/aos.scss",
    "./node_modules/swiper/swiper-bundle.css",
    "app/scss/style.scss",
  ])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function buildScripts() {
  return src([
    "./node_modules/aos/dist/aos.js",
    "./node_modules/swiper/swiper-bundle.js",
    "app/js/main.js",
  ])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function buildDist() {
  return src(
    [
      "app/css/style.min.css",
      "app/js/main.min.js",
      "app/images/**/*.*",
      "!app/images/src/**/*.*",
      "app/fonts/*.*",
      "app/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function watching() {
  watch(["app/scss/**/*.scss"], buildStyles);
  watch(["app/js/main.js"], buildScripts);
  watch(["app/images/src"], optimizeImages);
  watch(["app/components/*", "app/pages/*"], assemblyPages);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

exports.buildStyles = buildStyles;
exports.buildScripts = buildScripts;
exports.optimizeImages = optimizeImages;
exports.sprite = sprite;
exports.convertFonts = convertFonts;
exports.assemblyPages = assemblyPages;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, buildDist);
exports.default = parallel(
  buildStyles,
  buildScripts,
  optimizeImages,
  assemblyPages,
  browsersync,
  watching
);

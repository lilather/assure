
const {
  src,
  dest
} = require('gulp');
const gulp = require('gulp');
const browserSync = require("browser-sync").create();
const plugins = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('sass'));
const workboxBuild = require('workbox-build');

function pug() {
  return src('./pug/**/*.pug').pipe(plugins.pug()).pipe(dest('./'))
}

function pug_portfolio() {
  return src('./pug/portfolio/*.pug').pipe(plugins.pug()).pipe(dest('./portfolio'))
}

function scss() {
  // body omitted
  return src('./sass/*.scss').pipe(sass({outputStyle: 'compressed'})).pipe(dest('./css/'))
}

function uglifyJs(){
  return src('./js/*.js').pipe(plugins.uglify()).pipe(dest('./js/'))

}
function webP() {
  return src('./img/**/*')
    .pipe(plugins.webp())
    .pipe(dest('./img/'))
}

function imgMin(){
  return src('./img/*').pipe(plugins.imagemin([plugins.imagemin.mozjpeg({quality: 75, progressive: true}),
    plugins.imagemin.optipng({optimizationLevel: 5}),])).pipe(dest('./img/'))
}

function gSW(){
  return workboxBuild.generateSW({
    globDirectory: './',
    globPatterns: [
      '**/*.{html,json,js,css}',
    ],
    swDest: './sw.js',
  });
}
/*
function css() {
  // body omitted
  return src( ["./dev/css/main.css","./dev/css/color.css","./dev/css/fonts.css","./dev/css/utilities.css","./dev/css/responsive.css"]).pipe(plugins.concatCss('bundle.css'))
  .pipe((plugins.cleanCss())).pipe(plugins.purgecss({ content: ["./prod/*.html"] })).pipe(dest('./prod/css/')).pipe(plugins.gzip()).pipe(gulp.dest("./prod/css/"));
}

function js(){
  return src("./dev/js/*.js").pipe(plugins.concat('bundle.js')).pipe(plugins.babel({
    presets: ['@babel/env']
})).pipe(plugins.uglify()).pipe(gulp.dest('./prod/js')).pipe(plugins.gzip()).pipe(gulp.dest("./prod/js/"));
}

function html(){
return src('./dev/*html').pipe(plugins.htmlclean()).pipe(gulp.dest('./prod/'))
}

function img(){
  return src('./dev/img/*').pipe(
   plugins.imagemin()).pipe(gulp.dest('./prod/img/')).pipe(plugins.webp()).pipe(gulp.dest('./prod/img/'));
  }

function zip(){
return src("./*").pipe(plugins.zip(sitename+".zip")).pipe(gulp.dest("../"))
}


*/
function sitemap(){
  return src("./*.html", {
    read: false,
  })
    .pipe(
      plugins.sitemap({
        siteUrl:"https://www.assurestudios.com",
      })
    )
    .pipe(gulp.dest("./"));
}

function watchDev(done) {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  plugins.watch('./js/*.js', uglifyJs()).on('change', browserSync.reload);

  plugins.watch('./sass/*.scss', scss).on('change', browserSync.reload);
  plugins.watch('./pug/*.pug', pug).on('change', browserSync.reload);
  done();
}
exports.sitemap=sitemap;
exports.gSW=gSW;
exports.uglifyJs=uglifyJs;
exports.imgMin=imgMin;
exports.webP=webP;
exports.watch = watchDev;
exports.pp = pug_portfolio;
exports.pug = pug;
exports.sass = scss;

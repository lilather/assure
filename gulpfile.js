const { src, dest } = require('gulp');
const gulp = require('gulp');
var browserSync = require("browser-sync").create();
const plugins = require('gulp-load-plugins')();
const sass = require('gulp-sass')(require('sass'));


function pug() {
  return src('./pug/*.pug').pipe(plugins.pug()).pipe(dest('./'))
}

 function scss() {
  // body omitted
  return src('./sass/*.scss').pipe(sass()).pipe(dest('./css/'))
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

function sitemap(){
  return src("./prod/*.html", {
    read: false,
  })
  .pipe(
    plugins.sitemap({
      siteUrl:sitename,
    })
  )
  .pipe(gulp.dest("./prod/"));
}
*/


function watchDev(done){
  browserSync.init({
    server: {
      baseDir: '.'
    }    
  });
  plugins.watch('./sass/*.scss', scss).on('change', browserSync.reload);;
  plugins.watch('./pug/*.pug', pug).on('change', browserSync.reload);
done();
  }


  
exports.watch= watchDev;

 exports.pug=pug;
 exports.sass=scss;
 
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache'); // 使用缓存

const src = './miniprogram';

// 使用postcss
gulp.task('css', () => {
  return gulp.src(`${src}/**/*.css`)
    .pipe(postcss())
    .pipe(rename((path) => {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest((file) => {
      return file.base; // 原目录
    }));
});

gulp.task('img', () => {
  // 修改你要压缩的图片地址
  return gulp.src(`${src}/**/*.{png,jpe?g,gif,svg}`)
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 4 }),
      imagemin.svgo({
        plugins: [
          { removeDimensions: true }, // 如果有 viewbox 则不需要 width 和 height
        ],
      }),
    ])))
    .pipe(gulp.dest((file) => {
      return file.base; // 压缩到原目录
    }));
});

gulp.task('watch', () => {
  gulp.watch(`${src}/**/*.css`, ['css']);
});

gulp.task('dev', ['css'], () => {
  runSequence('watch');
});

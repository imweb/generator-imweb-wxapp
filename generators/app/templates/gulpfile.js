// const gulp = require('gulp');
const { watch, src, dest, series, parallel } = require('gulp');
const rename = require('gulp-rename');
// const runSequence = require('run-sequence');
const postcss = require('gulp-postcss');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache'); // 使用缓存
const replace = require('gulp-replace');
const through2 = require('through2');
const jeditor = require('gulp-json-editor');
const gulpInstall = require('gulp-install');

const srcDir = './miniprogram';
// const appJson = require('./miniprogram/app.json');

function css() {
  return (
    src([`${srcDir}/**/*.css`, `!${srcDir}/**/_*.css`])
      .pipe(
        postcss().on('error', function(err) {
          console.error(err);
          this.emit('end'); // 防止中断
        })
      )
      // 去掉编译出来的 :root{}
      .pipe(replace(/:root\s\{[^}]*\}?\s*/, ''))
      .pipe(
        rename(path => {
          path.extname = '.wxss';
        })
      )
      .pipe(
        dest(file => {
          return file.base; // 原目录
        })
      )
  );
}

function img() {
  return src(`${srcDir}/**/*.{png,jpe?g,gif,svg}`)
    .pipe(
      cache(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 4 }),
          imagemin.svgo({
            plugins: [
              { removeDimensions: true }, // 如果有 viewbox 则不需要 width 和 height
            ],
          }),
        ])
      )
    )
    .pipe(
      dest(file => {
        return file.base; // 压缩到原目录
      })
    );
}

function nohost() {
  let host;
  if (process.argv[3]) {
    host = process.argv[3].split('=')[1];
  }
  return src(`${srcDir}/pages/*/*.wxml`)
    .pipe(
      through2.obj((file, _, cb) => {
        // console.log(file.contents.toString(), 'file');
        if (file.isBuffer()) {
          let contents = file.contents.toString();
          // 如果没有加 nohost
          if (!contents.includes('</nohost>')) {
            if (host) {
              contents += `<nohost host="${host}"></nohost>\r\n`;
            } else {
              contents += '<nohost></nohost>\r\n';
            }
          }
          file.contents = Buffer.from(contents);
        }
        cb(null, file);
      })
    )
    .pipe(
      dest(file => {
        return file.base; // 压缩到原目录
      })
    );
}

function nohostjson() {
  return src(`${srcDir}/app.json`)
    .pipe(
      jeditor(json => {
        json.usingComponents = // eslint-disable-line
          json.usingComponents && Object.keys(json.usingComponents).length > 0
            ? Object.assign(json.usingComponents, {
                nohost: '@tencent/weapp-nohost', // eslint-disable-line
              }) // eslint-disable-line
            : {
                nohost: '@tencent/weapp-nohost', // eslint-disable-line
              }; // eslint-disable-line
        return json;
      },
      {
        end_with_newline: true,
      })
    )
    .pipe(
      dest(file => {
        return file.base;
      })
    );
}

function nohostPkg() {
  return src(`${srcDir}/package.json`).pipe(
    gulpInstall({
      args: ['--save', '@tencent/weapp-nohost', '--registry=http://r.tnpm.oa.com ', '--proxy=http://r.tnpm.oa.com:80'],
    })
  );
}

function removeNohost() {
  return src(`${srcDir}/pages/*/*.wxml`)
    .pipe(
      through2.obj((file, _, cb) => {
        if (file.isBuffer()) {
          const contents = file.contents.toString();
          // 如果没有加 nohost
          file.contents = Buffer.from(contents.replace(/<nohost\s*\S*>.*<\/nohost>\r\n/gim, ''));
        }
        cb(null, file);
      })
    )
    .pipe(
      dest(file => {
        return file.base; // 压缩到原目录
      })
    );
}

function removeNohostJson() {
  return src(`${srcDir}/app.json`)
    .pipe(
      jeditor(json => {
        if (json.usingComponents && json.usingComponents.nohost) {
          delete json.usingComponents.nohost;
        }
        return json;
      },
      {
        end_with_newline: true,
      })
    )
    .pipe(
      dest(file => {
        return file.base;
      })
    );
}

function removeNohostPkg() {
  return src(`${srcDir}/package.json`)
    .pipe(
      jeditor(
        json => {
          if (json.dependencies && json.dependencies['@tencent/weapp-nohost']) {
            delete json.dependencies['@tencent/weapp-nohost'];
          }
          return json;
        },
        {
          end_with_newline: true,
        }
      )
    )
    .pipe(
      dest(file => {
        return file.base;
      })
    );
}

function watchCSS() {
  watch(`${srcDir}/**/*.css`, css);
}

exports.watchCSS = watchCSS;
exports.css = css;
exports.img = img;
exports.nohost = parallel(nohost, nohostjson, nohostPkg);
exports.removeNohost = parallel(removeNohost, removeNohostJson, removeNohostPkg);
exports.dev = series(css, watchCSS);
exports.default = css;

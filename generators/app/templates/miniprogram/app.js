import { tdw } from '@tencent/imwxutils';

App({
  onLaunch(options) {
    // 设置上报渠道信息
    tdw.configSource(options);
    tdw.config({}, { debug: false });
  },
  onError(err) {
    console.log('App.onError', err);
  },
  onPageNotFound(err) {
    console.log('App.onPageNotFound', err);
  },
});

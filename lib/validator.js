'use strict';

const fs = require('fs');

module.exports = {
    notEmpty: (v) => {
        return `${v}`.trim().length > 0;
    },
    pageName: (name) => {
        return /^[0-9a-z][0-9a-zA-Z]*$/.test(name);
    },
    fileExist: (name, dirPath) => {
        let dirInfo;

        try {
            dirInfo = fs.readdirSync(dirPath);
        } catch (e) { // 要检测的冲突目录不存在，直接返回“无冲突”
            return false;
        }

        return dirInfo.indexOf(name) > -1;
    }
};

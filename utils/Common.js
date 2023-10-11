class Common {

    /**
     * 截取两个字符串之间的字符串
     * @param {String} str 原字符串
     * @param {String} firstStr 起始字符串
     * @param {String} secondStr 截止字符串
     */
    static getCenterStr(str, firstStr, secondStr) {
        if (!str) return "";
        if (str.indexOf(firstStr) < 0) return "";
        let subFirstStr = str.substring(str.indexOf(firstStr) + firstStr.length, str.length);
        let subSecondStr = subFirstStr.substring(0, subFirstStr.indexOf(secondStr));
        return subSecondStr;
    }

    /**
     * 空值判定
     * @param {*} value 待验证值
     * @returns {Boolean} true:空; false:非空
     */
    static isEmpty(value) {
        if (value === null) return true;
        if (typeof value === 'undefined') return true;
        if (typeof value === 'string' && value === '') return true;
        if (Array.isArray(value) && value.length < 1) return true;
        if (typeof value === 'object' && value.constructor.name === 'Object' && Object.keys(value).length < 1 && Object.getOwnPropertyNames(value) < 1) return true;
        return false
    }

    /**
     * 生成n位随机数(默认6位)
     */
    static randomNum(n = 6) {
        let pwd = Math.floor(Math.random() * Math.pow(10, n)).toString(); //随机生成密码
        while (pwd.length < n) { // 不足位的密码补0
            pwd = `0${pwd}`;
        }
        return pwd;
    }

    /**
     * 将数组字典排序转成url参数传出
     * @param {Array} args 数组
     * @returns {string} 返回url
     */
    static returnSortStr(args) {
        let keys = Object.keys(args)
        keys = keys.sort()
        let newArgs = {}
        keys.forEach(function (key) {
            newArgs[key] = args[key]
        })
        let hasParam = false
        let string = ''
        for (let k in newArgs) {
            let val = newArgs[k]
            if (null == k || "" === k || null == val || "" === val) {

            } else {
                if (hasParam) string += '&'
                else hasParam = true
                string += k + '=' + newArgs[k]
            }
        }
        return string
    }

    /**
     * 把对象转成query参数
     * @param objQuery
     * @returns {string}
     */
    static obj2QueryParams(objQuery) {
        var string = '';
        let keys = Object.keys(objQuery);
        for (let k of keys) {
            string += '&' + k + '=' + objQuery[k];
        }
        string = string.substr(1);
        return string;
    }

    static query2ObjParams(strQuery) {
        if (this.isEmpty(strQuery)) return {};
        let qs = strQuery.split('?')[1], //取得查询字符串并去掉开头的问号
            //保存数据的对象
            args = {},
            //取得每一项
            items = qs.length ? qs.split("&") : [];
        //逐个将每一项添加到 args 对象中
        for (let item of items) {
            item = item.split("=");
            let key = decodeURIComponent(item[0]); //把已编码的url转换成原字符
            let value = decodeURIComponent(item[1]);
            if (key.length) {
                args[key] = value;
            }
        }
        return args;
    }

    /**
     * 生成token(由大写字母+数字组成)
     */
    static generateToken() {
        const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let token = "";
        for (let i = 0; i < 16; i++) {
            let id = Math.ceil(Math.random() * 35);
            token += chars[id];
        }
        return token;
    }

    /**
     * 邮箱正则验证
     * @param {String} str 邮箱号
     */
    static isEmail(str) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(str);
    };

    /**
     * ip正则验证
     * @param {String} str ip
     */
    static isIp(str) {
        var reg = /^(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|[1-9])\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)\.(1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d)$/;
        return reg.test(str);
    };

    /**
     * 获取Map中所需的key对应的value
     * @param {Array} fields 想要的key
     * @param {Map} arr 原始对象
     * @returns {Map} 返回整合所需key的Map
     */
    static getFieldsValue(fields, arr) {
        if (!fields || fields === '*') return arr
        let a = {}
        for (let index in fields) {
            let key = fields[index]
            a[key] = arr[key]
        }
        return a
    }

    /**
     * 随机生成字符串
     * @param {Number} len 要生成的字符串长度(默认32位)
     * @returns {String} 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
     */
    static randomString(len) {
        len = len || 32;
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let maxPos = chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }

    /**
     * 随机手机号码
     * @returns {String} 返回随机手机号
     */
    static randomMobile() {
        let tel_arr = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '144', '147', '150', '151', '152', '153', '155', '156', '157', '158', '159', '176', '177', '178', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189'];
        return tel_arr[Math.floor(Math.random() * tel_arr.length)] + Common.randomCenterNum(10000000, 99999999);
    }

    /**
     * 获取两个数字之间的随机整数
     * @param num1 小的数
     * @param num2 大的数
     * @returns {number}
     */
    static randomCenterNum(num1, num2) {
        return Math.floor(Math.random() * (num2 - num1) + num1);
    }

    /**
     * 获取随机中文名
     */
    static randomChineseName() {
        let xingArr = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋',
            '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏',
            '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭',
            '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '任', '袁', '柳', '鲍', '史', '唐', '费', '薛',
            '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '安', '常', '傅', '卞', '齐', '元', '顾', '孟',
            '平', '黄', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '狄', '米', '伏', '成', '戴', '谈',
            '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '季', '贾',
            '路', '娄', '江', '童', '颜', '郭', '梅', '盛', '林', '钟', '徐', '邱', '骆', '高', '夏', '蔡', '田',
            '樊', '胡', '凌', '霍', '虞', '万', '支', '柯', '管', '卢', '莫', '柯', '房', '裘', '缪', '解', '应',
            '宗', '丁', '宣', '邓', '单', '杭', '洪', '包', '诸', '左', '石', '崔', '吉', '龚', '程', '嵇', '邢',
            '裴', '陆', '荣', '翁', '荀', '于', '惠', '甄', '曲', '封', '储', '仲', '伊', '宁', '仇', '甘', '武',
            '符', '刘', '景', '詹', '龙', '叶', '幸', '司', '黎', '溥', '印', '怀', '蒲', '邰', '从', '索', '赖',
            '卓', '屠', '池', '乔', '胥', '闻', '莘', '党', '翟', '谭', '贡', '劳', '逄', '姬', '申', '扶', '堵',
            '冉', '宰', '雍', '桑', '寿', '通', '燕', '浦', '尚', '农', '温', '别', '庄', '晏', '柴', '瞿', '阎',
            '连', '习', '容', '向', '古', '易', '廖', '庾', '终', '步', '都', '耿', '满', '弘', '匡', '国', '文',
            '寇', '广', '禄', '阙', '东', '欧', '利', '师', '巩', '聂', '关', '荆', '司马', '上官', '欧阳', '夏侯',
            '诸葛', '闻人', '东方', '赫连', '皇甫', '尉迟', '公羊', '澹台', '公冶', '宗政', '濮阳', '淳于', '单于',
            '太叔', '申屠', '公孙', '仲孙', '轩辕', '令狐', '徐离', '宇文', '长孙', '慕容', '司徒', '司空'];

        let mingArr = ['伟', '刚', '勇', '毅', '俊', '峰', '强', '军', '平', '保', '东', '文', '辉', '力', '明', '永', '健', '世', '广', '志', '义',
            '兴', '良', '海', '山', '仁', '波', '宁', '贵', '福', '生', '龙', '元', '全', '国', '胜', '学', '祥', '才', '发', '武', '新',
            '利', '清', '飞', '彬', '富', '顺', '信', '子', '杰', '涛', '昌', '成', '康', '星', '光', '天', '达', '安', '岩', '中', '茂',
            '进', '林', '有', '坚', '和', '彪', '博', '诚', '先', '敬', '震', '振', '壮', '会', '思', '群', '豪', '心', '邦', '承', '乐',
            '绍', '功', '松', '善', '厚', '庆', '磊', '民', '友', '裕', '河', '哲', '江', '超', '浩', '亮', '政', '谦', '亨', '奇', '固',
            '之', '轮', '翰', '朗', '伯', '宏', '言', '若', '鸣', '朋', '斌', '梁', '栋', '维', '启', '克', '伦', '翔', '旭', '鹏', '泽',
            '晨', '辰', '士', '以', '建', '家', '致', '树', '炎', '德', '行', '时', '泰', '盛', '雄', '琛', '钧', '冠', '策', '腾', '楠',
            '榕', '风', '航', '弘', '秀', '娟', '英', '华', '慧', '巧', '美', '娜', '静', '淑', '惠', '珠', '翠', '雅', '芝', '玉', '萍',
            '红', '娥', '玲', '芬', '芳', '燕', '彩', '春', '菊', '兰', '凤', '洁', '梅', '琳', '素', '云', '莲', '真', '环', '雪', '荣',
            '爱', '妹', '霞', '香', '月', '莺', '媛', '艳', '瑞', '凡', '佳', '嘉', '琼', '勤', '珍', '贞', '莉', '桂', '娣', '叶', '璧',
            '璐', '娅', '琦', '晶', '妍', '茜', '秋', '珊', '莎', '锦', '黛', '青', '倩', '婷', '姣', '婉', '娴', '瑾', '颖', '露', '瑶',
            '怡', '婵', '雁', '蓓', '纨', '仪', '荷', '丹', '蓉', '眉', '君', '琴', '蕊', '薇', '菁', '梦', '岚', '苑', '婕', '馨', '瑗',
            '琰', '韵', '融', '园', '艺', '咏', '卿', '聪', '澜', '纯', '毓', '悦', '昭', '冰', '爽', '琬', '茗', '羽', '希', '欣', '飘',
            '育', '滢', '馥', '筠', '柔', '竹', '霭', '凝', '晓', '欢', '霄', '枫', '芸', '菲', '寒', '伊', '亚', '宜', '可', '姬', '舒',
            '影', '荔', '枝', '丽', '阳', '妮', '宝', '贝', '初', '程', '梵', '罡', '恒', '鸿', '桦', '骅', '剑', '娇', '纪', '宽', '苛',
            '灵', '玛', '媚', '琪', '晴', '容', '睿', '烁', '堂', '唯', '威', '韦', '雯', '苇', '萱', '阅', '彦', '宇', '雨', '洋', '忠',
            '宗', '曼', '紫', '逸', '贤', '蝶', '菡', '绿', '蓝', '儿', '翠', '烟', '小', '轩'];
        let xingIndex = Math.floor(Math.random() * xingArr.length + 1) - 1;
        let mingIndex = Math.floor(Math.random() * mingArr.length + 1) - 1;
        return xingArr[xingIndex] + mingArr[mingIndex];
    }

    //数据库字判定 通过是返回false
    static verifyStrL(str, leng = 0) {
        if (this.isEmpty(str)) return "对象为空";
        if (str.length > leng) return "超出指定长度";
        return false;
    }

    //获取随机ip地址
    static getRandIP() {
        var ip = [];
        for (var i = 0; i < 4; i++) {
            ip = ip + Math.floor(Math.random() * 256) + "."
        }
        ip = ip.substring(0, ip.length - 1);
        return ip
    }

    //转化json对象成xml字符串
    static convertJS2XML(obj) {
        let keys = Object.keys(obj);
        let xml = '<xml>';
        for (let key of keys) {
            let value = obj[key];
            xml += `<${key}>${value}</${key}>`
        }
        xml += '</xml>';
        return xml;
    }

    //删除多个keys
    static delKeys(obj, arrKeys = []) {
        arrKeys.map(function (key) {
            delete obj[key];
        })
        return obj;
    }

    static async timeSleep(ms) {
        await new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, ms);
        });
    }

    /**
     * 数组排序
     * @param key 数组对象里面的key
     * @param sort 排序 asc正序  desc倒序
     */
    static arrCompare(key, sort = 'asc') {
        return function (m, n) {
            let a = m[key];
            let b = n[key];
            if (sort == 'asc') {
                return a - b; //升序 从小到大
            } else return b - a; //倒序 从大到小

        }
    }

    static historyPushRefresh(history, path) {
        history.push(path);
        history.go(0);
    }

    /**
     * 获取get url的参数
     * @returns {string}
     * @param useLocationObj
     */
    static getUrlParamsByUseLocation(useLocationObj) {
        return this.obj2QueryParams(useLocationObj.search);
    }

    static success(data, msg, code) {
        return {
            code: code || 0,
            msg: msg || 'success',
            data
        }
    }

    static error(msg, code, data) {
        return {
            code: code || 1,
            msg: msg || 'error',
            data
        }
    }

    static disabledDate(current) {
        return current && current < moment().add(-1, "days").endOf('day');
    }

    static isUSAPhone(str) {
        var reg = /^\d{10}$/;
        return reg.test(str);
    }

    static isUSAZipCode(str) {
        var reg = /^\d{5}$/;
        return reg.test(str);
    }

    //格式化显示美国电话号码
    static formatUSAPhoneStr(phone) {
        try {
            return `(${phone.substr(0, 3)})${phone.substr(3, 3)}-${phone.substr(6)}`;
        } catch (e) {
            return phone;
        }
    }

    //获取用户时区
    static getClientTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    static loadJs(url) {
        var link = document.createElement('script');
        link.type = 'text/javascript';
        link.src = url;
        document.head.appendChild(link);
    }

    static urlToLink(str) {
        var re = /(https?:\/\/[^\s]+)/g;

        str = str.replace(re, function (website) {
            return "<a href='" + website + "' target='_blank'>" + website + "</a>";
        });
        return str;
    };
}

module.exports = Common;

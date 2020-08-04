//获取元素对象
function $(obj, flag) {
    if (flag) {
        return document.querySelectorAll(obj);
    } else {
        return document.querySelector(obj);
    }
}

//ajax封装
function objToString(obj) {
    let arr = [];
    for (let i in obj) {
        arr.push(i + '=' + obj[i]);
    }
    let str = arr.join('&');
    return str;
}


function $ajax(obj) {
    let promise = new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();
        obj.type = obj.type || 'GET';
        if (!obj.url) {
            throw new Error('请输入地址');
        }
        if (obj.data && Object.prototype.toString.call(obj.data) === 'object') {
            obj.data = objToString(obj.data);
        }

        if (obj.type === 'GET' && obj.data) {
            obj.url = obj.url + '?' + obj.data;
        }
        if (obj.async === "false" || obj.async === false) {
            obj.async = false;
        } else {
            obj.async = true;
        }

        ajax.open(obj.type, obj.url, obj.async);


        if (obj.type === 'POST' && obj.data) {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(obj.data);
        } else {
            ajax.send()
        }

        if (obj.async) {
            ajax.onreadystatechange = function () {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) {
                        resolve(ajax.responseText)
                    } else {
                        reject('你的接口地址有误');
                    }
                }
            }
        } else {
            if (ajax.status === 200) {
                resolve(ajax.responseText);
            } else {
                reject('你的接口地址有误');
            }
        }
    });

    return promise;
}

//cookie
let cookie = {
    set: function (key, value, date) {
        let d = new Date();
        d.setDate(d.getDate() + date);
        document.cookie = `${key}=${encodeURIComponent(value)};expires=${d};path=/`;
    },
    get: function (key) {
        let arr = decodeURIComponent(document.cookie).split('; ');
        for (let value of arr) {
            let newArr = value.split('=');
            if (newArr[0] === key) {
                return newArr[1];
            }
        }

    },
    remove: function (key) {
        cookie.set(key, '', -1);
    }
}

//运动封装
function getAttribute(obj, att) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[att]
    } else {
        return obj.currentStyle[att]
    }
}

function bufferMove(obj, json, fn) {
    let speed;
    let currentStyle;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        let flag = true;
        for (var att in json) {
            if (att === 'opacity') {
                currentStyle = Math.round(getAttribute(obj, att) * 100);
            } else {
                currentStyle = parseInt(getAttribute(obj, att));
            }

            speed = (json[att] - currentStyle) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


            if (currentStyle !== json[att]) {
                if (att === 'opacity') {
                    obj.style[att] = (speed + currentStyle) / 100;
                } else {
                    obj.style[att] = speed + currentStyle + 'px';
                }
                flag = false;
            }
            if (flag) {
                clearInterval(obj.timer);
                fn && fn();
            }
        }
    }, 1000 / 60)
}







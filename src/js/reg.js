;!function () {
    let phoneNum = $('.phone');
    let warn = $('.warn', 1);
    console.log(warn);
    phoneFlag = null;
    phoneNum.onblur = () => {
        warn[0].style.color = '#ff5959'
        if (phoneNum.value !== '') {
            let value = phoneNum.value
            let phoneReg = /^1[3578]\d{9}$/;
            if (phoneReg.test(value)) {
                $ajax({
                    url: 'http://localhost/PerfectWord/php/reg.php',
                    data: 'phone=' + value,
                }).then(function (data) {
                    console.log(data);
                    if (data === '1') {
                        warn[0].innerHTML = '此账号可用';
                        warn[0].style.visibility = 'visible';
                        warn[0].style.color = '#a4e941';
                        phoneFlag = true;
                        border(phoneNum, phoneFlag);
                    } else {
                        warn[0].innerHTML = '对不起，用户名已存在！';
                        warn[0].style.visibility = 'visible';
                        phoneFlag = false;
                        border(phoneNum, phoneFlag);
                    }
                })
            } else {
                warn[0].innerHTML = '手机号格式不正确';
                warn[0].style.visibility = 'visible';
                phoneFlag = false;
                border(phoneNum, phoneFlag);
            }

        } else {
            warn[0].innerHTML = '不能为空';
            warn[0].style.visibility = 'visible';
            phoneFlag = false;
            border(phoneNum, phoneFlag);
        }
    }

//    密码验证
    let password = $('.password');
    let ranks = $('.level span', 1);
    console.log(ranks);
    console.log(password);
    passwordFlag = null;
    let count;
    password.oninput = () => {
        warn[1].style.color = '#ff5959';
        ranks[0].className = 'low';
        if (password.value !== '') {
            let value = password.value;
            let passwordLength = value.length;

            count = 0;
            let lowerReg = /[a-z]+/g;
            let upperReg = /[A-Z]+/g;
            let numReg = /\d+/g;
            let otherReg = /[\W\_]+/g;
            if (numReg.test(value)) {
                count++;
            }
            if (lowerReg.test(value)) {
                count++
            }
            if (upperReg.test(value)) {
                count++;
            }
            if (otherReg.test(value)) {
                count++;
            }
            switch (count) {
                case 1: {
                    warn[1].innerHTML = '密码必须包含大写字母、小写字母、数字、符号至少3种';
                    warn[1].style.visibility = 'visible'
                    ranks[0].className = 'low';
                    ranks[1].className = '';
                    ranks[2].className = '';
                    passwordFlag = false;
                    border(password, passwordFlag);
                    break;
                }
                case 2:
                    ;
                case 3: {
                    // warn[1].innerHTML = '';
                    ranks[0].className = '';
                    ranks[1].className = 'middle';
                    ranks[2].className = '';
                    passwordFlag = true;
                    border(password, passwordFlag);
                    break;
                }
                case 4: {
                    // warn[1].innerHTML = '';
                    ranks[0].className = '';
                    ranks[1].className = '';
                    ranks[2].className = 'high';
                    passwordFlag = true;
                    border(password, passwordFlag);
                    break;
                }
            }
            if (passwordLength >= 8 && passwordLength <= 16) {
                warn[1].innerHTML = '';
                warn[1].style.visibility = 'visible';
            } else {
                warn[1].innerHTML = '密码长度必须在8-16个字符之间';
                warn[1].style.visibility = 'visible';
                passwordFlag = false;
                border(password, passwordFlag);
            }

        } else {
            ranks[0].className = 'low';
            ranks[1].className = '';
            ranks[2].className = '';
            warn[1].innerHTML = '不能为空';
            warn[1].style.visibility = 'visible'
            passwordFlag = false;
            border(password, passwordFlag);
        }
        console.log(passwordFlag);
    }

    //重复密码
    let repeatFlag = null;
    let repeat = $('.repeat');
    console.log(repeat);
    repeat.onblur = function () {
        if (repeat.value !== '') {
            let repeatValue = repeat.value;
            if (repeatValue === password.value) {
                warn[2].style.visibility = 'hidden';
                if (passwordFlag) {
                    repeatFlag = true;
                    console.log(repeatFlag);
                }
                border(repeat, true);
            } else {
                warn[2].innerHTML = '两次输入的密码不一致';
                warn[2].style.visibility = 'visible';
                repeatFlag = false;
                border(repeat, repeatFlag);
            }
        } else {
            warn[2].innerHTML = '不能为空';
            warn[2].style.visibility = 'visible';
            repeatFlag = false;
            border(repeat, repeatFlag);
        }
    }

    function border(obj, boolean) {
        if (boolean === false) {
            obj.style.borderColor = '#ed1919';
        } else if (boolean === true) {
            obj.style.borderColor = '#dbdbdb';
        }
    }

    let btnSubmit = $('.submit');
    console.log(btnSubmit);
    btnSubmit.onclick = function (event) {
        var event = event || window.event;
        if (phoneNum.value === '' || password.value === '' || repeat.value === '') {
            if (phoneNum.value === '') {
                warn[0].innerHTML = '不能为空';
                warn[0].style.visibility = 'visible';
                phoneFlag = false;
                border(phoneNum, phoneFlag);
            }
            if (password.value === '') {
                ranks[0].className = 'low';
                ranks[1].className = '';
                ranks[2].className = '';
                warn[1].innerHTML = '不能为空';
                warn[1].style.visibility = 'visible'
                passwordFlag = false;
                border(password, passwordFlag);
            }
            if (repeat === '') {
                warn[2].innerHTML = '不能为空';
                warn[2].style.visibility = 'visible';
                repeatFlag = false;
                border(repeat, repeatFlag);
            }

            event.preventDefault();
        }
        if (phoneFlag === true && passwordFlag === true && repeatFlag === true) {
                //发送注册数据
        } else {
            event.preventDefault();
        }

    }


}();
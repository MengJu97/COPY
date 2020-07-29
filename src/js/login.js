;!function () {
    console.log($('form input', 1))
    //改变焦点边框颜色
    for (let i = 0; i < $('form input', 1).length; i++) {
        $('form input', 1)[i].onfocus = () => {
            $('form input', 1)[i].parentNode.style.borderColor = '#ffa820';
        }
        $('form input', 1)[i].onblur = () => {
            $('form input', 1)[i].parentNode.style.borderColor = '#ddd';
        }
    }

    //删除按钮
    console.log($('.del', 1));
    for (let i = 0; i < $('.del', 1).length; i++) {
        $('.del', 1)[i].onclick = () => {
            $('.del', 1)[i].parentNode.children[1].value = '';
        }
    }

    let userInput = $('.username');
    let errorMsg = $('.error');
    console.log(userInput);
    let passwordInput = $('.password');
    // let errorShow = false;

    userInput.addEventListener('focus', () => {
    })
    userInput.addEventListener('click', () => {
        errorMsg.style.visibility = 'hidden';
    })

    passwordInput.addEventListener('focus', () => {
        errorMsg.style.visibility = 'hidden';
    })

    //手机号验证
    let btnSubmit = $('.submit');
    btnSubmit.onclick = (event) => {
        var event = event || window.event;
        let value = userInput.value;
        let pass = passwordInput.value;
        if (value !== '') {
            let phoneReg = /^1[3578]\d{9}$/;
            if (phoneReg.test(value)) {
                if (pass !== '') {
                    event.preventDefault();
                    $ajax({
                        type: 'POST',
                        url: 'http://localhost/PerfectWord/php/login.php',
                        data: 'phone=' + value + '&password=' + pass,

                    }).then((data) => {
                        console.log(data);
                        if (data === '') {
                            errorMsg.innerHTML = '用户名或密码错误';
                            errorMsg.style.visibility = 'visible';
                        } else {
                            cookie.set('name', value, 10);
                            location.href = 'home.html';
                            // console.log(obj.get('name'));
                        }
                    })
                } else {
                    errorMsg.innerHTML = '密码格式不正确';
                    errorMsg.style.visibility = 'visible';
                    event.preventDefault();
                }
            } else {
                errorMsg.innerHTML = '账号格式不正确';
                errorMsg.style.visibility = 'visible';
                console.log(userInput.parentNode);
                event.preventDefault();
            }
        } else {
            userInput.focus();
            errorMsg.innerHTML = '账号格式不正确';
            errorMsg.style.visibility = 'visible';
            event.preventDefault();
        }

    }
}();
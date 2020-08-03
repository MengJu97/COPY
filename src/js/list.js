;!function () {
    let result;
    //检查cookie
    console.log(document.cookie);
    if (cookie.get('name')) {
        let userInfo = $('.userInfo');
        console.log(userInfo);

        userInfo.innerHTML = `<a href="javascript:;">${cookie.get('name')}</a><span></span><a href="javascript:;" class="logout">退出</a>`;
        $('.logout').onclick = () => {
            cookie.remove('name');
            location.href = 'home.html';
        }
    }

    $('.rank a').onmouseover = () => {
        let status = $('.rank a').getAttribute('class');
        if (status === 'up') {
            $('.rank a').children[0].children[0].style.left = -212 + 'px';
        } else if (status === 'down') {
            $('.rank a').children[0].children[0].style.left = -206 + 'px';
        }
    }

    $('.rank a').onmouseleave = () => {
        let status = $('.rank a').getAttribute('class');
        if (status === 'up') {
            $('.rank a').children[0].children[0].style.left = -218 + 'px';
        } else if (status === 'down') {
            $('.rank a').children[0].children[0].style.left = -224 + 'px';
        }
    }

    $('.rank a').onclick = () => {
        let status = $('.rank a').getAttribute('class');
        if (status === 'up') {
            $('.rank a').className = 'down';
            let arr = bubble(result);
            renderByPrice(arr);
            $('.rank a').children[0].children[0].style.left = -206 + 'px';
        } else if (status === 'down') {
            $('.rank a').className = 'up';
            let arr = bubble(result);
            renderByPrice(arr);
            $('.rank a').children[0].children[0].style.left = -212 + 'px';
        }
    }

    $ajax({
        url: 'http://localhost/PerfectWord/php/list.php'
    }).then((data) => {
        result = JSON.parse(data);
        console.log(result);
        bubble(result);
        renderByPrice(result);

        //渲染完成后
        let arrSid;
        let arrNum;
        let arrPrice;
        // if (cookie.get('arrSid') != null) {//cookie中存在记录
        //     arrSid = cookie.get('arrSid').split(',');
        //     arrNum = cookie.get('arrNum').split(',');
        //     arrPrice = cookie.get('arrPrice').split(',');
        //     console.log(arrSid);
        //     console.log(arrNum);
        // } else {
        //     arrSid = [];
        //     arrNum = [];
        //     arrPrice = [];
        // }
        // let timer = null;

        $('.wrap').onclick = (event) => {
            var event = event || window.event;
            let target = event.target;
            // clearTimeout(timer);
            console.log(target);
            console.log(target.parentNode.className === 'btn');
            if (target.className === 'btn' || target.parentNode.className === 'btn') {
                let sid;
                let price;
                if (target.parentNode.className === 'btn') {
                    sid = target.parentNode.getAttribute('sid');
                    price = target.parentNode.getAttribute('price');
                } else if (target.className === 'btn') {
                    sid = target.getAttribute('sid');
                    price = target.getAttribute('price');
                }
                console.log(sid);
                console.log(price);
                if (cookie.get('arrSid') != null) {//cookie中存在记录
                    arrSid = cookie.get('arrSid').split(',');
                    arrNum = cookie.get('arrNum').split(',');
                    arrPrice = cookie.get('arrPrice').split(',');
                    console.log(arrSid);
                    console.log(arrNum);
                    console.log(arrPrice);
                    let idx = arrSid.indexOf(sid);
                    if (idx !== -1) {
                        arrNum[idx] = Number(arrNum[idx]) + 1;
                    } else {
                        arrSid.push(sid);
                        arrNum.push(1);
                        arrPrice.push(price);
                    }

                } else {
                    arrSid = [];
                    arrNum = [];
                    arrPrice = [];

                    arrSid.push(sid);
                    arrNum.push(1);
                    arrPrice.push(price)
                }
                cookie.set('arrSid', arrSid, 7);
                cookie.set('arrNum', arrNum, 7);
                cookie.set('arrPrice', arrPrice, 7);


                //添加成功提示
                $('.success').style.display = 'block';
                // timer = setTimeout(() => {
                //     $('.success').style.display = 'none';
                // }, 1500);
            }

        }


    })

    //购物车下拉菜单动画效果
    $('.car').onmouseover = () => {
        bufferMove($('.incar'), {height: 170});
        //购物车还没有商品，快去挑选商品吧！
    }
    $('.car').onmouseleave = () => {
        bufferMove($('.incar'), {height: 0});
    }

    $('.close span').onclick = () => {
        $('.success').style.display = 'none';
        bubble(result);

    }
    $('.shopping').onclick = () => {
        $('.success').style.display = 'none';
    }

    //按价格高低进行渲染
    function bubble(arr) {
        let status = $('.rank a').getAttribute('class');

        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (status === 'up') {
                    if (Number(arr[j].price) > Number(arr[j + 1].price)) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                } else {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }

            }
        }
        return arr;
    }


    function renderByPrice(result) {
        let str = '';
        for (let value of result) {
            str += `
            <div class="blocks">
            <a href="http://localhost/PerfectWord/src/detail.html?sid=${value.sid}">
                <img src="${value.url}" alt="">
            </a>
            <p>${value.title}</p>
            <span>¥${value.price}</span>
            <div class="hov">
                <div class="btn" sid="${value.sid}" price="${value.price}">
                    <span>加入购物车</span>
                </div>
            </div>

        </div>
            `
        }
        $('.wrap').innerHTML = str;
    }

}();
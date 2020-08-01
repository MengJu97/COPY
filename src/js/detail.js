;!function () {
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


    //购物车下拉菜单动画效果
    $('.car').onmouseover = () => {
        bufferMove($('.incar'), {height: 170});
        //购物车还没有商品，快去挑选商品吧！
    }
    $('.car').onmouseleave = () => {
        bufferMove($('.incar'), {height: 0});
    }

    //数量按钮绑定事件
    let btnMini = $('.mini');
    let btnPlus = $('.plus');
    let numInput = $('.case input');
    let num = Number(numInput.value);
    // console.log(num);//1
    btnMini.onclick = () => {
        if (num <= 1) {
            num = 1;
        } else {
            num--;
        }
        numInput.value = num;
    }

    btnPlus.onclick = () => {
        num++;
        numInput.value = num;
    }

    numInput.onblur = () => {

        let changingNum = numInput.value;
        //将想要输入的数字临时存下来
        //用正则判断数字是否合法
        let reg = /^[0-9]+$/g
        if (changingNum && reg.test(changingNum)) {//值不为空
            if (Number(changingNum) >= 99) {
                num = 99;
            } else if (Number(changingNum) <= 1) {
                num = 1;
            } else {
                num = Number(changingNum);
            }
        }
        // else {
        //     //非数字类型，不改变值
        //
        // }
        numInput.value = num;
    }

    //添加到购物车提示
    let btnCar = $('.btns .car');
    let btnBuy = $('.btns .buy');
    let success = $('.success');
    let cover = $('.cover');
    let shopping = $('.shopping');
    let jump = $('.jump');
    // console.log(document.cookie);
    // console.log(cookie.get('arrSid')==null);//true;

    let arrSid;
    let arrNum;
    let arrPrice;
    if (cookie.get('arrSid') != null) {//cookie中存在记录
        arrSid = cookie.get('arrSid').split(',');
        arrNum = cookie.get('arrNum').split(',');
        arrPrice = cookie.get('arrPrice').split(',');
        console.log(arrSid);
        console.log(arrNum);
    } else {
        arrSid = [];
        arrNum = [];
        arrPrice = [];
        // cookie.set('arrSid', arrSid, 7);
        // cookie.set('arrNum', arrNum, 7)
    }


    let sid = location.search.slice(1).split('=')[1];
    // console.log(sid);//字符串1


    $ajax({
        url: 'http://localhost/PerfectWord/php/search.php',
        data: 'sid=' + sid
    }).then((data) => {
        let result = JSON.parse(data)[0];
        console.log(result);
        let imgArr = result.pics.split(',');
        console.log(imgArr);
        let str = '';
        let sm = '';
        let index = 0;
        for (let value of imgArr) {
            str += `<li index="${index}"><div class="smallGlass"></div><img src="${value}" alt=""></li>`;
            sm += `<div class="xm" index="${index}">
                <img src="${value}"  index="${index}">
            </div>`;
            index++;
        }
        $('.swip').innerHTML = str;
        $('.smallPic').innerHTML = sm;
        $('.mage').innerHTML = `<img src="${imgArr[0]}" alt="">`;
        $('.title').innerHTML = result.title;
        $('.price').innerHTML = '¥' + result.price;
        //放大镜效果
        //点击(跟换)移动图片位置
        //事件委托
        let oUl = $('.swip');
        let oLi = $('.swip li', 1);
        let now = 0;
        let oSmall = $('.smallPic');
        let smallPic = $('.smallPic img', 1);
        let mage = $('.mage');
        let magePic = $('.mage img');

        function changeOpacity(obj, index) {
            obj.forEach((item) => {
                item.style.opacity = '50%';
            });
            obj[index].style.opacity = '1';
        }

        changeOpacity(smallPic, now);

        console.log(oLi);
        console.log(oLi[0].offsetLeft);
        console.log(smallPic);

        oSmall.onclick = (event) => {

            var event = event || window.event;
            var target = event.target;
            // target.style.opacity = '1';

            console.log(target.getAttribute('index'));//img
            // console.log(target.offsetWidth);//100
            now = target.getAttribute('index');
            changeOpacity(smallPic, now);
            bufferMove(oUl, {left: -now * 430 + 5});
            // oUl.style.left = -now * 430 + 5 + 'px';
            magePic.setAttribute('src', smallPic[now].src);
            console.log(smallPic[now].src);
            new Mage(now).init();
        }

        new Mage(0).init();

        //添加到cookie
        btnCar.onclick = () => {//添加到购物车

            success.style.display = 'block';
            cover.style.display = 'block';
            cover.style.height = document.documentElement.offsetHeight + 'px';
            let idx = arrSid.indexOf(sid);
            console.log(idx);
            if (idx !== -1) {
                arrNum[idx] = Number(arrNum[idx]) + Number(num);
            } else {
                arrSid.push(sid);
                arrNum.push(num);
                arrPrice.push(result.price);
            }
            cookie.set('arrSid', arrSid, 7);
            cookie.set('arrNum', arrNum, 7);
            cookie.set('arrPrice', arrPrice, 7);
        }

        btnBuy.onclick = () => {//立即购买
            let idx = arrSid.indexOf(sid);
            console.log(idx);
            if (idx !== -1) {
                arrNum[idx] = Number(arrNum[idx]) + Number(num);
            } else {
                arrSid.push(sid);
                arrNum.push(num);
                arrPrice.push(result.price);
            }
            cookie.set('arrSid', arrSid, 7);
            cookie.set('arrNum', arrNum, 7);
            cookie.set('arrPrice', arrPrice, 7);
        }


        let btnClose = $('.close span');
        btnClose.onclick = () => {
            success.style.display = 'none';
            cover.style.display = 'none';
        }


        shopping.onclick = () => {
            btnClose.onclick();
        }


    })


    //放大镜
    class Mage {
        constructor(index) {
            this.outbox = $('.wrap');
            this.small = $('.swip li', 1)[index];
            this.smallGlass = $('.smallGlass', 1)[index];
            this.big = $('.mage img');
            this.bigGlass = $('.mage');
        }

        init() {
            this.small.onmouseover = (event) => {
                this.smallGlass.style.display = 'block';
                this.bigGlass.style.display = 'block';
                // this.smallGlass.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                var event = event || window.event;
                // console.log(event.offsetX);
                let offsetTop = this.outbox.offsetTop;
                let offsetLeft = this.outbox.offsetLeft;
                let ratio = this.big.offsetWidth / this.bigGlass.offsetWidth;
                console.log(ratio);//2
                console.log(offsetLeft, offsetTop)//0,0
                document.documentElement.onmousemove = (event) => {
                    // console.log(1);
                    var event = event || window.event;
                    let toTop = event.pageY - offsetTop - this.smallGlass.offsetHeight / 2;
                    let toLeft = event.pageX - offsetLeft - 5 - this.smallGlass.offsetWidth / 2;
                    if (toTop <= 0) {
                        toTop = 0;
                    } else if (toTop >= this.small.offsetHeight - this.smallGlass.offsetHeight) {
                        toTop = this.small.offsetHeight - this.smallGlass.offsetHeight
                    }
                    if (toLeft <= 0) {
                        toLeft = 0;
                    } else if (toLeft >= this.small.offsetWidth - this.smallGlass.offsetWidth) {
                        toLeft = this.small.offsetWidth - this.smallGlass.offsetWidth
                    }

                    this.smallGlass.style.top = toTop + 'px';
                    this.smallGlass.style.left = toLeft + 'px';

                    this.big.style.top = -ratio * toTop + 'px';
                    this.big.style.left = -ratio * toLeft + 'px';
                }
            }
            this.small.onmouseleave = () => {
                this.smallGlass.style.display = 'none';
                this.bigGlass.style.display = 'none';
                document.documentElement.onmousemove = null;
            }
        }
    }


}();
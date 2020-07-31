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

    $ajax({
        url: 'http://localhost/PerfectWord/php/list.php'
    }).then((data) => {
        let result = JSON.parse(data);
        console.log(result);
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
            <div class="btn">
                <span>加入购物车</span>
            </div>
        </div>
        
    </div>
        `
        }
        $('.wrap').innerHTML = str;

    })

    //购物车下拉菜单动画效果
    $('.car').onmouseover = () => {
        bufferMove($('.incar'), {height: 170});
        //购物车还没有商品，快去挑选商品吧！
    }
    $('.car').onmouseleave = () => {
        bufferMove($('.incar'), {height: 0});
    }

}();
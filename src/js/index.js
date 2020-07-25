;!function () {
//获取接口数据
    const oUl = $('.box ul');
    console.log(oUl);

    const oOl = $('.banner ol');
    console.log(oOl);

    let imgLogo = $('.logo img');
    console.log(imgLogo);

    let adList = $('.adList');

    //下拉菜单
    let allItems = $('.topBar .items');
    let downPad = $('.pad');
    console.log(downPad);
    allItems.onmouseover = () => {
        downPad.style.display = 'block';
    }
    allItems.onmouseleave = () => {
        downPad.style.display = 'none';
    }


    $ajax({
        url: 'http://localhost/PerfectWord/php/index1.php'
    }).then(function (data) {
        let result = JSON.parse(data);
        console.log(result);
        //logo
        imgLogo.setAttribute('src', result.logo[0].url);

        //轮播图url
        let banner = result.banner.slice(0, 3);
        console.log(banner);
        let str = '';
        for (let value of banner) {
            str += `<li><img src="${value.url}" alt=""></li>`
        }
        oUl.innerHTML = str;
        let dot = '';
        for (let i = 1; i <= banner.length; i++) {
            dot += `<li index="${i}"></li>`;
        }
        oOl.innerHTML = dot;
        oImgList = $('.box li', 1);
        oActive = $('ol li', 1);
        //圆点事件委托
        oOl.onclick = (event) => {
            clearInterval(timer)
            var event = event || window.event;
            let target = event.target;
            // console.log(target.getAttribute('index'));
            moveTimes = parseInt(target.getAttribute('index'));
            console.log(moveTimes);
            ////////////////////////////
        }
        console.log(oImgList);
        console.log(oActive);
        for (let i = 0; i < oImgList.length; i++) {
            oImgList[i].setAttribute('index', i);
        }
        btnLess.onclick = () => {
            clearInterval(timer)
            // let pos = parseInt(getAttribute(oUl, 'left'));
            // console.log(pos);
            let less;
            if (moveTimes === 0) {
                less = -2 * 1916;
                moveTimes = 2;
            } else {
                moveTimes--;
                less = -1916 * moveTimes;
            }
            bufferMove(oUl, {left: less});
            changeActive(moveTimes);
        }

        btnGreat.onclick = () => {
            // clearInterval(timer);
            // // let pos = parseInt(getAttribute(oUl, 'left'));
            // // console.log(pos);
            let more;
            if (moveTimes === 2) {
                more = 0;
                moveTimes = 0;
            } else {
                moveTimes++;
                more = -1916 * moveTimes;

            }
            bufferMove(oUl, {left: more});
            changeActive(moveTimes);
        }

        function changeActive(idx = 0) {
            //清除样式
            for (let i = 0; i < oActive.length; i++) {
                oActive[i].className = '';
                oActive[idx].className = 'active';
            }
        }

        changeActive();
        let timer = setInterval(() => {
            btnGreat.onclick();
        }, 3000)

        //三块广告渲染
        let threeAd = result.banner.slice(3);
        console.log(threeAd);
        let adStr = '';
        for (let value of threeAd) {
            adStr += `<img src="${value.url}" alt="dota2">`
        }
        adList.innerHTML = adStr;
        let tower = $('.tower img');
        tower.setAttribute('src', result.dota[0].url);
        //商品详情渲染
        let row1 = $('.row1');
        let reWrite = `
        <div class="hot">
            <a href="javascript:;">
                <img src="${result.dota[1].url}" alt="完美世界-完美商城-完美娱乐-世界同享">
            </a>
        </div>
                        `;
        for (let value of result.home) {
            reWrite += `
            <div class="blocks">
                        <a href="">
                            <img src="${value.url}" alt="">
                        </a>
                        <p>${value.title}</p>
                        <span>¥${value.price}</span>
                    </div>`
        }
        $('.row1').innerHTML = reWrite;
        $('.leftPart').innerHTML = `<img src="${result.dota[2].url}" alt="">`
    })

    const btnLess = $('.less');
    console.log(btnLess);
    const btnGreat = $('.great');
    //轮播图list
    let oImgList = null;
    let moveTimes = 0;
    let oActive = null;
}();


;!function () {

    let allCheck = $('.innerbox');
    let check = $('.checkbox');
    let checkFlag;
    allCheck.onclick = () => {
        if (checkFlag) {
            check.style.backgroundColor = 'white';
            check.style.borderColor = '#d4d4d4';
            allCheck.style.background = '';
            checkFlag = false;

        } else {
            check.style.backgroundColor = '#e32332';
            check.style.borderColor = '#e32332';
            allCheck.style.background = 'url("image/icons.png") -78px -100px no-repeat';
            checkFlag = true;
        }

    }


    //从cookie中渲染

    $ajax({
        url: 'http://localhost/PerfectWord/php/list.php'
    }).then((data) => {
        let result = JSON.parse(data);
        console.log(result);

        if (cookie.get('arrSid') !== null) {
            let str = '';
            let arrSid = cookie.get('arrSid').split(',');
            let arrNum = cookie.get('arrNum').split(',');
            let arrPrice = cookie.get('arrPrice').split(',');

            for (let i = 0; i < arrSid.length; i++) {
                str += `<tr class="item" index="${i}">
            <td class="state">
                    <span class="checkbox">
                        <span class="innerbox">

                        </span>
                    </span>
            </td>
            <td class="name">
                <a href="" class="pic"><img src="${result[Number(arrSid[i]) - 1].url}" alt=""></a>
                <a href="" class="title">${result[Number(arrSid[i]) - 1].title}</a>
            </td>
            <td class="discount"></td>
            <td class="num">
                <div class="number">
                    <div class="case">
                        <div class="click mini">
                        </div>
                        <input type="text" value="${arrNum[i]}">
                        <div class="click plus">
                        </div>
                    </div>
                </div>
            </td>
            <td class="prices">
                <p>¥<span>${(Number(arrPrice[i]) * Number(arrNum[i])).toFixed(2)}</span></p>
            </td>
            <td class="operation">
                <a href="javascript:;" class="del">
                    <span ></span>
                </a>
            </td>
        </tr>`
            }
            $('table').innerHTML += str;


        } else {

        }

        $('tbody').onclick = (event) => {
            var event = event || window.event;
            var target = event.target
            console.log(target);
            console.log(target.parentNode.parentNode.parentNode);
            let changeNum;
            if (target.className === 'innerbox') {

            }
            if (target.className === 'del' || target.parentNode.className === 'del') {
                let index;
                // alert(1);
                if (target.className === 'del') {
                    $('tbody').removeChild(target.parentNode.parentNode);
                    index = target.parentNode.parentNode.getAttribute('index');
                } else {
                    $('tbody').removeChild(target.parentNode.parentNode.parentNode);
                    index = target.parentNode.parentNode.parentNode.getAttribute('index');
                }
                console.log(index);
                index = Number(index);
                let arrSid = cookie.get('arrSid').split(',');
                let arrNum = cookie.get('arrNum').split(',');
                let arrPrice = cookie.get('arrPrice').split(',');

                arrSid.splice(index, 1);
                arrNum.splice(index, 1);
                arrPrice.splice(index, 1);
                // console.log(arrSid);
                cookie.set('arrSid', arrSid, 7);
                cookie.set('arrNum', arrNum, 7);
                cookie.set('arrPrice', arrPrice, 7);
            }

        }
    });

}();
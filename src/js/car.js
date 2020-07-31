;!function () {

    let success = $('.success');
    let cover = $('.cover');
    let shopping = $('.shopping');
    // let checkFlag;
    let checkoutNumber = $('.checkoutnumber');
    let checkoutPrice = $('.checkoutprice');
    let allBeSelected;


    //从cookie中渲染

    $ajax({
        url: 'http://localhost/PerfectWord/php/list.php'
    }).then((data) => {
        let result = JSON.parse(data);
        console.log(result);
        console.log(result[0].url);
        // console.log(cookie.get('arrSid').length);//0
        if (cookie.get('arrSid')) {
            if (cookie.get('arrSid').length > 0) {
                $('thead').style.display = 'flex';
                $('.footer').style.display = 'flex';
                $('.carnull').style.display = 'none';

                let str = '';
                let arrSid = cookie.get('arrSid').split(',');
                let arrNum = cookie.get('arrNum').split(',');
                let arrPrice = cookie.get('arrPrice').split(',');

                for (let i = 0; i < arrSid.length; i++) {
                    str += `<tr class="item" index="${i}" sid="${arrSid[i]}">
            <td class="state">
                    <span class="checkbox" index="${i}" sid="${arrSid[i]}">
                        <span class="innerbox" index="${i}" sid="${arrSid[i]}">

                        </span>
                    </span>
            </td>
            <td class="name">
                <a href="detail.html?sid=${arrSid[i]}" class="pic"><img src="${result[Number(arrSid[i]) - 1].url}" alt=""></a>
                <a href="detail.html?sid=${arrSid[i]}" class="title">${result[Number(arrSid[i]) - 1].title}</a>
            </td>
            <td class="discount"></td>
            <td class="num">
                <div class="number">
                    <div class="case">
                        <div class="click mini" index="${i}" sid="${arrSid[i]}">
                        </div>
                        <input type="text" value="${arrNum[i]}" sid="${arrSid[i]}" index="${i}">
                        <div class="click plus" index="${i}" sid="${arrSid[i]}">
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

                //--------------全选--------------
                let innerbox = $('.innerbox', 1);
                let checkbox = $('.checkbox', 1);

                function allSelect() {
                    for (let obj of innerbox) {
                        obj.style.background = 'url("image/icons.png") -78px -100px no-repeat';
                        obj.parentNode.style.backgroundColor = '#e32332';
                        obj.parentNode.style.borderColor = '#e32332';
                        allBeSelected = true;
                        obj.setAttribute('checked', true);
                    }

                }

                function nullSelect() {
                    for (let obj of innerbox) {
                        obj.style.background = 'white';
                        obj.parentNode.style.backgroundColor = 'white';
                        obj.parentNode.style.borderColor = '#d4d4d4';
                        obj.setAttribute('checked', false);
                    }
                    allBeSelected = false;

                }

                allSelect();
                console.log(innerbox);
                console.log(checkbox);
                let wrap = $('.wrap');
                wrap.onclick = (event) => {
                    var event = event || window.event;
                    let target = event.target;
                    console.log(target);
                    if (target.className === 'innerbox all') {
                        //全选框
                        if (allBeSelected !== true) {
                            allSelect();

                            //单个选相框选择状态改变，商品总数量，商品总价发生改变
                            //复制arrNum arrPrice 作为零时数组
                            let limitArrSid = cookie.get('arrSid').split(',');
                            let limitArrNum = cookie.get('arrNum').split(',');
                            let limitArrPrice = cookie.get('arrPrice').split(',');

                            console.log(limitArrPrice);
                            limitArrNum = limitArrNum.map((value, index, array) => {
                                return Number(value);
                            })
                            console.log(limitArrNum);
                            refresh(limitArrNum, limitArrPrice, true);

                        } else {
                            nullSelect();
                            //单个选相框选择状态改变，商品总数量，商品总价发生改变
                            //复制arrNum arrPrice 作为零时数组
                            let limitArrSid = cookie.get('arrSid').split(',');
                            let limitArrNum = cookie.get('arrNum').split(',');
                            let limitArrPrice = cookie.get('arrPrice').split(',');

                            console.log(limitArrPrice);
                            limitArrNum = limitArrNum.map((value, index, array) => {
                                return -Number(value);
                            })
                            console.log(limitArrNum);
                            refresh(limitArrNum, limitArrPrice, true);
                        }
                    }
                    if (target.className === 'innerbox') {
                        //单个选择
                        // alert(target.getAttribute('index'));
                        if (target.getAttribute('checked') === "true") {
                            target.setAttribute('checked', false);
                            target.style.background = 'white';
                            target.parentNode.style.backgroundColor = 'white';
                            target.parentNode.style.borderColor = '#d4d4d4';
                            let all = $('.all', 1);
                            console.log(all);
                            for (let obj of all) {
                                obj.style.background = 'white';
                                obj.parentNode.style.backgroundColor = 'white';
                                obj.parentNode.style.borderColor = '#d4d4d4';
                                obj.setAttribute('checked', false);
                            }
                            allBeSelected = false;


                            //单个选相框选择状态改变，商品总数量，商品总价发生改变
                            //复制arrNum arrPrice 作为零时数组
                            let limitArrSid = cookie.get('arrSid').split(',');
                            let limitArrNum = cookie.get('arrNum').split(',');
                            let limitArrPrice = cookie.get('arrPrice').split(',');
                            let idx = Number(target.getAttribute('index'));
                            console.log(idx);

                            limitArrNum = [-Number(limitArrNum.splice(idx, 1)[0])];
                            limitArrPrice = [Number(limitArrPrice.splice(idx, 1)[0])];
                            console.log(limitArrNum);
                            console.log(limitArrPrice);
                            refresh(limitArrNum, limitArrPrice, true);
                        } else {
                            target.setAttribute('checked', true);
                            target.style.background = 'url("image/icons.png") -78px -100px no-repeat';
                            target.parentNode.style.backgroundColor = '#e32332';
                            target.parentNode.style.borderColor = '#e32332';


                            //单个选相框选择状态改变，商品总数量，商品总价发生改变
                            //复制arrNum arrPrice 作为零时数组
                            let limitArrSid = cookie.get('arrSid').split(',');
                            let limitArrNum = cookie.get('arrNum').split(',');
                            let limitArrPrice = cookie.get('arrPrice').split(',');

                            let idx = Number(target.getAttribute('index'));
                            console.log(idx);

                            limitArrNum = [Number(limitArrNum.splice(idx, 1)[0])];
                            limitArrPrice = [Number(limitArrPrice.splice(idx, 1)[0])];
                            console.log(limitArrNum);
                            console.log(limitArrPrice);
                            refresh(limitArrNum, limitArrPrice, true);


                            //检查单个选框的选中状态
                            let checkedNum = 0;
                            for (let obj of innerbox) {
                                if (obj.getAttribute('checked') === "true") {
                                    checkedNum++;
                                }
                            }
                            console.log(checkedNum);
                            if (checkedNum >= innerbox.length - 2 && allBeSelected === false) {
                                allBeSelected = true;
                                let all = $('.all', 1);
                                for (let obj of all) {
                                    obj.style.background = 'url("image/icons.png") -78px -100px no-repeat';
                                    obj.parentNode.style.backgroundColor = '#e32332';
                                    obj.parentNode.style.borderColor = '#e32332';
                                    obj.setAttribute('checked', true);
                                }
                            }
                        }

                    }
                }


                //
                let tbody = $('tbody');
                console.log(tbody);
                tbody.onclick = (event) => {//事件委托
                    var event = event || window.event;
                    var target = event.target;
                    console.log(target);
                    console.log(target.parentNode.parentNode.parentNode);
                    let changNum;
                    let arrSid;
                    let arrNum;
                    let arrPrice;

                    if (target.className === 'del' || target.parentNode.className === 'del') {


                        success.style.display = 'block';
                        cover.style.display = 'block';
                        cover.style.height = $('.wrap').offsetHeight + 'px';
                        shopping.onclick = () => {
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

                            //判断如果数组长度为0的时候删除数组
                            if (arrSid.length === 0) {
                                cookie.remove('arrSid');
                                cookie.remove('arrNum');
                                cookie.remove('arrPrice');
                                $('thead').style.display = 'none';
                                $('.footer').style.display = 'none';
                                $('.carnull').style.display = 'flex';
                            } else {
                                cookie.set('arrSid', arrSid, 7);
                                cookie.set('arrNum', arrNum, 7);
                                cookie.set('arrPrice', arrPrice, 7);
                                refresh(arrNum, arrPrice);
                            }

                            //完成删除操作隐藏提示
                            success.style.display = 'none';
                            cover.style.display = 'none';
                        };

                        let btnClose = $('.close span');
                        btnClose.onclick = () => {
                            success.style.display = 'none';
                            cover.style.display = 'none';
                        }


                        $('.jump').onclick = () => {
                            btnClose.onclick();
                        }
                    }

                    //商品数量加减
                    // moreOrLess(target, tbody);

                    if (target.getAttribute('type') === 'text') {
                        arrSid = cookie.get('arrSid').split(',');
                        arrNum = cookie.get('arrNum').split(',');
                        arrPrice = cookie.get('arrPrice').split(',');
                        changNum = Number(arrNum[Number(target.getAttribute('index'))]);

                        target.onfocus = () => {

                        }
                        target.onblur = () => {
                            //正则判断数字
                            let reg = /^[0-9]+$/g
                            if (target.value && reg.test(Number(target.value))) {//值不为空
                                if (Number(target.value) >= 99) {
                                    target.value = 99;
                                } else if (Number(target.value) <= 0) {
                                    target.value = 1;
                                }
                            } else {
                                target.value = 1;
                            }

                            changNum = Number(target.value);
                            console.log(changNum);

                            let idx = Number(target.getAttribute('index'));
                            console.log(innerbox[idx + 1]);
                            console.log(innerbox[idx + 1].getAttribute('checked'));
                            let state = innerbox[idx + 1].getAttribute('checked');
                            if (state === 'true') {
                                arrNum[Number(target.getAttribute('index'))] = changNum;

                                cookie.set('arrSid', arrSid, 7);
                                cookie.set('arrNum', arrNum, 7);
                                cookie.set('arrPrice', arrPrice, 7);

                                //执行价格实时更新方法
                                // console.log(tbody);
                                let index = Number(target.getAttribute('index'));
                                let sid = Number(target.getAttribute('sid'));
                                let pri = Number(arrPrice[index]);
                                console.log(pri);
                                console.log(index);
                                console.log(sid);
                                console.log(tbody.childNodes);
                                realTimePrice(tbody.childNodes[index], changNum, pri);
                                refresh(arrNum, arrPrice);
                            }
                            // arrNum[Number(target.getAttribute('index'))] = changNum;
                            //
                            // cookie.set('arrSid', arrSid, 7);
                            // cookie.set('arrNum', arrNum, 7);
                            // cookie.set('arrPrice', arrPrice, 7);
                            //
                            // //执行价格实时更新方法
                            // // console.log(tbody);
                            // let index = Number(target.getAttribute('index'));
                            // let sid = Number(target.getAttribute('sid'));
                            // let pri = Number(arrPrice[index]);
                            // console.log(pri);
                            // console.log(index);
                            // console.log(sid);
                            // console.log(tbody.childNodes);
                            // realTimePrice(tbody.childNodes[index], changNum, pri);
                            // refresh(arrNum, arrPrice);
                        }
                    }
                    if (target.className === 'click mini') {
                        arrSid = cookie.get('arrSid').split(',');
                        arrNum = cookie.get('arrNum').split(',');
                        arrPrice = cookie.get('arrPrice').split(',');
                        changNum = Number(arrNum[Number(target.getAttribute('index'))]);
                        console.log(changNum);
                        changNum--;
                        console.log(changNum);
                        if (changNum <= 1) {
                            changNum = 1;
                        }
                        console.log(target.parentNode.children[1]);
                        let input = target.parentNode.children[1];
                        input.value = changNum;
                        arrNum[Number(target.getAttribute('index'))] = changNum;

                        cookie.set('arrSid', arrSid, 7);
                        cookie.set('arrNum', arrNum, 7);
                        cookie.set('arrPrice', arrPrice, 7);
                        let index = Number(target.getAttribute('index'));
                        let sid = Number(target.getAttribute('sid'));
                        let pri = Number(arrPrice[index]);
                        console.log(pri);
                        console.log(index);
                        console.log(sid);
                        console.log(tbody.childNodes);
                        realTimePrice(tbody.childNodes[index], changNum, pri);
                        refresh(arrNum, arrPrice);

                    } else if (target.className === 'click plus') {
                        arrSid = cookie.get('arrSid').split(',');
                        arrNum = cookie.get('arrNum').split(',');
                        arrPrice = cookie.get('arrPrice').split(',');
                        changNum = Number(arrNum[Number(target.getAttribute('index'))]);
                        console.log(changNum);
                        changNum++;
                        console.log(changNum);
                        if (changNum >= 99) {
                            changNum = 99;
                        }
                        // console.log(target.parentNode.children[1]);
                        let input = target.parentNode.children[1];
                        input.value = changNum;
                        arrNum[Number(target.getAttribute('index'))] = changNum;

                        cookie.set('arrSid', arrSid, 7);
                        cookie.set('arrNum', arrNum, 7);
                        cookie.set('arrPrice', arrPrice, 7);
                        let index = Number(target.getAttribute('index'));
                        let sid = Number(target.getAttribute('sid'));
                        let pri = Number(arrPrice[index]);
                        console.log(pri);
                        console.log(index);
                        console.log(sid);
                        console.log(tbody.childNodes);
                        realTimePrice(tbody.childNodes[index], changNum, pri);
                        refresh(arrNum, arrPrice);
                    }


                }
                //计算总价和件数
                refresh(arrNum, arrPrice);
            }
        } else {
            console.log(1);
            //头部+底部结算条隐藏
            $('thead').style.display = 'none';
            $('.footer').style.display = 'none';
            $('.carnull').style.display = 'flex';
        }


    });

    //价格实时更新方法
    function realTimePrice(node, num, pri) {
        let priceNode = node.children[4];
        let price = priceNode.children[0].children[0];
        console.log(priceNode);
        console.log(price);
        price.innerHTML = Number(num * pri).toFixed(2);
    }

    function refresh(arrNum, arrPrice, fake) {
        // let arrNum = cookie.get('arrNum').split(',');
        // let arrPrice = cookie.get('arrPrice').split(',');
        let sum = 0;
        let price = 0;
        if (fake) {
            sum = Number(checkoutNumber.innerHTML);
            price = Number(checkoutPrice.innerHTML);
            // alert(1);
        }
        for (let value in arrNum) {
            console.log(Number(arrNum[value]));
            sum += Number(arrNum[value]);
            price += Number(arrNum[value]) * Number(arrPrice[value]);
        }


        checkoutNumber.innerHTML = sum;
        checkoutPrice.innerHTML = price.toFixed(2);
    }

}();
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

    let success = $('.success');
    let cover = $('.cover');
    let shopping = $('.shopping');

    let checkoutNumber = $('.checkoutnumber');
    let checkoutPrice = $('.checkoutprice');
    let allBeSelected;
    let deleteIdx;
    let removeTarget;

    let limitArrSid;
    let limitArrNum;
    let limitArrPrice;


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
                //-----------------------------------------------
                limitArrSid = cookie.get('arrSid').split(',');
                limitArrNum = cookie.get('arrNum').split(',');
                limitArrPrice = cookie.get('arrPrice').split(',');


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
                <a href="javascript:;" class="del" sid="${arrSid[i]}">
                    <span sid="${arrSid[i]}"></span>
                </a>
            </td>
        </tr>`
                }

                $('table').innerHTML += str;

                //--------------全选--------------
                let innerbox = $('.innerbox', 1);
                let checkbox = $('.checkbox', 1);

                // function allSelect() {
                //     for (let obj of innerbox) {
                //         obj.style.background = 'url("image/icons.png") -78px -100px no-repeat';
                //         obj.parentNode.style.backgroundColor = '#e32332';
                //         obj.parentNode.style.borderColor = '#e32332';
                //         allBeSelected = true;
                //         obj.setAttribute('checked', true);
                //     }
                //
                // }
                //
                // function nullSelect() {
                //     for (let obj of innerbox) {
                //         obj.style.background = 'white';
                //         obj.parentNode.style.backgroundColor = 'white';
                //         obj.parentNode.style.borderColor = '#d4d4d4';
                //         obj.setAttribute('checked', false);
                //     }
                //     allBeSelected = false;
                //
                // }

                allSelect();

                let wrap = $('.wrap');
                wrap.onclick = (event) => {
                    var event = event || window.event;
                    let target = event.target;
                    // console.log(target);
                    if (target.className === 'innerbox all') {
                        //全选框
                        if (allBeSelected !== true) {
                            allSelect();
                            arrNum = cookie.get('arrNum').split(',');
                            // console.log(arrNum);
                            //单个选相框选择状态改变，商品总数量，商品总价发生改变
                            //复制arrNum arrPrice 作为零时数组

                            if (limitArrNum.every(value => {
                                return Number(value) === 0;
                            })) {
                                limitArrNum = arrNum.map(value => {
                                    return Number(value);
                                })
                            } else {
                                limitArrNum = limitArrNum.map((value, index) => {
                                    if (value === 0) {
                                        return arrNum[index];
                                    } else {
                                        return value;
                                    }
                                })

                                arrNum = limitArrNum.map(value => {
                                    return value;
                                })
                                cookie.set('arrNum', arrNum, 7);
                            }

                            console.log('点击全选按钮的零时数组：' + limitArrNum);
                            console.log('点击全选按钮后的arrNum：' + arrNum);
                            arrPrice = cookie.get('arrPrice').split(',');
                            refresh(limitArrNum, arrPrice);

                        } else {
                            nullSelect();
                            //单个选相框选择状态改变，商品总数量，商品总价发生改变
                            //复制arrNum作为零时数组
                            arrNum = cookie.get('arrNum').split(',');
                            limitArrNum = limitArrNum.map(value => 0);
                            console.log('全不选的临时数组' + limitArrNum);
                            console.log('全部选的arrNum' + arrNum);
                            arrPrice = cookie.get('arrPrice').split(',');
                            refresh(limitArrNum, arrPrice);
                        }
                    }
                    if (target.className === 'innerbox') {
                        //单个选择
                        if (target.getAttribute('checked') === "true") {
                            target.setAttribute('checked', false);
                            target.style.background = 'white';
                            target.parentNode.style.backgroundColor = 'white';
                            target.parentNode.style.borderColor = '#d4d4d4';
                            let all = $('.all', 1);
                            // console.log(all);
                            for (let obj of all) {
                                obj.style.background = 'white';
                                obj.parentNode.style.backgroundColor = 'white';
                                obj.parentNode.style.borderColor = '#d4d4d4';
                                obj.setAttribute('checked', false);
                            }
                            allBeSelected = false;


                            //单个选相框选择状态改变，商品总数量，商品总价发生改变
                            //复制arrNum arrPrice 作为零时数组
                            limitArrSid = limitArrSid || cookie.get('arrSid').split(',');
                            limitArrNum = limitArrNum || cookie.get('arrNum').split(',');
                            limitArrPrice = limitArrPrice || cookie.get('arrPrice').split(',');


                            let idx = limitArrSid.indexOf(target.getAttribute('sid'));
                            //取消勾选的选相框用0占位代替

                            limitArrNum[idx] = 0;
                            console.log('取消单个商品前的勾选框时的零时数组：' + limitArrNum);
                            arrPrice = cookie.get('arrPrice').split(',');
                            innerbox = $('.innerbox', 1);

                            let calcArr = limitArrNum.map((value, index) => {
                                if (index != idx) {
                                    if (value != arrNum[index]) {
                                        return 0;
                                    } else {
                                        if (innerbox[index + 1].getAttribute('checked') === 'true') {
                                            return value;
                                        } else {
                                            return 0;
                                        }
                                    }
                                } else {
                                    return value;
                                }
                            })
                            console.log(calcArr);
                            refresh(calcArr, arrPrice);
                        } else {
                            target.setAttribute('checked', true);
                            target.style.background = 'url("image/icons.png") -78px -100px no-repeat';
                            target.parentNode.style.backgroundColor = '#e32332';
                            target.parentNode.style.borderColor = '#e32332';


                            arrNum = cookie.get('arrNum').split(',');
                            arrSid = cookie.get('arrSid').split(',');
                            let sid = target.getAttribute('sid');
                            let idx = arrSid.indexOf(sid);
                            console.log(idx);
                            console.log('零时数组：' + limitArrNum);
                            //单选框重新选上的时候，改变零时数组或者arrNum

                            if (limitArrNum[idx] == 0) {
                                //说明数量没有进行改变
                                limitArrNum[idx] = arrNum[idx];
                            } else {
                                //说明在取消勾选的时候数量发生了改变
                                arrNum[idx] = limitArrNum[idx];
                                cookie.set('arrNum', arrNum, 7);
                            }

                            arrNum = cookie.get('arrNum').split(',');
                            arrPrice = cookie.get('arrPrice').split(',');
                            console.log('重新勾选后的arrNum' + arrNum);
                            console.log('重新勾选后的临时数组：' + limitArrNum);

                            let calcArr = limitArrNum.map((value, index) => {
                                if (index != idx) {
                                    if (value != arrNum[index]) {
                                        return 0;
                                    } else {
                                        if (innerbox[index + 1].getAttribute('checked') === 'true') {
                                            return value;
                                        } else {
                                            return 0;
                                        }
                                    }
                                } else {
                                    return value;
                                }
                            })
                            console.log('calc' + calcArr);
                            refresh(calcArr, arrPrice);


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


                let tbody = $('tbody');
                // console.log(tbody);
                tbody.onclick = (event) => {//事件委托
                    var event = event || window.event;
                    var target = event.target;

                    let changNum;


                    if (target.className === 'del' || target.parentNode.className === 'del') {

                        arrSid = cookie.get('arrSid').split(',');
                        arrNum = cookie.get('arrNum').split(',');

                        success.style.display = 'block';
                        cover.style.display = 'block';
                        cover.style.height = $('.wrap').offsetHeight + 'px';
                        deleteIdx = arrSid.indexOf(target.getAttribute('sid'));

                        if (target.className === 'del') {
                            removeTarget = target.parentNode.parentNode;

                        } else {
                            removeTarget = target.parentNode.parentNode.parentNode;
                        }

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

                    if (target.getAttribute('type') === 'text') {
                        // arrSid = cookie.get('arrSid').split(',');
                        arrNum = cookie.get('arrNum').split(',');

                        let idx = arrSid.indexOf(target.getAttribute('sid'));

                        changNum = Number(arrNum[idx]);

                        target.onfocus = () => {

                        }
                        target.onblur = () => {
                            //正则判断数字
                            let reg = /^[0-9]+$/g
                            if (target.value && reg.test(Number(target.value))) {//值不为空
                                if (Number(target.value) >= 99) {
                                    target.value = 99;
                                    changNum = Number(target.value);
                                } else if (Number(target.value) <= 0) {
                                    target.value = 1;
                                    changNum = Number(target.value);
                                } else {
                                    changNum = Number(target.value);
                                }
                            } else {
                                target.value = changNum;
                            }

                            console.log(changNum);
                            //--------------------------
                            limitArrNum[idx] = changNum;
                            limitArrPrice[idx] = arrPrice[idx];
                            realTimePrice(tbody.children[idx], limitArrNum[idx], limitArrPrice[idx]);
                            //--------------------------
                            // console.log(innerbox[idx + 1]);
                            // console.log(innerbox[idx + 1].getAttribute('checked'));
                            let state = innerbox[idx + 1].getAttribute('checked');
                            if (state === 'true') {
                                //商品列表前是勾选状态
                                arrNum[idx] = limitArrNum[idx];
                                // cookie.set('arrSid', arrSid, 7);
                                cookie.set('arrNum', arrNum, 7);
                                // cookie.set('arrPrice', arrPrice, 7);

                                //执行价格实时更新方法
                                let pri = Number(arrPrice[idx]);
                                console.log(tbody.children);
                                let collection = tbody.children;
                                console.log(idx);
                                console.log(collection.item(idx));
                                // realTimePrice(tbody.children[idx], changNum, pri);
                                refresh(limitArrNum, arrPrice);
                            }
                            // else if (state === 'false') {
                            //     // realTimePrice(tbody.children[idx], changNum, arrPrice[idx]);
                            // }
                        }
                    }
                    if (target.className === 'click mini') {
                        arrSid = cookie.get('arrSid').split(',');
                        arrNum = cookie.get('arrNum').split(',');
                        arrPrice = cookie.get('arrPrice').split(',');

                        let idx = arrSid.indexOf(target.getAttribute('sid'));
                        let state = innerbox[idx + 1].getAttribute('checked');
                        let pri = Number(arrPrice[idx]);
                        let node = target.parentNode.parentNode.parentNode.parentNode;

                        limitArrNum[idx] = limitArrNum[idx] == 0 ? arrNum[idx] : limitArrNum[idx];
                        // limitArrNum[idx] = limitArrNum[idx] == 0 ? arrNum[idx] : limitArrNum[idx];

                        changNum = Number(limitArrNum[idx]);
                        changNum--;
                        if (changNum <= 1) {
                            changNum = 1;
                        }
                        let input = target.parentNode.children[1];
                        input.value = changNum;
                        limitArrNum[idx] = changNum;
                        console.log('每次点击减号后的零时数组：' + limitArrNum);
                        realTimePrice(node, changNum, pri);
                        if (state === 'true') {
                            arrNum[idx] = limitArrNum[idx];
                            cookie.set('arrNum', arrNum, 7);
                            arrNum = cookie.get('arrNum').split(',');
                            console.log('每次点击加号并且勾选上的limitArrNum' + limitArrNum)
                            console.log('每次点击加号并且勾选上的arrNum' + arrNum);


                            let calcArr = limitArrNum.map((value, index) => {
                                if (index != idx) {
                                    if (value != arrNum[index]) {
                                        return 0;
                                    } else {
                                        if (innerbox[index + 1].getAttribute('checked') === 'true') {
                                            return value;
                                        } else {
                                            return 0;
                                        }
                                    }
                                } else {
                                    return value;
                                }
                            })
                            console.log('用于计算的calc' + calcArr);
                            refresh(calcArr, arrPrice);
                        }


                    } else if (target.className === 'click plus') {
                        arrSid = cookie.get('arrSid').split(',');
                        arrNum = cookie.get('arrNum').split(',');
                        arrPrice = cookie.get('arrPrice').split(',');

                        innerbox = $('.innerbox', 1);
                        let idx = arrSid.indexOf(target.getAttribute('sid'));
                        let state = innerbox[idx + 1].getAttribute('checked');
                        let pri = Number(arrPrice[idx]);
                        let node = target.parentNode.parentNode.parentNode.parentNode;


                        limitArrNum[idx] = limitArrNum[idx] == 0 ? arrNum[idx] : limitArrNum[idx];

                        changNum = Number(limitArrNum[idx]);
                        changNum++;
                        let input = target.parentNode.children[1];
                        input.value = changNum;
                        limitArrNum[idx] = changNum;
                        console.log('每次点击加号但没勾选上的零时数组：' + limitArrNum);

                        realTimePrice(node, changNum, pri);
                        if (state === 'true') {
                            arrNum[idx] = limitArrNum[idx];
                            cookie.set('arrNum', arrNum, 7);
                            arrNum = cookie.get('arrNum').split(',');
                            console.log('每次点击加号并且勾选上的limitArrNum' + limitArrNum)
                            console.log('每次点击加号并且勾选上的arrNum' + arrNum);


                            let calcArr = limitArrNum.map((value, index) => {
                                if (index != idx) {
                                    if (value != arrNum[index]) {
                                        return 0;
                                    } else {
                                        if (innerbox[index + 1].getAttribute('checked') === 'true') {
                                            return value;
                                        } else {
                                            return 0;
                                        }
                                    }
                                } else {
                                    return value;
                                }
                            })
                            console.log('calc:' + calcArr);
                            refresh(calcArr, arrPrice);
                        }
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

    //-------------------全局方法-----------------
    //价格实时更新方法
    function realTimePrice(node, num, pri) {
        let priceNode = node.children[4];
        let price = priceNode.children[0].children[0];
        // console.log(priceNode);
        // console.log(price);
        price.innerHTML = Number(num * pri).toFixed(2);
    }

    function refresh(arrNum, arrPrice, fake) {
        let sum = 0;
        let price = 0;
        if (fake) {
            sum = Number(checkoutNumber.innerHTML);
            price = Number(checkoutPrice.innerHTML);
            // alert(1);
        }
        for (let value in arrNum) {
            // console.log(Number(arrNum[value]));
            sum += Number(arrNum[value]);
            price += Number(arrNum[value]) * Number(arrPrice[value]);
        }

        checkoutNumber.innerHTML = sum;
        checkoutPrice.innerHTML = price.toFixed(2);
    }

    //点击删除按钮删除条目方法
    shopping.onclick = function deleteItem() {

        let arrSid = cookie.get('arrSid').split(',');
        let arrNum = cookie.get('arrNum').split(',');
        let arrPrice = cookie.get('arrPrice').split(',');
        let innerbox = $('.innerbox', 1);

        let calcArr = limitArrNum.map((value, index) => {
            if (index != deleteIdx) {
                if (value != arrNum[index]) {
                    return 0;
                } else {
                    if (innerbox[index + 1].getAttribute('checked') === 'true') {
                        return value;
                    } else {
                        return 0;
                    }
                }
            } else {
                return value;
            }
        })
        console.log('删除后的calc' + calcArr);
        refresh(calcArr, arrPrice);

        arrSid.splice(deleteIdx, 1);
        arrNum.splice(deleteIdx, 1);
        arrPrice.splice(deleteIdx, 1);
        cookie.set('arrSid', arrSid, 7);
        cookie.set('arrNum', arrNum, 7);
        cookie.set('arrPrice', arrPrice, 7);


        limitArrSid.splice(deleteIdx, 1);
        limitArrNum.splice(deleteIdx, 1);
        limitArrPrice.splice(deleteIdx, 1);

        calcArr.splice(deleteIdx, 1);
        console.log('删除后的calc数组：' + calcArr);
        console.log('删除后的零时数组：' + limitArrNum);
        console.log('删除后的arrNum：' + arrNum);
        //判断如果数组长度为0的时候删除数组
        if (arrSid.length === 0) {
            cookie.remove('arrSid');
            cookie.remove('arrNum');
            cookie.remove('arrPrice');
            $('thead').style.display = 'none';
            $('.footer').style.display = 'none';
            $('.carnull').style.display = 'flex';
        } else {
            refresh(calcArr, arrPrice);
        }

        //完成删除操作隐藏提示
        success.style.display = 'none';
        cover.style.display = 'none';

        $('tbody').removeChild(removeTarget);

        //每次删除之后检查勾选个数,如果个数为innerbox个数-2,钩上勾选框
        innerbox = $('.innerbox', 1);
        let count = 0;
        for (let value of innerbox) {
            if (value.getAttribute('checked') === 'true') {
                count++;
            }
        }
        if (count >= innerbox.length - 2) {
            allSelect();
        }
    }


    function allSelect() {
        let innerbox = $('.innerbox', 1);
        for (let obj of innerbox) {
            obj.style.background = 'url("image/icons.png") -78px -100px no-repeat';
            obj.parentNode.style.backgroundColor = '#e32332';
            obj.parentNode.style.borderColor = '#e32332';
            allBeSelected = true;
            obj.setAttribute('checked', true);
        }

    }

    function nullSelect() {
        let innerbox = $('.innerbox', 1);
        for (let obj of innerbox) {
            obj.style.background = 'white';
            obj.parentNode.style.backgroundColor = 'white';
            obj.parentNode.style.borderColor = '#d4d4d4';
            obj.setAttribute('checked', false);
        }
        allBeSelected = false;
    }

}();
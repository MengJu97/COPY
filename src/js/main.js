export let main = {
    //购物车js
    carJs: function () {
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


        //------------全局变量---------------
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

        let carNum = $('.car em');


        //从cookie中渲染

        $ajax({
            url: 'http://localhost/PerfectWord/php/list.php'
        }).then((data) => {
            let result = JSON.parse(data);
            console.log(result);
            console.log(result[0].url);
            if (cookie.get('arrSid')) {
                if (cookie.get('arrSid').length > 0) {
                    $('thead').style.display = 'flex';
                    $('.footer').style.display = 'flex';
                    $('.carnull').style.display = 'none';

                    let str = '';
                    let arrSid = cookie.get('arrSid').split(',');
                    let arrNum = cookie.get('arrNum').split(',');
                    let arrPrice = cookie.get('arrPrice').split(',');


                    carNum.innerHTML = arrNum.reduce((previousValue, currentValue) => {
                        return Number(previousValue) + Number(currentValue);
                    }, 0);
                    //-----------------------------------------------
                    limitArrSid = cookie.get('arrSid').split(',');
                    limitArrNum = cookie.get('arrNum').split(',');
                    limitArrPrice = cookie.get('arrPrice').split(',');


                    //             for (let i = 0; i < arrSid.length; i++) {
                    //                 str += `<tr class="item" index="${i}" sid="${arrSid[i]}">
                    //     <td class="state">
                    //             <span class="checkbox" index="${i}" sid="${arrSid[i]}">
                    //                 <span class="innerbox" index="${i}" sid="${arrSid[i]}">
                    //
                    //                 </span>
                    //             </span>
                    //     </td>
                    //     <td class="name">
                    //         <a href="detail.html?sid=${arrSid[i]}" class="pic"><img src="${result[Number(arrSid[i]) - 1].url}" alt=""></a>
                    //         <a href="detail.html?sid=${arrSid[i]}" class="title">${result[Number(arrSid[i]) - 1].title}</a>
                    //     </td>
                    //     <td class="discount"></td>
                    //     <td class="num">
                    //         <div class="number">
                    //             <div class="case">
                    //                 <div class="click mini" index="${i}" sid="${arrSid[i]}">
                    //                 </div>
                    //                 <input type="text" value="${arrNum[i]}" sid="${arrSid[i]}" index="${i}">
                    //                 <div class="click plus" index="${i}" sid="${arrSid[i]}">
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </td>
                    //     <td class="prices">
                    //         <p>¥<span>${(Number(arrPrice[i]) * Number(arrNum[i])).toFixed(2)}</span></p>
                    //     </td>
                    //     <td class="operation">
                    //         <a href="javascript:;" class="del" sid="${arrSid[i]}">
                    //             <span sid="${arrSid[i]}"></span>
                    //         </a>
                    //     </td>
                    // </tr>`
                    //             }
                    //
                    //             $('table').innerHTML += str;
                    order(arrSid, arrNum, arrPrice);

                    // $('.prices').onclick = () => {
                    //     let arrSid = cookie.get('arrSid').split(',');
                    //     let arrNum = cookie.get('arrNum').split(',');
                    //     let arrPrice = cookie.get('arrPrice').split(',');
                    //
                    // }

                    function order(arr, num, price) {
                        for (let i = 0; i < arr.length; i++) {
                            str += `<tr class="item" sid="${arr[i]}">
            <td class="state">
                    <span class="checkbox"  sid="${arr[i]}">
                        <span class="innerbox" sid="${arr[i]}">

                        </span>
                    </span>
            </td>
            <td class="name">
                <a href="detail.html?sid=${arr[i]}" class="pic"><img src="${result[Number(arr[i]) - 1].url}" alt=""></a>
                <a href="detail.html?sid=${arr[i]}" class="title">${result[Number(arr[i]) - 1].title}</a>
            </td>
            <td class="discount"></td>
            <td class="num">
                <div class="number">
                    <div class="case">
                        <div class="click mini"  sid="${arrSid[i]}">
                        </div>
                        <input type="text" value="${num[i]}" sid="${arr[i]}">
                        <div class="click plus"  sid="${arr[i]}">
                        </div>
                    </div>
                </div>
            </td>
            <td class="prices">
                <p>¥<span>${(Number(price[i]) * Number(num[i])).toFixed(2)}</span></p>
            </td>
            <td class="operation">
                <a href="javascript:;" class="del" sid="${arr[i]}">
                    <span sid="${arr[i]}"></span>
                </a>
            </td>
        </tr>`
                        }

                        $('table').innerHTML += str;
                    }

                    //--------------全选--------------
                    let innerbox = $('.innerbox', 1);
                    let checkbox = $('.checkbox', 1);

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

                                let calcArr = toCalcArr(idx);
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

                                // let calcArr = limitArrNum.map((value, index) => {
                                //     if (index != idx) {
                                //         if (value != arrNum[index]) {
                                //             return 0;
                                //         } else {
                                //             if (innerbox[index + 1].getAttribute('checked') === 'true') {
                                //                 return value;
                                //             } else {
                                //                 return 0;
                                //             }
                                //         }
                                //     } else {
                                //         return value;
                                //     }
                                // })

                                let calcArr = toCalcArr(idx);
                                refresh(calcArr, arrPrice);
                                console.log('calc' + calcArr);


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
                        let countNum = cookie.get('arrNum').split(',').reduce((previousValue, currentValue) => {
                            return Number(currentValue) + previousValue;
                        }, 0);
                        console.log('购物车' + countNum);
                        carNum.innerHTML = countNum;
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
                                let state = innerbox[idx + 1].getAttribute('checked');
                                if (state === 'true') {
                                    //商品列表前是勾选状态
                                    arrNum[idx] = limitArrNum[idx];
                                    cookie.set('arrNum', arrNum, 7);

                                    //执行价格实时更新方法
                                    let pri = Number(arrPrice[idx]);
                                    console.log(tbody.children);
                                    let collection = tbody.children;
                                    console.log(idx);
                                    console.log(collection.item(idx));
                                    refresh(limitArrNum, arrPrice);
                                }
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


                                // let calcArr = limitArrNum.map((value, index) => {
                                //     if (index != idx) {
                                //         if (value != arrNum[index]) {
                                //             return 0;
                                //         } else {
                                //             if (innerbox[index + 1].getAttribute('checked') === 'true') {
                                //                 return value;
                                //             } else {
                                //                 return 0;
                                //             }
                                //         }
                                //     } else {
                                //         return value;
                                //     }
                                // })

                                let calcArr = toCalcArr(idx);
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


                                // let calcArr = limitArrNum.map((value, index) => {
                                //     if (index != idx) {
                                //         if (value != arrNum[index]) {
                                //             return 0;
                                //         } else {
                                //             if (innerbox[index + 1].getAttribute('checked') === 'true') {
                                //                 return value;
                                //             } else {
                                //                 return 0;
                                //             }
                                //         }
                                //     } else {
                                //         return value;
                                //     }
                                // })
                                // console.log('calc:' + calcArr);
                                // refresh(calcArr, arrPrice);
                                let calcArr = toCalcArr(idx);
                                console.log('用于计算的calc' + calcArr);
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
            price.innerHTML = Number(num * pri).toFixed(2);
        }

        function refresh(arrNum, arrPrice, fake) {
            let sum = 0;
            let price = 0;
            if (fake) {
                sum = Number(checkoutNumber.innerHTML);
                price = Number(checkoutPrice.innerHTML);
            }
            for (let value in arrNum) {
                sum += Number(arrNum[value]);
                price += Number(arrNum[value]) * Number(arrPrice[value]);
            }

            checkoutNumber.innerHTML = sum;
            checkoutPrice.innerHTML = price.toFixed(2);
        }

        $('.delSelection').onclick = () => {
            let arr = [];
            let innerbox = $('.innerbox', 1);
            for (let i = 0; i < innerbox.length; i++) {
                console.log(innerbox[i]);
                if (innerbox[i].getAttribute('sid') && innerbox[i].getAttribute('checked') === 'true') {
                    arr.push(innerbox[i]);
                }
            }
            console.log(arr);
            // console.log(arr[0].getAttribute('sid'));
            for (let i = 0; i < arr.length; i++) {
                let arrSid = cookie.get('arrSid').split(',');
                deleteIdx = arrSid.indexOf(arr[i].getAttribute('sid'));
                removeTarget = arr[i].parentNode.parentNode.parentNode;
                shopping.onclick();
            }

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

        function toCalcArr(idx) {
            let innerbox = $('.innerbox', 1);
            let arrNum = cookie.get('arrNum').split(',');
            let arr = limitArrNum.map((value, index) => {
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
            return arr;
        }


    },
    //详情页js
    detailJs: function () {
        //检查cookie
        console.log(document.cookie);
        if (cookie.get('arrSid')) {
            let carNum = $('.car em');
            let arrNum = cookie.get('arrNum').split(',');
            let arrSid = cookie.get('arrSid').split(',');
            carNum.innerHTML = arrNum.reduce((previousValue, currentValue) => {
                return Number(previousValue) + Number(currentValue);
            }, 0)
        }

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
            $('title').innerText = `${result.title}`
            $('.hwrap span').innerHTML += `&nbsp;&nbsp;>&nbsp;&nbsp;<a href="http://localhost/COPY/src/detail.html?sid=${result.sid}">${result.title}</a>`;
            let imgArr = result.pics.split(',');
            console.log(result.info);
            let picsArr = result.info.split(',');
            console.log(picsArr);
            console.log(imgArr);
            let str = '';
            let sm = '';
            let index = 0;
            let picsStr = '';
            for (let value of picsArr) {
                picsStr += `
                <img src="${value}" alt="">
     `
            }
            $('.details').innerHTML += picsStr;


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


            //    商品推荐商品详情
            $ajax({url: 'http://localhost/COPY/php/list.php'}).then((data) => {
                let list = JSON.parse(data);
                // console.log(result.sid);
                list = list.filter((value) => {
                    if (value.sid !== result.sid) {
                        return value;
                    }
                })
                list = list.splice(0, 10);
                console.log(list);
                let str = '';
                for (let value of list) {
                    str += `
                    <div class="recommend">
                    <a href="http://localhost/COPY/src/detail.html?sid=${value.sid}"><img src="${value.url}" alt=""></a>
                    <p class="item_title">${value.title}</p>
                    <p class="item_price">¥${value.price}</p>
                    </div>
                    `
                }
                $('.guess_like').innerHTML += str;

            })


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
    },
    //登录页js
    loginJs: function () {
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
    },
    //注册页js
    regJs: function () {
        let phoneNum = $('.phone');
        let warn = $('.warn', 1);
        console.log(warn);
        let phoneFlag = null;
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
        let passwordFlag = null;
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
    },
    //列表页js
    listJs: function () {
        let result;
        let currentPage = 0;
        let eachPage = 12;
        let rankedArr;
        let totalPage;
        arrowState();
        //检查cookie
        // if (cookie.get('arrSid')) {
        //     let carNum = $('.car em');
        //     let arrNum = cookie.get('arrNum').split(',');
        //     let arrSid = cookie.get('arrSid').split(',');
        //     carNum.innerHTML = arrNum.reduce((previousValue, currentValue) => {
        //         return Number(previousValue) + Number(currentValue);
        //     }, 0)
        // }

        function refresh() {
            if (cookie.get('arrSid')) {
                let carNum = $('.car em');
                let arrNum = cookie.get('arrNum').split(',');
                let arrSid = cookie.get('arrSid').split(',');
                carNum.innerHTML = arrNum.reduce((previousValue, currentValue) => {
                    return Number(previousValue) + Number(currentValue);
                }, 0)
            }
        }

        refresh();

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


        $('.pre').onclick = () => {
            currentPage--;
            arrowState();
            if (currentPage <= 0) {
                currentPage = 0;
                // $('.pre').style.cursor = 'not-allowed';
            }
            renderByPrice(rankedArr);
            let page = $('.changePage div', 1);
            for (let i = 0; i < page.length; i++) {
                page[i].className = '';
            }
            page[currentPage].className = 'active';
        }


        $('.next').onclick = () => {
            currentPage++;
            arrowState();
            if (currentPage >= totalPage - 1) {
                currentPage = totalPage - 1;
            }
            renderByPrice(rankedArr);
            let page = $('.changePage div', 1);
            for (let i = 0; i < page.length; i++) {
                page[i].className = '';
            }
            page[currentPage].className = 'active';
        }

        function arrowState() {
            if (currentPage === 0) {
                $('.pre').style.cursor = 'not-allowed';
                $('.next').style.cursor = 'pointer';
            } else if (currentPage >= totalPage - 1) {
                $('.next').style.cursor = 'not-allowed';
                $('.pre').style.cursor = 'pointer';
            }
        }

        $ajax({
            url: 'http://localhost/COPY/php/list.php'
        }).then((data) => {
            let arrSid;
            let arrNum;
            let arrPrice;
            result = JSON.parse(data);
            rankedArr = [...result];
            renderByPrice(rankedArr);
            //渲染完成后


            $('.rank a').onclick = () => {
                let status = $('.rank a').getAttribute('class');
                if (status === 'up') {
                    $('.rank a').className = 'down';
                    $('.rank a').children[0].children[0].style.left = -206 + 'px';
                    // console.log(page(0, result));
                    rankedArr = [...bubble(result)];
                    renderByPrice(rankedArr);

                } else if (status === 'down') {
                    $('.rank a').className = 'up';
                    $('.rank a').children[0].children[0].style.left = -212 + 'px';
                    rankedArr = [...bubble(result)];
                    renderByPrice(rankedArr);
                }
            }

            $('.wrap').onclick = (event) => {
                var event = event || window.event;
                let target = event.target;
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
                    refresh();

                    //添加成功提示
                    $('.success').style.display = 'block';
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

        }
        $('.shopping').onclick = () => {
            $('.success').style.display = 'none';
        }

        //按价格高低进行渲染
        function bubble(result) {
            let status = $('.rank a').getAttribute('class');
            let arr = [...result];
            for (let i = 0; i < arr.length - 1; i++) {
                for (let j = 0; j < arr.length - i - 1; j++) {
                    if (status === 'up') {
                        if (Number(arr[j].price) > Number(arr[j + 1].price)) {
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    } else {
                        if (Number(arr[j].price) < Number(arr[j + 1].price)) {
                            let temp = arr[j];
                            arr[j] = arr[j + 1];
                            arr[j + 1] = temp;
                        }
                    }

                }
            }
            return arr;
        }


        function renderByPrice(arr) {
            let render = [...arr];
            render = render.splice(currentPage * 12, 12);
            let pageStr = '';
            let str = '';
            for (let value of render) {
                str += `
            <div class="blocks">
            <a href="http://localhost/COPY/src/detail.html?sid=${value.sid}">
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
            totalPage = Math.ceil(result.length / eachPage);

            for (let i = 0; i < totalPage; i++) {
                pageStr += `
                <div index="${i}">${i + 1}</div>     `
            }

            let pageParent = $('.changePage');


            pageParent.innerHTML = pageStr;

            $('.wrap').innerHTML = str;


            let divPage = $('.changePage div', 1);
            console.log(divPage);
            divPage[currentPage].className = 'active';

            for (let i = 0; i < divPage.length; i++) {
                // divPage[i].className = '';
                (function () {
                    divPage[i].onclick = () => {
                        currentPage = i;
                        arrowState();
                        renderByPrice(rankedArr);
                    }
                })(i);
            }
        }

        //分页渲染函数--每一页12条数据
        // function page(arr) {
        //
        //     renderByPrice(render);
        // }

    },
    //首页js
    indexJs: function () {
        const btnLess = $('.less');
        const btnGreat = $('.great');
        //轮播图list
        let oImgList = null;
        let moveTimes = 0;
        let oActive = null;

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

        let carNum = $('.car em');
        let arrNum;
        let arrSid;
        if (cookie.get('arrSid')) {
            arrNum = cookie.get('arrNum').split(',');
            arrSid = cookie.get('arrSid').split(',');
            carNum.innerHTML = arrNum.reduce((previousValue, currentValue) => {
                return Number(previousValue) + Number(currentValue);
            }, 0)
        }


        //购物车下拉菜单动画效果
        $('.car').onmouseover = () => {
            // bufferMove($('.incar'), {height: 170});
            //购物车还没有商品，快去挑选商品吧！
        }
        $('.car').onmouseleave = () => {
            // bufferMove($('.incar'), {height: 0});
        }

        //获取接口数据
        const oUl = $('.box ul');

        const oOl = $('.banner ol');

        let imgLogo = $('.logo img');

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
            url: 'http://localhost/COPY/php/index1.php'
        }).then(function (data) {
            let result = JSON.parse(data);
            console.log(result);
            //logo
            imgLogo.setAttribute('src', result.logo[0].url);

            //轮播图url
            let banner = result.banner.slice(0, 3);
            let str = '';
            for (let index in banner) {
                str += `
                <li class="box"><img src="${banner[index].url}" alt=""></li>
                `
            }
            let oUl = $('.banner ul');
            oUl.innerHTML = str;

            let boxWidth = $('.box').offsetWidth;

            let boxs = $('.box', 1);
            let liStr = '';
            let oOl = $('.banner ol')
            for (let i = 0; i < boxs.length; i++) {
                liStr += `
                <li index="${i}"></li>  `
            }
            oOl.innerHTML = liStr;

            let list = $('.banner ol>li', 1);
            console.log(list);
            list[0].className = 'active';


            oUl.style.width = (boxs.length + 2) * boxWidth + 'px';
            oUl.style.left = -boxWidth + 'px';

            let cloneNodeFirst = boxs[0].cloneNode(true);
            let cloneNodeLast = boxs[2].cloneNode(true);

            oUl.insertBefore(cloneNodeLast, oUl.firstElementChild);
            oUl.appendChild(cloneNodeFirst);


            let times = 1;
            $('.great').onclick = () => {
                greatMove();
            }

            $('.less').onclick = () => {
                lessMove();
            }

            function greatMove() {
                times++;
                if (times === 5) {
                    oUl.style.left = -boxWidth + 'px';
                    times = 2;
                    bufferMove(oUl, {left: -(times * boxWidth)});
                    clearActive(times);
                } else {
                    bufferMove(oUl, {left: -(times * boxWidth)});
                    clearActive(times);
                }
                console.log(times);
            }

            function lessMove() {
                times--;
                if (times === -1) {
                    times = 3;
                    oUl.style.left = -times * boxWidth + 'px';
                    times--;
                    console.log(times);
                    clearActive(times);
                    bufferMove(oUl, {left: -times * boxWidth});
                } else {
                    console.log(times)
                    bufferMove(oUl, {left: -times * boxWidth});
                    clearActive(times)
                }
            }

            $('.banner').onmouseover = () => {
                clearInterval(timer);
            }
            $('.banner').onmouseleave = () => {
                timer = setInterval(() => {
                    $('.great').onclick();
                }, 3000)
            }

            let timer = setInterval(() => {
                $('.great').onclick();
            }, 3000)


            function clearActive(idx) {
                for (let i = 0; i < list.length; i++) {
                    list[i].className = '';
                }
                if (idx === 4) {
                    list[0].className = 'active';
                }
                if (idx >= 1 && idx <= 3) {
                    list[idx - 1].className = 'active';
                }
                if (idx === 0) {
                    list[idx + 2].className = 'active';
                }
            }

            oOl.onclick = (event) => {
                var event = event || window.event;
                let target = event.target;
                console.log(target);
                let id = Number(target.getAttribute('index'));
                for (let i = 0; i < list.length; i++) {
                    list[i].className = '';
                }
                list[id].className = 'active';
                times = id;
                greatMove();
            }


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

            $('.row1').innerHTML = reWrite;
            $('.leftPart').innerHTML = `<img src="${result.dota[2].url}" alt="">`

            $ajax({
                url: 'http://localhost/COPY/php/list.php'
            }).then((data) => {
                // console.log(data);
                let result = JSON.parse(data).splice(0, 6);
                console.log(result);
                let str = '';
                for (let value of result) {
                    str += `
                    <div class="blocks">
                         <a href="http://localhost/COPY/src/detail.html?sid=${value.sid}">
                            <img src="${value.url}" alt="">
                         </a>
                        <p>${value.title}</p>
                        <span>¥${value.price}</span>
                    </div>
                    `
                }
                $('.row1').innerHTML += str;
            })
        })

    }
}
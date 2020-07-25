let sid = location.search.slice(1).split('=')[1];
console.log(sid);//字符串1


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
    for (let value of imgArr) {
        str += `<li><img src="${value}" alt=""></li>`;
        sm += `<div class="xm">
                <img src="${value}" alt="">
            </div>`;
    }
    $('.swip').innerHTML = str;
    $('.smallPic').innerHTML = sm;

    $('.title').innerHTML = result.title;
    $('.price').innerHTML = '¥' + result.price;

})
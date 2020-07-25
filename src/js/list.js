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
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function n(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,o,t){return o&&n(e.prototype,o),t&&n(e,t),e}}();function _toConsumableArray(e){if(Array.isArray(e)){for(var o=0,t=Array(e.length);o<e.length;o++)t[o]=e[o];return t}return Array.from(e)}function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}var main=exports.main={carJs:function(){var e;console.log(document.cookie),cookie.get("name")&&(e=$(".userInfo"),console.log(e),e.innerHTML='<a href="javascript:;">'+cookie.get("name")+'</a><span></span><a href="javascript:;" class="logout">退出</a>',$(".logout").onclick=function(){cookie.remove("name"),location.href="home.html"});var m=$(".success"),h=$(".cover"),i=$(".shopping"),l=$(".checkoutnumber"),a=$(".checkoutprice"),P=void 0,b=void 0,y=void 0,O=void 0,j=void 0,G=void 0,_=$(".car em");function k(e,o,t){e.children[4].children[0].children[0].innerHTML=Number(o*t).toFixed(2)}function W(e,o,t){var n=0,r=0;for(var i in t&&(n=Number(l.innerHTML),r=Number(a.innerHTML)),e)n+=Number(e[i]),r+=Number(e[i])*Number(o[i]);l.innerHTML=n,a.innerHTML=r.toFixed(2)}function J(){var e=$(".innerbox",1),o=!0,t=!1,n=void 0;try{for(var r,i=e[Symbol.iterator]();!(o=(r=i.next()).done);o=!0){var l=r.value;l.style.background='url("image/icons.png") -78px -100px no-repeat',l.parentNode.style.backgroundColor="#e32332",l.parentNode.style.borderColor="#e32332",P=!0,l.setAttribute("checked",!0)}}catch(e){t=!0,n=e}finally{try{!o&&i.return&&i.return()}finally{if(t)throw n}}}function E(t){var n=$(".innerbox",1),r=cookie.get("arrNum").split(",");return j.map(function(e,o){return o==t||e==r[o]&&"true"===n[o+1].getAttribute("checked")?e:0})}$ajax({url:"http://localhost/PerfectWord/php/list.php"}).then(function(e){var r,T,A,S,C,g,i=JSON.parse(e);console.log(i),console.log(i[0].url),cookie.get("arrSid")?0<cookie.get("arrSid").length&&($("thead").style.display="flex",$(".footer").style.display="flex",$(".carnull").style.display="none",r="",T=cookie.get("arrSid").split(","),A=cookie.get("arrNum").split(","),S=cookie.get("arrPrice").split(","),_.innerHTML=A.reduce(function(e,o){return Number(e)+Number(o)},0),O=cookie.get("arrSid").split(","),j=cookie.get("arrNum").split(","),G=cookie.get("arrPrice").split(","),function(e,o,t){for(var n=0;n<e.length;n++)r+='<tr class="item" sid="'+e[n]+'">\n            <td class="state">\n                    <span class="checkbox"  sid="'+e[n]+'">\n                        <span class="innerbox" sid="'+e[n]+'">\n\n                        </span>\n                    </span>\n            </td>\n            <td class="name">\n                <a href="detail.html?sid='+e[n]+'" class="pic"><img src="'+i[Number(e[n])-1].url+'" alt=""></a>\n                <a href="detail.html?sid='+e[n]+'" class="title">'+i[Number(e[n])-1].title+'</a>\n            </td>\n            <td class="discount"></td>\n            <td class="num">\n                <div class="number">\n                    <div class="case">\n                        <div class="click mini"  sid="'+T[n]+'">\n                        </div>\n                        <input type="text" value="'+o[n]+'" sid="'+e[n]+'">\n                        <div class="click plus"  sid="'+e[n]+'">\n                        </div>\n                    </div>\n                </div>\n            </td>\n            <td class="prices">\n                <p>¥<span>'+(Number(t[n])*Number(o[n])).toFixed(2)+'</span></p>\n            </td>\n            <td class="operation">\n                <a href="javascript:;" class="del" sid="'+e[n]+'">\n                    <span sid="'+e[n]+'"></span>\n                </a>\n            </td>\n        </tr>';$("table").innerHTML+=r}(T,A,S),C=$(".innerbox",1),$(".checkbox",1),J(),$(".wrap").onclick=function(e){var o=(e=e||window.event).target;if("innerbox all"===o.className&&(S=(!0!==P?(J(),A=cookie.get("arrNum").split(","),j.every(function(e){return 0===Number(e)})?j=A.map(function(e){return Number(e)}):(j=j.map(function(e,o){return 0===e?A[o]:e}),A=j.map(function(e){return e}),cookie.set("arrNum",A,7)),console.log("点击全选按钮的零时数组："+j),console.log("点击全选按钮后的arrNum："+A)):(function(){var e=$(".innerbox",1),o=!0,t=!1,n=void 0;try{for(var r,i=e[Symbol.iterator]();!(o=(r=i.next()).done);o=!0){var l=r.value;l.style.background="white",l.parentNode.style.backgroundColor="white",l.parentNode.style.borderColor="#d4d4d4",l.setAttribute("checked",!1)}}catch(e){t=!0,n=e}finally{try{!o&&i.return&&i.return()}finally{if(t)throw n}}P=!1}(),A=cookie.get("arrNum").split(","),j=j.map(function(e){return 0}),console.log("全不选的临时数组"+j),console.log("全部选的arrNum"+A)),cookie.get("arrPrice").split(",")),W(j,S)),"innerbox"===o.className)if("true"===o.getAttribute("checked")){o.setAttribute("checked",!1),o.style.background="white",o.parentNode.style.backgroundColor="white",o.parentNode.style.borderColor="#d4d4d4";var t=$(".all",1),n=!0,r=!1,i=void 0;try{for(var l,a=t[Symbol.iterator]();!(n=(l=a.next()).done);n=!0){var s=l.value;s.style.background="white",s.parentNode.style.backgroundColor="white",s.parentNode.style.borderColor="#d4d4d4",s.setAttribute("checked",!1)}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}P=!1,O=O||cookie.get("arrSid").split(","),j=j||cookie.get("arrNum").split(","),G=G||cookie.get("arrPrice").split(",");var c=O.indexOf(o.getAttribute("sid"));j[c]=0,console.log("取消单个商品前的勾选框时的零时数组："+j),S=cookie.get("arrPrice").split(","),C=$(".innerbox",1),W(E(c),S)}else{o.setAttribute("checked",!0),o.style.background='url("image/icons.png") -78px -100px no-repeat',o.parentNode.style.backgroundColor="#e32332",o.parentNode.style.borderColor="#e32332",A=cookie.get("arrNum").split(","),T=cookie.get("arrSid").split(",");var u=o.getAttribute("sid"),d=T.indexOf(u);console.log(d),console.log("零时数组："+j),0==j[d]?j[d]=A[d]:(A[d]=j[d],cookie.set("arrNum",A,7)),A=cookie.get("arrNum").split(","),S=cookie.get("arrPrice").split(","),console.log("重新勾选后的arrNum"+A),console.log("重新勾选后的临时数组："+j);var p=E(d);W(p,S),console.log("calc"+p);var v=0,f=!0,g=!1,m=void 0;try{for(var h,b=C[Symbol.iterator]();!(f=(h=b.next()).done);f=!0){"true"===h.value.getAttribute("checked")&&v++}}catch(e){g=!0,m=e}finally{try{!f&&b.return&&b.return()}finally{if(g)throw m}}if(console.log(v),v>=C.length-2&&!1===P){P=!0;var y=$(".all",1),k=!0,N=!1,x=void 0;try{for(var w,M=y[Symbol.iterator]();!(k=(w=M.next()).done);k=!0){var H=w.value;H.style.background='url("image/icons.png") -78px -100px no-repeat',H.parentNode.style.backgroundColor="#e32332",H.parentNode.style.borderColor="#e32332",H.setAttribute("checked",!0)}}catch(e){N=!0,x=e}finally{try{!k&&M.return&&M.return()}finally{if(N)throw x}}}}var L=cookie.get("arrNum").split(",").reduce(function(e,o){return Number(o)+e},0);console.log("购物车"+L),_.innerHTML=L},(g=$("tbody")).onclick=function(e){var o,t,n,r,i,l,a,s,c,u,d,p,v=(e=e||window.event).target,f=void 0;"del"!==v.className&&"del"!==v.parentNode.className||(T=cookie.get("arrSid").split(","),A=cookie.get("arrNum").split(","),m.style.display="block",h.style.display="block",h.style.height=$(".wrap").offsetHeight+"px",b=T.indexOf(v.getAttribute("sid")),y="del"===v.className?v.parentNode.parentNode:v.parentNode.parentNode.parentNode,(o=$(".close span")).onclick=function(){m.style.display="none",h.style.display="none"},$(".jump").onclick=function(){o.onclick()}),"text"===v.getAttribute("type")&&(A=cookie.get("arrNum").split(","),t=T.indexOf(v.getAttribute("sid")),f=Number(A[t]),v.onfocus=function(){},v.onblur=function(){var e;v.value&&/^[0-9]+$/g.test(Number(v.value))?f=(99<=Number(v.value)?v.value=99:Number(v.value)<=0&&(v.value=1),Number(v.value)):v.value=f,console.log(f),j[t]=f,G[t]=S[t],k(g.children[t],j[t],G[t]),"true"===C[t+1].getAttribute("checked")&&(A[t]=j[t],cookie.set("arrNum",A,7),Number(S[t]),console.log(g.children),e=g.children,console.log(t),console.log(e.item(t)),W(j,S))}),"click mini"===v.className?(T=cookie.get("arrSid").split(","),A=cookie.get("arrNum").split(","),S=cookie.get("arrPrice").split(","),n=T.indexOf(v.getAttribute("sid")),r=C[n+1].getAttribute("checked"),i=Number(S[n]),l=v.parentNode.parentNode.parentNode.parentNode,j[n]=0==j[n]?A[n]:j[n],f=Number(j[n]),--f<=1&&(f=1),v.parentNode.children[1].value=f,j[n]=f,console.log("每次点击减号后的零时数组："+j),k(l,f,i),"true"===r&&(A[n]=j[n],cookie.set("arrNum",A,7),A=cookie.get("arrNum").split(","),console.log("每次点击加号并且勾选上的limitArrNum"+j),console.log("每次点击加号并且勾选上的arrNum"+A),a=E(n),console.log("用于计算的calc"+a),W(a,S))):"click plus"===v.className&&(T=cookie.get("arrSid").split(","),A=cookie.get("arrNum").split(","),S=cookie.get("arrPrice").split(","),C=$(".innerbox",1),s=T.indexOf(v.getAttribute("sid")),c=C[s+1].getAttribute("checked"),u=Number(S[s]),d=v.parentNode.parentNode.parentNode.parentNode,j[s]=0==j[s]?A[s]:j[s],f=Number(j[s]),f++,v.parentNode.children[1].value=f,j[s]=f,console.log("每次点击加号但没勾选上的零时数组："+j),k(d,f,u),"true"===c&&(A[s]=j[s],cookie.set("arrNum",A,7),A=cookie.get("arrNum").split(","),console.log("每次点击加号并且勾选上的limitArrNum"+j),console.log("每次点击加号并且勾选上的arrNum"+A),p=E(s),console.log("用于计算的calc"+p),W(p,S)))},W(A,S)):(console.log(1),$("thead").style.display="none",$(".footer").style.display="none",$(".carnull").style.display="flex")}),$(".delSelection").onclick=function(){for(var e=[],o=$(".innerbox",1),t=0;t<o.length;t++)console.log(o[t]),o[t].getAttribute("sid")&&"true"===o[t].getAttribute("checked")&&e.push(o[t]);console.log(e);for(var n=0;n<e.length;n++){var r=cookie.get("arrSid").split(",");b=r.indexOf(e[n].getAttribute("sid")),y=e[n].parentNode.parentNode.parentNode,i.onclick()}},i.onclick=function(){var e=cookie.get("arrSid").split(","),t=cookie.get("arrNum").split(","),o=cookie.get("arrPrice").split(","),n=$(".innerbox",1),r=j.map(function(e,o){return o==b||e==t[o]&&"true"===n[o+1].getAttribute("checked")?e:0});console.log("删除后的calc"+r),W(r,o),e.splice(b,1),t.splice(b,1),o.splice(b,1),cookie.set("arrSid",e,7),cookie.set("arrNum",t,7),cookie.set("arrPrice",o,7),O.splice(b,1),j.splice(b,1),G.splice(b,1),r.splice(b,1),console.log("删除后的calc数组："+r),console.log("删除后的零时数组："+j),console.log("删除后的arrNum："+t),0===e.length?(cookie.remove("arrSid"),cookie.remove("arrNum"),cookie.remove("arrPrice"),$("thead").style.display="none",$(".footer").style.display="none",$(".carnull").style.display="flex"):W(r,o),m.style.display="none",h.style.display="none",$("tbody").removeChild(y),n=$(".innerbox",1);var i=0,l=!0,a=!1,s=void 0;try{for(var c,u=n[Symbol.iterator]();!(l=(c=u.next()).done);l=!0){"true"===c.value.getAttribute("checked")&&i++}}catch(e){a=!0,s=e}finally{try{!l&&u.return&&u.return()}finally{if(a)throw s}}i>=n.length-2&&J()}},detailJs:function(){var e,o,t;console.log(document.cookie),cookie.get("arrSid")&&(e=$(".car em"),o=cookie.get("arrNum").split(","),cookie.get("arrSid").split(","),e.innerHTML=o.reduce(function(e,o){return Number(e)+Number(o)},0)),cookie.get("name")&&(t=$(".userInfo"),console.log(t),t.innerHTML='<a href="javascript:;">'+cookie.get("name")+'</a><span></span><a href="javascript:;" class="logout">退出</a>',$(".logout").onclick=function(){cookie.remove("name"),location.href="home.html"}),$(".car").onmouseover=function(){bufferMove($(".incar"),{height:170})},$(".car").onmouseleave=function(){bufferMove($(".incar"),{height:0})};var n=$(".mini"),r=$(".plus"),i=$(".case input"),T=Number(i.value);n.onclick=function(){T<=1?T=1:T--,i.value=T},r.onclick=function(){T++,i.value=T},i.onblur=function(){var e=i.value;e&&/^[0-9]+$/g.test(e)&&(T=99<=Number(e)?99:Number(e)<=1?1:Number(e)),i.value=T};var A=$(".btns .car"),S=$(".btns .buy"),C=$(".success"),P=$(".cover"),O=$(".shopping"),j=($(".jump"),void 0),G=void 0,_=void 0;null!=cookie.get("arrSid")?(j=cookie.get("arrSid").split(","),G=cookie.get("arrNum").split(","),_=cookie.get("arrPrice").split(","),console.log(j),console.log(G)):(j=[],G=[],_=[]);var W=location.search.slice(1).split("=")[1];$ajax({url:"http://localhost/PerfectWord/php/search.php",data:"sid="+W}).then(function(e){var c=JSON.parse(e)[0];console.log(c),$("title").innerText=""+c.title,$(".hwrap span").innerHTML+='&nbsp;&nbsp;>&nbsp;&nbsp;<a href="http://localhost/COPY/src/detail.html?sid='+c.sid+'">'+c.title+"</a>";var o=c.pics.split(",");console.log(c.info);var t=c.info.split(",");console.log(t),console.log(o);var n="",r="",i=0,l="",a=!0,s=!1,u=void 0;try{for(var d,p=t[Symbol.iterator]();!(a=(d=p.next()).done);a=!0){l+='\n                <img src="'+d.value+'" alt="">\n     '}}catch(e){s=!0,u=e}finally{try{!a&&p.return&&p.return()}finally{if(s)throw u}}$(".details").innerHTML+=l;var v=!0,f=!1,g=void 0;try{for(var m,h=o[Symbol.iterator]();!(v=(m=h.next()).done);v=!0){var b=m.value;n+='<li index="'+i+'"><div class="smallGlass"></div><img src="'+b+'" alt=""></li>',r+='<div class="xm" index="'+i+'">\n                <img src="'+b+'"  index="'+i+'">\n            </div>',i++}}catch(e){f=!0,g=e}finally{try{!v&&h.return&&h.return()}finally{if(f)throw g}}$(".swip").innerHTML=n,$(".smallPic").innerHTML=r,$(".mage").innerHTML='<img src="'+o[0]+'" alt="">',$(".title").innerHTML=c.title,$(".price").innerHTML="¥"+c.price;var y,k=$(".swip"),N=$(".swip li",1),x=$(".smallPic"),w=$(".smallPic img",1),M=($(".mage"),$(".mage img"));function H(e,o){e.forEach(function(e){e.style.opacity="50%"}),e[o].style.opacity="1"}H(w,0),console.log(N),console.log(N[0].offsetLeft),console.log(w),x.onclick=function(e){var o=(e=e||window.event).target;console.log(o.getAttribute("index")),y=o.getAttribute("index"),H(w,y),bufferMove(k,{left:430*-y+5}),M.setAttribute("src",w[y].src),console.log(w[y].src),new J(y).init()},new J(0).init(),A.onclick=function(){C.style.display="block",P.style.display="block",P.style.height=document.documentElement.offsetHeight+"px";var e=j.indexOf(W);console.log(e),-1!==e?G[e]=Number(G[e])+Number(T):(j.push(W),G.push(T),_.push(c.price)),cookie.set("arrSid",j,7),cookie.set("arrNum",G,7),cookie.set("arrPrice",_,7)},S.onclick=function(){var e=j.indexOf(W);console.log(e),-1!==e?G[e]=Number(G[e])+Number(T):(j.push(W),G.push(T),_.push(c.price)),cookie.set("arrSid",j,7),cookie.set("arrNum",G,7),cookie.set("arrPrice",_,7)};var L=$(".close span");L.onclick=function(){C.style.display="none",P.style.display="none"},O.onclick=function(){L.onclick()},$ajax({url:"http://localhost/COPY/php/list.php"}).then(function(e){var o=JSON.parse(e);o=(o=o.filter(function(e){if(e.sid!==c.sid)return e})).splice(0,10),console.log(o);var t="",n=!0,r=!1,i=void 0;try{for(var l,a=o[Symbol.iterator]();!(n=(l=a.next()).done);n=!0){var s=l.value;t+='\n                    <div class="recommend">\n                    <a href="http://localhost/COPY/src/detail.html?sid='+s.sid+'"><img src="'+s.url+'" alt=""></a>\n                    <p class="item_title">'+s.title+'</p>\n                    <p class="item_price">¥'+s.price+"</p>\n                    </div>\n                    "}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}$(".guess_like").innerHTML+=t})});var J=(_createClass(l,[{key:"init",value:function(){var l=this;this.small.onmouseover=function(e){l.smallGlass.style.display="block",l.bigGlass.style.display="block";var e=e||window.event,n=l.outbox.offsetTop,r=l.outbox.offsetLeft,i=l.big.offsetWidth/l.bigGlass.offsetWidth;console.log(i),console.log(r,n),document.documentElement.onmousemove=function(e){var o=(e=e||window.event).pageY-n-l.smallGlass.offsetHeight/2,t=e.pageX-r-5-l.smallGlass.offsetWidth/2;o<=0?o=0:o>=l.small.offsetHeight-l.smallGlass.offsetHeight&&(o=l.small.offsetHeight-l.smallGlass.offsetHeight),t<=0?t=0:t>=l.small.offsetWidth-l.smallGlass.offsetWidth&&(t=l.small.offsetWidth-l.smallGlass.offsetWidth),l.smallGlass.style.top=o+"px",l.smallGlass.style.left=t+"px",l.big.style.top=-i*o+"px",l.big.style.left=-i*t+"px"}},this.small.onmouseleave=function(){l.smallGlass.style.display="none",l.bigGlass.style.display="none",document.documentElement.onmousemove=null}}}]),l);function l(e){_classCallCheck(this,l),this.outbox=$(".wrap"),this.small=$(".swip li",1)[e],this.smallGlass=$(".smallGlass",1)[e],this.big=$(".mage img"),this.bigGlass=$(".mage")}},loginJs:function(){console.log($("form input",1));for(var e=0;e<$("form input",1).length;e++)!function(e){$("form input",1)[e].onfocus=function(){$("form input",1)[e].parentNode.style.borderColor="#ffa820"},$("form input",1)[e].onblur=function(){$("form input",1)[e].parentNode.style.borderColor="#ddd"}}(e);console.log($(".del",1));for(e=0;e<$(".del",1).length;e++)!function(e){$(".del",1)[e].onclick=function(){$(".del",1)[e].parentNode.children[1].value=""}}(e);var n=$(".username"),r=$(".error");console.log(n);var i=$(".password");n.addEventListener("focus",function(){}),n.addEventListener("click",function(){r.style.visibility="hidden"}),i.addEventListener("focus",function(){r.style.visibility="hidden"}),$(".submit").onclick=function(e){var e=e||window.event,o=n.value,t=i.value;""!==o?/^1[3578]\d{9}$/.test(o)?""!==t?(e.preventDefault(),$ajax({type:"POST",url:"http://localhost/PerfectWord/php/login.php",data:"phone="+o+"&password="+t}).then(function(e){console.log(e),""===e?(r.innerHTML="用户名或密码错误",r.style.visibility="visible"):(cookie.set("name",o,10),location.href="home.html")})):(r.innerHTML="密码格式不正确",r.style.visibility="visible",e.preventDefault()):(r.innerHTML="账号格式不正确",r.style.visibility="visible",console.log(n.parentNode),e.preventDefault()):(n.focus(),r.innerHTML="账号格式不正确",r.style.visibility="visible",e.preventDefault())}},regJs:function(){var o=$(".phone"),t=$(".warn",1);console.log(t);var n=null;o.onblur=function(){var e;t[0].style.color="#ff5959",""!==o.value?(e=o.value,/^1[3578]\d{9}$/.test(e)?$ajax({url:"http://localhost/PerfectWord/php/reg.php",data:"phone="+e}).then(function(e){console.log(e),"1"===e?(t[0].innerHTML="此账号可用",t[0].style.visibility="visible",t[0].style.color="#a4e941",u(o,n=!0)):(t[0].innerHTML="对不起，用户名已存在！",t[0].style.visibility="visible",u(o,n=!1))}):(t[0].innerHTML="手机号格式不正确",t[0].style.visibility="visible",u(o,n=!1))):(t[0].innerHTML="不能为空",t[0].style.visibility="visible",u(o,n=!1))};var r=$(".password"),i=$(".level span",1);console.log(i),console.log(r);var l=null,a=void 0;r.oninput=function(){if(t[1].style.color="#ff5959",i[0].className="low",""!==r.value){var e=r.value,o=e.length;a=0;switch(/\d+/g.test(e)&&a++,/[a-z]+/g.test(e)&&a++,/[A-Z]+/g.test(e)&&a++,/[\W\_]+/g.test(e)&&a++,a){case 1:t[1].innerHTML="密码必须包含大写字母、小写字母、数字、符号至少3种",t[1].style.visibility="visible",i[0].className="low",i[1].className="",i[2].className="",u(r,l=!1);break;case 2:case 3:i[0].className="",i[1].className="middle",i[2].className="",u(r,l=!0);break;case 4:i[0].className="",i[1].className="",i[2].className="high",u(r,l=!0)}8<=o&&o<=16?(t[1].innerHTML="",t[1].style.visibility="visible"):(t[1].innerHTML="密码长度必须在8-16个字符之间",t[1].style.visibility="visible",u(r,l=!1))}else i[0].className="low",i[1].className="",i[2].className="",t[1].innerHTML="不能为空",t[1].style.visibility="visible",u(r,l=!1);console.log(l)};var s=null,c=$(".repeat");function u(e,o){!1===o?e.style.borderColor="#ed1919":!0===o&&(e.style.borderColor="#dbdbdb")}console.log(c),c.onblur=function(){""!==c.value?c.value===r.value?(t[2].style.visibility="hidden",l&&(s=!0,console.log(s)),u(c,!0)):(t[2].innerHTML="两次输入的密码不一致",t[2].style.visibility="visible",u(c,s=!1)):(t[2].innerHTML="不能为空",t[2].style.visibility="visible",u(c,s=!1))};var e=$(".submit");console.log(e),e.onclick=function(e){e=e||window.event;""!==o.value&&""!==r.value&&""!==c.value||(""===o.value&&(t[0].innerHTML="不能为空",t[0].style.visibility="visible",u(o,n=!1)),""===r.value&&(i[0].className="low",i[1].className="",i[2].className="",t[1].innerHTML="不能为空",t[1].style.visibility="visible",u(r,l=!1)),""===c&&(t[2].innerHTML="不能为空",t[2].style.visibility="visible",u(c,s=!1)),e.preventDefault()),!0===n&&!0===l&&!0===s||e.preventDefault()}},listJs:function(){var e,v=void 0,f=0,g=12,m=void 0,h=void 0;function s(){var e,o;cookie.get("arrSid")&&(e=$(".car em"),o=cookie.get("arrNum").split(","),cookie.get("arrSid").split(","),e.innerHTML=o.reduce(function(e,o){return Number(e)+Number(o)},0))}function b(){0===f?($(".pre").style.cursor="not-allowed",$(".next").style.cursor="pointer"):h-1<=f&&($(".next").style.cursor="not-allowed",$(".pre").style.cursor="pointer")}function o(e){for(var o=$(".rank a").getAttribute("class"),t=[].concat(_toConsumableArray(e)),n=0;n<t.length-1;n++)for(var r,i,l=0;l<t.length-n-1;l++){"up"===o?Number(t[l].price)>Number(t[l+1].price)&&(r=t[l],t[l]=t[l+1],t[l+1]=r):Number(t[l].price)<Number(t[l+1].price)&&(i=t[l],t[l]=t[l+1],t[l+1]=i)}return t}function y(e){var o=(o=[].concat(_toConsumableArray(e))).splice(12*f,12),t="",n="",r=!0,i=!1,l=void 0;try{for(var a,s=o[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var c=a.value;n+='\n            <div class="blocks">\n            <a href="http://localhost/COPY/src/detail.html?sid='+c.sid+'">\n                <img src="'+c.url+'" alt="">\n            </a>\n            <p>'+c.title+"</p>\n            <span>¥"+c.price+'</span>\n            <div class="hov">\n                <div class="btn" sid="'+c.sid+'" price="'+c.price+'">\n                    <span>加入购物车</span>\n                </div>\n            </div>\n\n        </div>\n            '}}catch(e){i=!0,l=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw l}}h=Math.ceil(v.length/g);for(var u=0;u<h;u++)t+='\n                <div index="'+u+'">'+(u+1)+"</div>     ";$(".changePage").innerHTML=t,$(".wrap").innerHTML=n;var d=$(".changePage div",1);console.log(d),d[f].className="active";for(var p=0;p<d.length;p++)!function(e){d[e].onclick=function(){f=e,b(),y(m)}}(p)}b(),s(),cookie.get("name")&&(e=$(".userInfo"),console.log(e),e.innerHTML='<a href="javascript:;">'+cookie.get("name")+'</a><span></span><a href="javascript:;" class="logout">退出</a>',$(".logout").onclick=function(){cookie.remove("name"),location.href="home.html"}),$(".rank a").onmouseover=function(){var e=$(".rank a").getAttribute("class");"up"===e?$(".rank a").children[0].children[0].style.left="-212px":"down"===e&&($(".rank a").children[0].children[0].style.left="-206px")},$(".rank a").onmouseleave=function(){var e=$(".rank a").getAttribute("class");"up"===e?$(".rank a").children[0].children[0].style.left="-218px":"down"===e&&($(".rank a").children[0].children[0].style.left="-224px")},$(".pre").onclick=function(){f--,b(),f<=0&&(f=0),y(m);for(var e=$(".changePage div",1),o=0;o<e.length;o++)e[o].className="";e[f].className="active"},$(".next").onclick=function(){f++,b(),h-1<=f&&(f=h-1),y(m);for(var e=$(".changePage div",1),o=0;o<e.length;o++)e[o].className="";e[f].className="active"},$ajax({url:"http://localhost/COPY/php/list.php"}).then(function(e){var i=void 0,l=void 0,a=void 0;v=JSON.parse(e),y(m=[].concat(_toConsumableArray(v))),$(".rank a").onclick=function(){var e=$(".rank a").getAttribute("class");"up"===e?($(".rank a").className="down",$(".rank a").children[0].children[0].style.left="-206px",y(m=[].concat(_toConsumableArray(o(v))))):"down"===e&&($(".rank a").className="up",$(".rank a").children[0].children[0].style.left="-212px",y(m=[].concat(_toConsumableArray(o(v)))))},$(".wrap").onclick=function(e){var o,t,n,r=(e=e||window.event).target;console.log(r),console.log("btn"===r.parentNode.className),"btn"!==r.className&&"btn"!==r.parentNode.className||(t=o=void 0,"btn"===r.parentNode.className?(o=r.parentNode.getAttribute("sid"),t=r.parentNode.getAttribute("price")):"btn"===r.className&&(o=r.getAttribute("sid"),t=r.getAttribute("price")),console.log(o),console.log(t),null!=cookie.get("arrSid")?(i=cookie.get("arrSid").split(","),l=cookie.get("arrNum").split(","),a=cookie.get("arrPrice").split(","),console.log(i),console.log(l),console.log(a),-1!==(n=i.indexOf(o))?l[n]=Number(l[n])+1:(i.push(o),l.push(1),a.push(t))):(l=[],a=[],(i=[]).push(o),l.push(1),a.push(t)),cookie.set("arrSid",i,7),cookie.set("arrNum",l,7),cookie.set("arrPrice",a,7),s(),$(".success").style.display="block")}}),$(".car").onmouseover=function(){bufferMove($(".incar"),{height:170})},$(".car").onmouseleave=function(){bufferMove($(".incar"),{height:0})},$(".close span").onclick=function(){$(".success").style.display="none"},$(".shopping").onclick=function(){$(".success").style.display="none"}},indexJs:function(){var e;$(".less"),$(".great");console.log(document.cookie),cookie.get("name")&&(e=$(".userInfo"),console.log(e),e.innerHTML='<a href="javascript:;">'+cookie.get("name")+'</a><span></span><a href="javascript:;" class="logout">退出</a>',$(".logout").onclick=function(){cookie.remove("name"),location.href="home.html"});var o=$(".car em"),t=void 0;cookie.get("arrSid")&&(t=cookie.get("arrNum").split(","),cookie.get("arrSid").split(","),o.innerHTML=t.reduce(function(e,o){return Number(e)+Number(o)},0)),$(".car").onmouseover=function(){},$(".car").onmouseleave=function(){};$(".box ul"),$(".banner ol");var L=$(".logo img"),T=$(".adList"),n=$(".topBar .items"),r=$(".pad");console.log(r),n.onmouseover=function(){r.style.display="block"},n.onmouseleave=function(){r.style.display="none"},$ajax({url:"http://localhost/COPY/php/index1.php"}).then(function(e){var o=JSON.parse(e);console.log(o),L.setAttribute("src",o.logo[0].url);var t=o.banner.slice(0,3),n="";for(var r in t)n+='\n                <li class="box"><img src="'+t[r].url+'" alt=""></li>\n                ';var i=$(".banner ul");i.innerHTML=n;for(var l=$(".box").offsetWidth,a=$(".box",1),s="",c=$(".banner ol"),u=0;u<a.length;u++)s+='\n                <li index="'+u+'"></li>  ';c.innerHTML=s;var d=$(".banner ol>li",1);console.log(d),d[0].className="active",i.style.width=(a.length+2)*l+"px",i.style.left=-l+"px";var p=a[0].cloneNode(!0),v=a[2].cloneNode(!0);i.insertBefore(v,i.firstElementChild),i.appendChild(p);var f=1;function g(){5===++f&&(i.style.left=-l+"px",f=2),bufferMove(i,{left:-f*l}),h(f),console.log(f)}$(".great").onclick=function(){g()},$(".less").onclick=function(){-1==--f?(f=3,i.style.left=-f*l+"px",f--,console.log(f),h(f),bufferMove(i,{left:-f*l})):(console.log(f),bufferMove(i,{left:-f*l}),h(f))},$(".banner").onmouseover=function(){clearInterval(m)},$(".banner").onmouseleave=function(){m=setInterval(function(){$(".great").onclick()},3e3)};var m=setInterval(function(){$(".great").onclick()},3e3);function h(e){for(var o=0;o<d.length;o++)d[o].className="";4===e&&(d[0].className="active"),1<=e&&e<=3&&(d[e-1].className="active"),0===e&&(d[e+2].className="active")}c.onclick=function(e){var o=(e=e||window.event).target;console.log(o);for(var t=Number(o.getAttribute("index")),n=0;n<d.length;n++)d[n].className="";d[t].className="active",f=t,g()};var b=o.banner.slice(3);console.log(b);var y="",k=!0,N=!1,x=void 0;try{for(var w,M=b[Symbol.iterator]();!(k=(w=M.next()).done);k=!0){y+='<img src="'+w.value.url+'" alt="dota2">'}}catch(e){N=!0,x=e}finally{try{!k&&M.return&&M.return()}finally{if(N)throw x}}T.innerHTML=y,$(".tower img").setAttribute("src",o.dota[0].url);$(".row1");var H='\n        <div class="hot">\n            <a href="javascript:;">\n                <img src="'+o.dota[1].url+'" alt="完美世界-完美商城-完美娱乐-世界同享">\n            </a>\n        </div>\n                        ';$(".row1").innerHTML=H,$(".leftPart").innerHTML='<img src="'+o.dota[2].url+'" alt="">',$ajax({url:"http://localhost/COPY/php/list.php"}).then(function(e){var o=JSON.parse(e).splice(0,6);console.log(o);var t="",n=!0,r=!1,i=void 0;try{for(var l,a=o[Symbol.iterator]();!(n=(l=a.next()).done);n=!0){var s=l.value;t+='\n                    <div class="blocks">\n                         <a href="http://localhost/COPY/src/detail.html?sid='+s.sid+'">\n                            <img src="'+s.url+'" alt="">\n                         </a>\n                        <p>'+s.title+"</p>\n                        <span>¥"+s.price+"</span>\n                    </div>\n                    "}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}$(".row1").innerHTML+=t})})}};
let sublists = document.querySelector('.sublists'); // 商品列表按钮
let maincontent = document.querySelector('.main-content'); // 商品列表主要内容
maincontent.innerHTML ='';
sublists.onclick = ()=>{
    if(Cookie.get('usname')){
            maincontent.innerHTML = `
            <div class="wrapper">
                <div class="contentbiao">
                    <span>商品管理</span>
                    <ul>
                        <li>商品列表</li>
                    </ul>
                    </div>
                    <div class="content">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox">全选
                                </th>
                                <th class="goods_id">序号</th>
                                <th class="goods_img">商品图片</th>
                                <th class="goods_name">商品名称</th>
                                <th class="goods_category">系列</th>
                                <th class="goods_unit">单价</th>
                                <th class="goods_stock">库存</th>
                                <th class="goods_del">操作</th>
                                <th class="goods_up">状态</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            <!-- <tr>
                                <td>
                                    <input type="checkbox">
                                </td>
                                <td class="goods_id">01</td>
                                <td class="goods_img">
                                    <img src="./img/latiao.jpg" alt="" style="width: 70px;height: 90px;border: 1px solid #ccc;">
                                    <img src="./img/latiao.jpg" class="smallimg" alt="" style="width: 150px;height: 180px;border: 1px solid #ccc;">
                                </td>
                                <td class="goods_name">【三只松鼠_辣条大礼包组合】怀旧麻辣零食网红儿时小吃大辣片</td>
                                <td class="goods_category">辣条组合</td>
                                <td class="goods_unit">￥24.9</td>
                                <td class="goods_stock">20</td>
                                <td class="goods_del">
                                    <i class="iconfont icon-caozuo" title="编辑"></i>
                                    <i class="iconfont icon-hekriconshanchu" title="删除"></i>
                                </td>
                                <td class="goods_up">
                                    <span class="uplists">未上架</span>
                                    <span class="downlists">下架</span>
                                </td>
                            </tr> -->

                        </tbody>
                    </table>

                    </div>
                    <div class="lists_page">
                    <span class="page_left" id="btn_prev"><</span> 
                    <div class="pages" id="pages">
                        <!-- <span class="lists_qty"><a href="#">1</a> </span>
                        <span><a href="#">2</a></span>
                        <span><a href="#">3</a></span> -->
                    </div>
                    <span class="page_right" id="btn_next">></span>
                    </div>
            </div>
            `;


        let tbody = maincontent.children[0].children[1].children[0].children[1]; // 列表表格
        let pages = maincontent.children[0].children[2].children[1]; // 按钮
        let spans = pages.children; // 按钮总数
        let btn_prev = maincontent.children[0].children[2].children[0]; // 上一页
        let btn_next = maincontent.children[0].children[2].children[2]; // 下一页
        let edit = document.querySelector('.edit'); //编辑框
        let screen = document.querySelector('.screen'); // 编辑框遮罩
        let edit_del = document.querySelector('.edit_del'); // 取消编辑框
        let tbody_edit = document.querySelector('.tbody_edit'); // 编辑框的内容
        // console.log(maincontent.children[0].children[2].children[1]);

        // 渲染
        var html = '';

        function create(str) {
            html += `
            <tr name="${str.SN}">
                <td>
                    <input type="checkbox">
                </td>
                <td class="goods_id">${str.SN}</td>
                <td class="goods_img">
                    <img src="./${str.goodsimgUrl}" class="littleimg" alt="" style="width: 70px;height: 90px;border: 1px solid #ccc;">
                    <img src="./${str.goodsimgUrl}" class="smallimg" alt="" style="width: 150px;height: 180px;border: 1px solid #ccc;">
                </td>                         
                <td class="goods_name">${str.goodsname}</td>
                <td class="goods_category">【${str.goodscategory}】</td>
                <td class="goods_unit">￥${str.goodsunit}</td>
                <td class="goods_stock">${str.goodstock}</td>
                <td class="goods_del">
                    <i class="iconfont icon-caozuo" title="编辑" name="${str.SN}"></i>
                    <i class="iconfont icon-hekriconshanchu" title="删除" name="${str.SN}"></i> 
                </td>
                <td class="goods_up">
                    <span class="uplists" name="${str.SN}">未上架</span>
                    <span class="downlists" name="${str.SN}">下架</span>
                </td>
            </tr>
            `;

            var tbodys = tbody.children; // 所有的tr
            xhr.open('GET', '/checkgrounding', true);
            xhr.send();
            xhr.onload = () => {
                if (xhr.status == 200) {
                    // console.log(xhr.responseText)
                    var res = JSON.parse(xhr.responseText);
                    var data = res.data;
                    if (res.code == 1) {
                        for (var i = 0; i < data.length; i++) {
                            // console.log(data[i].SN)
                            var GLSN = data[i].SN;
                            for (var j = 0; j < tbodys.length; j++) {
                                if (tbodys[j].getAttribute('name') == GLSN) {
                                    // console.log(j);
                                    tbodys[j].lastElementChild.children[0].style.background = '#fcb322';
                                    tbodys[j].lastElementChild.children[0].innerHTML = '已上架';
                                    tbodys[j].lastElementChild.children[1].style.display = 'inline-block';
                                }
                            }
                        }

                    }
                }
            }
        }

        // 连接列表表格的渲染 一页6条数据
        var page = 1;
        var qtys = 6;
        var xhr = new XMLHttpRequest();

        function show() {
            xhr.open('GET', '/lists?pages=' + page + '&qtys=' + qtys, true);
            xhr.send();
            xhr.onload = () => {
                if (xhr.status == 200) {
                    // console.log(xhr.responseText);
                    var res = JSON.parse(xhr.responseText);
                    // console.log(res);
                    var arr = res.data; // 数据
                    html = '';
                    for (var i = 0; i < arr.length; i++) {
                        create(arr[i]);
                    }
                    tbody.innerHTML = html;
                    Edit();
                }
            }
        };
        show();

        // 按钮
        function btn() {
            // 按钮的渲染
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/listsBtn?page=' + page, true);
            xhr.send();
            xhr.onload = () => {
                if (xhr.status == 200) {
                    // console.log(xhr.responseText);
                    var res = JSON.parse(xhr.responseText);
                    // console.log(res.data.length/qtys);
                    var bnums = Math.ceil(res.data.length / qtys);
                    // console.log(bnums);
                    var html = '';
                    for (var i = 0; i < bnums; i++) {
                        html += `<span><a href="#">${i+1}</a> </span>`;
                    }
                    pages.innerHTML = html;
                    // 按钮样式
                    var ind = res.page - 1;
                    spans[ind].className = 'lists_qty';
                }
            }

            // 按钮点击
            pages.onclick = function (e) {
                var e = e || window.e;
                var target = e.target || e.srcElement;
                if (target.nodeName.toLowerCase() == 'a') {
                    // console.log(target.innerHTML);
                    page = target.innerHTML;
                    // xhr.open('GET','lists?pages='+page+'&qtys='+qtys,true);
                    // xhr.send();
                    // xhr.onload = ()=>{
                    //     if(xhr.status==200){
                    //         // console.log(xhr.responseText);
                    //         var res = JSON.parse(xhr.responseText);
                    //         // console.log(res);
                    //         var arr = res.data;
                    //         html='';
                    //         for(var i=0;i<arr.length;i++){
                    //             create(arr[i]);
                    //         }
                    //         tbody.innerHTML = html;
                    show();

                    // 按钮样式
                    // console.log(target.parentNode);
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].className = '';
                    }
                    target.parentNode.className = 'lists_qty';

                    Edit();

                }

                if (page > 1) {
                    btn_prev.style.background = '#fff';
                    btn_prev.style.cursor = 'pointer';
                } else {
                    btn_prev.style.background = '#eaeaea';
                    btn_prev.style.cursor = 'default';
                    btn_next.style.background = '#fff';
                    btn_next.style.cursor = 'pointer';
                }
                if (page == spans.length) {
                    btn_next.style.background = '#eaeaea';
                    btn_next.style.cursor = 'default';
                }
            }

            // 上一页
            btn_prev.onclick = () => {
                for (var i = 0; i < spans.length; i++) {
                    if (spans[i].className == 'lists_qty') {
                        var now = i;
                        // console.log(now);
                        if (now > 0) {
                            page = now++;
                            show();
                            for (var i = 0; i < spans.length; i++) {
                                spans[i].className = '';
                            }
                            // console.log(page-1);
                            var ind = page - 1;
                            spans[ind].className = 'lists_qty';
                            if (ind == 0) {
                                btn_prev.style.background = '#eaeaea';
                                btn_prev.style.cursor = 'default';
                            } else {
                                btn_prev.style.background = '#fff';
                                btn_prev.style.cursor = 'pointer';
                                btn_next.style.background = '#fff';
                                btn_next.style.cursor = 'pointer';
                            }

                            Edit();
                        }

                    }
                }
            }

            // 下一页
            btn_next.onclick = () => {
                for (var i = 0; i < spans.length; i++) {
                    if (spans[i].className == 'lists_qty') {
                        var now = i;
                        if (now < spans.length) {
                            page = now + 2;
                            show();
                            for (var i = 0; i < spans.length; i++) {
                                spans[i].className = '';
                            }
                            var ind = page - 1;
                            // console.log(now);
                            spans[ind].className = 'lists_qty';
                            if (page == spans.length) {
                                btn_next.style.background = '#eaeaea';
                                btn_next.style.cursor = 'default';
                            } else {
                                btn_prev.style.background = '#fff';
                                btn_prev.style.cursor = 'pointer';
                            }
                            Edit();
                        }
                    }
                }
            }
        };
        btn();

        // 图片放大显示
        tbody.onmousemove = function (e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.className == 'littleimg') {
                // console.log(target.nextElementSibling);
                target.nextElementSibling.style.opacity = 1;
                target.onmouseleave = function () {
                    target.nextElementSibling.style.opacity = 0;
                }
            }
        }

        // 操作
        function Edit() {
            var tbodys = tbody.children; // 所有的tr
            // console.log(tbodys);
            for (var i = 0; i < tbodys.length; i++) {
                tbodys[i].addEventListener('click', function (e) {
                    var e = e || window.event;
                    var target = e.target || e.srcElement;
                    // 编辑
                    if (target.className == 'iconfont icon-caozuo') {
                        edit.style.display = 'block';
                        screen.style.display = 'block';
                        // console.log(target.getAttribute('name'));
                        var goods_SN = target.getAttribute('name');
                        xhr.open('GET', '/checkedit?goodsSN=' + goods_SN, true);
                        xhr.send();
                        xhr.onload = () => {
                            if (xhr.status == 200) {
                                var res = JSON.parse(xhr.responseText);
                                // console.log(res); 
                                var data = res.data;
                                tbody_edit.innerHTML = `
                                    <tr>
                                    <td>
                                        封面：
                                    </td>
                                    <td>
                                        <div class="listsimg" style="width:80px;height:100px;border: 1px solid #ccc">
                                            <img src="./${data.goodsimgUrl}" class="Gimg" alt="" style="width:80px;height:100px;">
                                        </div>
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="file" name="" id="" class="file">
                                            <button class="uploadfile">上传</button>
                                        </td>
                                    </tr>
                                    <tr>
                                    <td>商品名称：</td>
                                    <td>
                                        <input type="text" name="" id="Gname" class="edit_inp" value="${data.goodsname}">
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>系列：</td>
                                    <td>
                                        <input type="text" name="" id="Gcategory" class="edit_inp" value="${data.goodscategory}">
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>单价：</td>
                                        <td>
                                            <input type="text" name="" id="Gunit" class="edit_inp" value="${data.goodsunit}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>库存：</td>
                                        <td>
                                            <input type="text" name="" id="Gstock" class="edit_inp" value="${data.goodstock}">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button class="edit_confirm">确定</button>
                                        </td>
                                    </tr>
                                `;

                                var Gname = document.getElementById('Gname'); // 商品名称
                                var Gcategory = document.getElementById('Gcategory'); // 系列
                                var Gunit = document.getElementById('Gunit'); // 单价
                                var Gstock = document.getElementById('Gstock'); // 库存
                                var edit_confirm = tbody_edit.querySelector('.edit_confirm'); // 确定按钮
                                var Gimg = tbody_edit.querySelector('.Gimg'); // 商品照片

                                edit_confirm.onclick = function () {
                                    var imgurl = Gimg.getAttribute('src').slice('2');
                                    // console.log(imgurl);
                                    // console.log(goods_SN);
                                    // console.log(Gname.value);
                                    var url = `/upadatelists?goodsSN=${goods_SN}&imgurl=${encodeURI(imgurl)}&Gname=${encodeURI(Gname.value)}&Gcategory=${encodeURI(Gcategory.value)}&Gunit=${Gunit.value}&Gstock=${Gstock.value}`;
                                    xhr.open('GET', url, true);
                                    xhr.send();
                                    xhr.onload = () => {
                                        if (xhr.status == 200) {
                                            // console.log(xhr.responseText);
                                            var res = JSON.parse(xhr.responseText);
                                            if (res.code == 1) {
                                                edit.style.display = 'none';
                                                screen.style.display = 'none';
                                                show();
                                                btn();
                                            }

                                        }
                                    }
                                }

                            }
                        }
                    }
                    // 删除并更新序列号
                    if (target.className == 'iconfont icon-hekriconshanchu') {
                        var ensure = confirm('确定要删除这条数据？');
                        if (ensure) {
                            var goods_SN = target.getAttribute('name');
                            xhr.open('GET', '/dellists?goodsSN=' + goods_SN, true);
                            xhr.send();
                            xhr.onload = () => {
                                if (xhr.status == 200) {
                                    console.log(xhr.responseText);
                                    var res = JSON.parse(xhr.responseText);
                                    console.log(res);
                                    show();
                                    btn();
                                    // if(res.code==1){
                                    //     xhr.open('GET','/updateSN?goodsSN='+goods_SN,true);
                                    //     xhr.send();
                                    //     xhr.onload = ()=>{
                                    //         if(xhr.status == 200){
                                    //             // console.log(xhr.responseText);
                                    //             var res = JSON.parse(xhr.responseText);
                                    //             if(res.code == 1){
                                    // show();
                                    // btn();
                                    //             }
                                    //         }
                                    //     }
                                    // }
                                }
                            }
                        }
                    }
                    // 上架
                    if (target.className == 'uplists') {
                        var goods_SN = target.getAttribute('name');
                        xhr.open('GET', '/checkedit?goodsSN=' + goods_SN, true);
                        xhr.send();
                        xhr.onload = () => {
                            if (xhr.status == 200) {
                                var res = JSON.parse(xhr.responseText);
                                var code = res.code;
                                var data = res.data;
                                if (code == 1) {
                                    var url = `/udlists?SN=${encodeURI(data.SN)}&imgurl=${encodeURI(data.goodsimgUrl)}&name=${encodeURI(data.goodsname)}&category=${encodeURI(data.goodscategory)}&unit=${encodeURI(data.goodsunit)}&stock=${encodeURI(data.goodstock)}`;
                                    xhr.open('GET', url, true);
                                    xhr.send();
                                    xhr.onload = () => {
                                        if (xhr.status == 200) {
                                            // console.log(xhr.responseText);
                                            var arr = JSON.parse(xhr.responseText);
                                            if (arr.code == 1) {
                                                // var date = new Date();
                                                // date.setDate(date.getDate()+999);
                                                // document.cookie = 'statusstyle'+goods_SN+'='+goods_SN+';expires='+date;               
                                                target.style.background = '#fcb322';
                                                target.innerHTML = '已上架';
                                                target.nextElementSibling.style.display = 'inline-block';
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // 下架
                    if (target.className == 'downlists') {
                        var goods_SN = target.getAttribute('name');
                        xhr.open('GET', 'udlists?SN=' + goods_SN, true);
                        xhr.send();
                        xhr.onload = () => {
                            // console.log(xhr.responseText);
                            var arr = JSON.parse(xhr.responseText);
                            if (arr.code == 0) {
                                // var date = new Date();
                                // date.setDate(date.getDate()-1);
                                // document.cookie = 'statusstyle'+goods_SN+'='+goods_SN+';expires='+date;               
                                target.previousElementSibling.style.background = '#FF6C60';
                                target.previousElementSibling.innerHTML = '未上架';
                                target.style.display = 'none';
                            }
                        }
                    }
                })

                //  存在上下架的状态情况 
                // console.log(tbodys[i].lastElementChild.children[0]);
                // console.log((page-1)*qtys+i+1)
                // var statusnum = (page-1)*qtys+i+1;
                // if(Cookie.get('statusstyle'+statusnum)){    
                //     tbodys[i].lastElementChild.children[0].style.background = '#fcb322';
                //     tbodys[i].lastElementChild.children[0].innerHTML = '已上架';
                //     tbodys[i].lastElementChild.children[1].style.display = 'inline-block';
                // }


            }

        }

        // 取消编辑框
        edit_del.onclick = function () {
            edit.style.display = 'none';
            screen.style.display = 'none';
        }

    }
}
let tbody = document.getElementById('tbody'); // 列表表格
let pages = document.getElementById('pages'); // 按钮
let spans = pages.children; // 按钮总数
let btn_prev = document.getElementById('btn_prev'); // 上一页
let btn_next = document.getElementById('btn_next'); // 下一页

// 渲染
var html = '';
function show(str) {
    html += `
    <tr>
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
            <i class="iconfont icon-caozuo" title="编辑"></i>
            <i class="iconfont icon-hekriconshanchu" title="删除"></i> 
        </td>
        <td class="goods_up">
            <span class="uplists">未上架</span>
            <span class="downlists">下架</span>
        </td>
    </tr>
    `;
}

// 连接列表表格的渲染 一页5条数据
var xhr = new XMLHttpRequest();
var page = 1;
var qtys = 6;
xhr.open('GET', '/lists?pages='+page+'&qtys='+qtys, true);
xhr.send();
xhr.onload = () => {
    if (xhr.status == 200) {
        // console.log(xhr.responseText);
        var res = JSON.parse(xhr.responseText);
        // console.log(res);
        var arr = res.data; // 数据
        for (var i = 0; i < arr.length; i++) {
            show(arr[i]);
        }
        tbody.innerHTML = html;

    }
}

// 按钮
(function btn(){
    // 按钮的渲染
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/listsBtn?page='+page, true);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            // console.log(xhr.responseText);
            var res = JSON.parse(xhr.responseText);
            // console.log(res.data.length/qtys);
            var bnums = Math.ceil(res.data.length/qtys);
            // console.log(bnums);
            var html ='';
            for (var i = 0; i < bnums; i++) {
                html+=`<span><a href="#">${i+1}</a> </span>`;
                
            }
            pages.innerHTML = html;
            // 按钮样式
            var ind = res.page-1;
            spans[ind].className = 'lists_qty';
        }
    }

    // 按钮点击
    pages.onclick = function(e){
        var e = e || window.e;
        var target = e.target || e.srcElement;
        if(target.nodeName.toLowerCase() == 'a'){
            // console.log(target.innerHTML);
            page = target.innerHTML;
            xhr.open('GET','lists?pages='+page+'&qtys='+qtys,true);
            xhr.send();
            xhr.onload = ()=>{
                if(xhr.status==200){
                    // console.log(xhr.responseText);
                    var res = JSON.parse(xhr.responseText);
                    // console.log(res);
                    var arr = res.data;
                    html='';
                    for(var i=0;i<arr.length;i++){
                        show(arr[i]);
                    }
                    tbody.innerHTML = html;
                    // 按钮样式
                    // console.log(target.parentNode);
                    for(var i=0;i<spans.length;i++){
                        spans[i].className='';
                    }
                    target.parentNode.className='lists_qty';
                }
            }

            if(page>1){
                btn_prev.style.background = '#fff';
                btn_prev.style.cursor = 'pointer';
            }else{
                btn_prev.style.background = '#eaeaea';
                btn_prev.style.cursor = 'default';
                btn_next.style.background = '#fff';
                btn_next.style.cursor = 'pointer';
            }   
            if(page==spans.length){
                btn_next.style.background = '#eaeaea';
                btn_next.style.cursor = 'default';
            }
        }
    }

    // 上一页
    btn_prev.onclick = ()=>{
        
    }

})();

// 图片放大显示
tbody.onmousemove = function(e){
    var e = e || window.e;
    var target  = e.target || e.srcElement;
    if(target.className=='littleimg'){
        // console.log(target.nextElementSibling);
        target.nextElementSibling.style.opacity=1;
        target.onmouseleave = function(){
            target.nextElementSibling.style.opacity=0;
        }
    }
}

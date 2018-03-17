$(()=>{
    var offsetTop=$(".content>.row:first-child").offset().top;
   $(window).scroll(()=>{
       var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
       var tar=$(".content>.row:first-child");
       if($(window).width()>767){
           if(scrollTop>=offsetTop){
               tar.addClass("fixed");
               $(".item-detail").fadeOut();
           }else{
               tar.removeClass("fixed");
               $(".item-detail").fadeIn();
           }
       }
       else{
           if(tar.hasClass("fixed")){
               tar.removeClass("fixed");
           }
       }

   });
    var storage = localStorage.getItem( 'compare' );
    storage = storage ? JSON.parse( storage ) : [];
    console.log(storage,storage.length);
    //加载页面，发送异步请求
    $.ajax({
        type: "GET",
        url: 'data/watch_compare.php',
        data: {w1: storage[0], w2: storage[1]},
        success: function (res) {
            console.log(res);
            var html = '';
            var title='';
            if (res.length == 0) {

                $('#main').html(`<div class="col-sm-4 hidden-xs all-clear">
                                      <p>比较您喜爱的浪琴腕表</p>
                                      <p>请选择您想要比较的表款</p>
                                      <a href="">返回首页</a>
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                  <div class="add">
                                    <a href="#">+</a>
                                    <p>添加腕表</p>
                                  </div>
                                </div>
                                <div class="col-xs-6 col-sm-4">
                                  <div class="add">
                                    <a href="#">+</a>
                                    <p>添加腕表</p>
                                  </div>
                                </div>`);
                return;
            }
            $.each(res, function (i, w) {
                html += `<div class="col-xs-6 col-sm-4 item">
                            <a href="" class="del" data-wid="${w.wid}">x</a>
                            <a href=""><img src="${w.sm}" class="img-responsive"/></a>
                            <div class="item-detail">
                                <h4>${w.wname}</h4>
                                <p>${w.title}</p>
                                <span>￥${w.price}</span>
                            </div>
				        </div>
            `;
               //console.log(res);

            });
             title+=`<table>
                        <tr class="title-bg">
                          <td colspan="3">表壳</td>
                        </tr>
                        <tr>
                          <td>形状</td>
                          <td>${res[0]?res[0].shape:''}</td>
                          <td>${res[1]?res[1].shape:''}</td>
                        </tr>
                        <tr>
                          <td>材质</td>
                          <td>${res[0]?res[0].mater:''}</td>
                          <td>${res[1]?res[1].mater:''}</td>
                        </tr>
                        <tr>
                          <td>防水性能</td>
                          <td>${res[0]?res[0].deep:''}</td>
                          <td>${res[1]?res[1].deep:''}</td>
                        </tr>
                        <tr>
                          <td>尺寸</td>
                          <td>${res[0]?res[0].size:''}</td>
                          <td>${res[1]?res[1].size:''}</td>
                        </tr>
                         <tr>
                          <td>钻石</td>
                          <td>${res[0]?res[0].diamond:''}</td>
                          <td>${res[1]?res[1].diamond:''}</td>
                        </tr>
                        <tr class="title-bg">
                          <td colspan="3">表盘和指针</td>
                        </tr>
                        <tr>
                          <td>颜色</td>
                          <td>${res[0]?res[0].color:''}</td>
                          <td>${res[1]?res[1].color:''}</td>
                        </tr>
                        <tr>
                          <td>运行时间</td>
                          <td>${res[0]?res[0].runtime:''}</td>
                          <td>${res[1]?res[1].runtime:''}</td>
                        </tr>
                        <tr>
                          <td>指针</td>
                          <td>${res[0]?res[0].needle:''}</td>
                          <td>${res[1]?res[1].needle:''}</td>
                        </tr>
                       <tr class="title-bg">
                          <td colspan="3">机芯和功能</td>
                        </tr>
                        <tr>
                          <td>机芯类型</td>
                          <td>${res[0]?res[0].etype:''}</td>
                          <td>${res[1]?res[1].etype:''}</td>
                        </tr>
                        <tr>
                          <td>机芯</td>
                          <td>${res[0]?res[0].engine:''}</td>
                          <td>${res[1]?res[1].engine:''}</td>
                        </tr>
                        <tr>
                          <td>功能</td>
                          <td>${res[0]?res[0].func:''}</td>
                          <td>${res[1]?res[1].func:''}</td>
                        </tr>
                        <tr>
                          <td>计时码表机芯</td>
                          <td>${res[0]?res[0].tengine:''}</td>
                          <td>${res[1]?res[1].tengine:''}</td>
                        </tr>
                        <tr class="title-bg">
                          <td colspan="3">表带</td>
                        </tr>
                        <tr>
                          <td>材质</td>
                          <td>${res[0]?res[0].cmater:''}</td>
                          <td>${res[1]?res[1].cmater:''}</td>
                        </tr>
                        <tr>
                          <td>表扣</td>
                          <td>${res[0]?res[0].clasp:''}</td>
                          <td>${res[1]?res[1].clasp:''}</td>
                        </tr>
                    </table>`;
            if(res.length==1){
                 $('#main').html(`<div class="col-sm-4 hidden-xs all-clear">
                                      <p>比较您喜爱的浪琴腕表</p>
                                      <a href="">清除所有</a>
                                </div>${html}
                                <div class="col-xs-6 col-sm-4">
                                      <div class="add">
                                        <a href="#">+</a>
                                        <p>添加腕表</p>
                                      </div>
                                </div>`);
            }else{
            $('#main').html(`<div class="col-sm-4 hidden-xs all-clear">
                                            <p>比较您喜爱的浪琴腕表</p>
                                            <a href="">清除所有</a>
                                       </div>${html}`);
            }
            $(".title").html(title);

        }
    });
    //清除所有操作
    $("#main").on("click",".all-clear>a",function () {
        localStorage["compare"]=[];
    })
    //删除某一项
    $("#main").on("click",".item>.del",function () {
        if(storage[0]==$(this).data("wid")){
            storage.splice(0,1);
        }else{
            storage.splice(1,1);
        }
        localStorage.setItem( 'compare', JSON.stringify( storage ) );
    })
});
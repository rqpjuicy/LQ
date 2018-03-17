
    //显示列表
    //定义查询条件
    var order;
    var minPrice;
    var maxPrice;
    var sex;
    var engine;
    var size;
    var shape;
    var diamond;
    var color;
    var mater;
    var band;
    var deep;
    function loadList(){
      var search=location.search;
      //搜索页面根据表编号来查询
      if (search.indexOf("q")!=-1){
        var q=decodeURI(search.split("=")[1]);
        $(".keyword").html(q);
      }
      //更加系列名称来查询
      if (search.indexOf("f")!=-1){
        var f=decodeURI(search.split("=")[1]);
      }
      $('.search-list').html('<div class="loading"><img src="img/loading.gif" alt=""></div>');
      $.ajax({
          type:"GET",
          url: 'data/watch_list.php',
          data: {q,f,order,minPrice,maxPrice,sex,engine,size,shape,diamond,color,mater,band,deep},
          success: function(res){
          var html = '';
          if(res.length==0){$('.search-list').html("<p style='color:#000;font-size:3rem'>搜索无结果！</p>");return;}
          $.each(res, function(i, w){
            html += `<div class="item col-xs-12 col-sm-6 col-md-4">
                       <div class="add-fav"><a href="javascript:;" data-wid="${w.wid}"><span class="glyphicon glyphicon-heart-empty"></span><span>加入心愿单</span></a></div>
                       <div class="compare"><a href="javascript:;" data-wid="${w.wid}"><span class="glyphicon glyphicon-resize-horizontal"></span><span>${(w.wid==storage[0]||w.wid==storage[1])?"移除":"表款比较"}</span></a></div>
                       <a href=""><img src="${w.sm}"/></a>
                       <div class="item-detail">
                           <h4>${w.wname}</h4>
                           <p>${w.title}</p>
                           <span>￥${w.price}</span>
                       </div>
                       <div class="${(w.seq_new_arrival>0 || w.seq_top_sale>0)?'pro-sale':'pro-sale hide'}">${w.seq_new_arrival>0?"新品":"热销商品"}</div>
                   </div>
            `;
          //console.log(res);
          })
          $('.search-list').html(html);
          $(".fname").html(res[0].wname);

           $(".info>h1").html(res[0].wname);
           $(".small-view span").html(res[0].wname);
           $(".detail-desc h2").html(res[0].wname);
           //$(".banner>img").attr("src",'img/dp1/L3.276.4.16.6dp1.jpg');
       }
      })
    }
    loadList();
    //鼠标移入移出的效果
    $(".search-list").on("mouseenter",".item",function(){
            $(this).children().eq(2).css("border","4px solid #C7CCD0");
            $(this).children().eq(0).fadeIn();
            var that=$(this);
            setTimeout(function(){that.children().eq(1).fadeIn();},300);
    });
    $(".search-list").on("mouseleave",".item", function(){
            $(this).children().eq(2).css("border","4px solid #fff");
            $(this).children().eq(0).fadeOut();
            var that=$(this);
            setTimeout(function(){that.children().eq(1).fadeOut();},300);
    });
    //点击加入心愿单
    $(".search-list").on("click",".add-fav>a",function(){
        //判断是否已经登录
        //更新用户表心愿单字段 图标变为glyphicon glyphicon-heart
        $(this).children().eq(0).removeClass("glyphicon-heart-empty")
            .addClass("glyphicon-heart");
    });
    //页面加载时判断是否已经加入比较款
    var storage = localStorage.getItem( 'compare' );
    storage = storage ? JSON.parse( storage ) : [];
    //localStorage['compare']=[];
    //点击加入比较列表
    $(".search-list").on("click",".compare>a",function(){
        if($(this).children().eq(1).html()==="表款比较"){
            if(storage.length<2){
                storage.push( $(this).data("wid") );
                localStorage.setItem( 'compare', JSON.stringify( storage ) );
                $(this).children().eq(1).html("移除");
                //图标改变
            }else{
                alert("最多只能比较两款");
                return;
            }
            //console.log(localStorage['compare']);
        }else{
            if(storage[0]==$(this).data("wid")){
                storage.splice(0,1);
            }else{
                storage.splice(1,1);
            }
            localStorage.setItem( 'compare', JSON.stringify( storage ) );
            $(this).children().eq(1).html("表款比较");
            //图标改变
            //console.log(localStorage['compare']);
        }


    });
    //排序
      $(".dropdown>ul a").click(e=>{
        var $tar=$(e.target);
        order=$tar.data("order");
        $("#dropdownMenu>span").html($tar.html());
        //console.log(order);
        loadList();
      });

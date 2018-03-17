    
    $('.range-slider').jRange({
        from: 0,
        to: 50000,
        step: 1000,
        scale: [0,50000],
        format: '%s',
        width: 300,
        showLabels: false,
        showScale: true,
        isRange:true,
        onstatechange:function(){
            var val=this.getValue().split(",");
            val[0]=Number(val[0]);
            val[1]=Number(val[1]);
            minPrice=val[0]>=val[1]?val[1]:val[0];
            maxPrice=val[0]>=val[1]?val[0]:val[1];
            // $(".min").attr("data-min",minPrice);
            // $(".max").attr("data-max",maxPrice);
            //console.log(min,max);
            $(".min").html("￥"+ minPrice.toFixed(2));
            $(".max").html("￥"+ maxPrice.toFixed(2));
            loadList();
        }
    });
//$('.range-slider').jRange('setValue', '10,20');
//var m=$('.range-slider').jRange('getValue');
//alert(m);
    //点击i图标，显示详情系列详情
    $(".section .view-info").click(e=>{
        var tar=$(e.target);
        var optRow=tar.parent().parent().next();
        //optRow.toggle();
        if(optRow.is(":hidden")){
            tar.html("×");
            optRow.slideDown(1000);
            if(!optRow.next().is(":hidden")){
                optRow.next().hide();
                $(".section .condition-icon").html("")
                .addClass("glyphicon glyphicon-list");
            }
            if(!$(".dropdown ul").is(":hidden")){
                $(".dropdown ul").slideUp(500);
            }
        }else{
            optRow.slideUp(1000);
            tar.html("i");
            if(!$(".dropdown ul").is(":hidden")){
                $(".dropdown ul").slideUp(500);
            }
        }
    });
    //i图标改为系列名时，点击系列名显示系列详情介绍
    $(".view-info-sm").click(e=>{
        if($(".detail-desc").is(":hidden")){
            $(".detail-desc").slideDown(1000);
            if(!$(".detail-condition").is(":hidden")){
                $(".detail-condition").hide();
                $(".section .condition-icon").html("")
                .addClass("glyphicon glyphicon-list");
            }
            if(!$(".dropdown ul").is(":hidden")){
                $(".dropdown ul").slideUp(500);
            }
        }else{
            $(".detail-desc").slideUp(1000);
            if(!$(".dropdown ul").is(":hidden")){
                $(".dropdown ul").slideUp(500);
            }
        }
    });
    //点击条件选择图标，显示条件选择列表
    $(".section .condition-icon").click(function(e){
        //console.log(this);
        //var tar=$(e.target);
        //var optRow=tar.parent().parent().next().next();
        var optRow=$(this).parent().parent().next().next();
        if(optRow.is(":hidden")){
            $(this).removeClass("glyphicon-list")
            .addClass("glyphicon-remove");
            optRow.slideDown();
            if(!optRow.prev().is(":hidden")){
                optRow.prev().hide();
                $(".section .view-info").html("i");
            }
        }else{
            optRow.slideUp();
            $(this).removeClass("glyphicon-remove")
            .addClass("glyphicon-list");
        }
    });
    //radio选项的显示与隐藏
    $(".condition-right").on("click",".view-radio",e=>{
        var tar=$(e.target).next();
        if(tar.is(":hidden")){
            tar.show();
            $('.condition-left').css('height',$(".condition-right").height());
            //$('.condition-left').animate({height:$('.condition-right').height()},1000);
            $(e.target).removeClass("glyphicon-menu-right")
            .addClass("glyphicon-menu-down");
            
            
            //条件下拉框中左右两列相等
     //console.log($(".condition-right").height(),$(".condition-left").height());
    //$('.condition-left').css('height',$(".condition-right").height());
    //$('.condition-left').animate({height:$('.condition-right').height()},1000);
        }else{
            tar.hide();
            $('.condition-left').css('height',$(".condition-right").height());
            $(e.target).removeClass("glyphicon-menu-down")
            .addClass("glyphicon-menu-right");
        }

    });

    //点击下拉列表
    $("#dropdownMenu").click(function(e){
        $(this).next().slideToggle();
         e.stopPropagation();
    });
    //移入鼠标显示加入心愿单和比较
    // $(".search-list").on("mouseenter,mouseleave",".item",function(){
    //     $(this).children().eq(0).fadeIn();
    //     var that=$(this);
    //     setTimeout(function(){that.children().eq(1).fadeIn();},500);
        
    // })
    //点击页面的任何地方，列表隐藏
    $(document).click(function(){
         if(!$(".dropdown ul").is(":hidden")){
                $(".dropdown ul").slideUp(500);
            }
    });
    //点击radio按钮发送参数进行查询
    $(".condition-right input[type=radio]").click(e=>{
        e.stopPropagation();
        var tar=$(e.target);
        //console.log(tar.attr("name"));
        switch (tar.attr("name")){
            case "sex":sex=tar.val().trim();break;
            case "engine":engine=tar.val().trim();break;
            case "size":size=tar.val().trim();break;
            case "shape":shape=tar.val().trim();break;
            case "diamond":diamond=tar.val().trim();break;
            case "color":color=tar.val().trim();break;
            case "mater":mater=tar.val().trim();break;
            case "band":band=tar.val().trim();break;
            case "deep":deep=tar.val().trim();break;
        }
        //console.log(shape);
        loadList();
    });
    //清空所有的radio
    $(".condition-right .clear").click(e=>{
        $(".condition-right input[type=radio]").removeAttr("checked");
        sex=null;
        engine=null;
        size=null;
        shape=null;
        diamond=null;
        color=null;
        mater=null;
        band=null;
        deep=null;
        loadList();
    });
    // $(".search-list .item").hover(
    //     function(){
    //         $(this).children().eq(2).css("border","4px solid #C7CCD0");
    //         $(this).children().eq(0).fadeIn();
    //         var that=$(this);
    //         setTimeout(function(){that.children().eq(1).fadeIn();},300);
    //     },
    //     function(){
    //         $(this).children().eq(2).css("border","4px solid #fff");
    //         $(this).children().eq(0).fadeOut();
    //         var that=$(this);
    //         setTimeout(function(){that.children().eq(1).fadeOut();},300);
    //     }
    // );
    //鼠标移动banner图片的偏移
    // $(document).scroll(function(){
    //     $(".banner").css("margin-top","20px");
    // });
    // var agent = navigator.userAgent;
    // if (/.*Firefox.*/.test(agent)) {
    //     document.addEventListener("DOMMouseScroll", function(e) {
    //         e = e || window.event;
    //         var detail = e.detail;
    //         if (detail > 0) {
    //             $(".banner>img").css("margin-top","140px");
    //         } else {
    //            $(".banner>img").css("margin-top","-140px");
    //         }
    //     });
    // } else {
    //     document.onmousewheel = function(e) {
    //         e = e || window.event;
    //         var wheelDelta = e.wheelDelta;
    //         if (wheelDelta > 0) {
    //             $(".banner>img").css("margin-top","-140px");
    //         } else {
    //             $(".banner>img").css("margin-top","140px");
    //         }
    //     }
    // }

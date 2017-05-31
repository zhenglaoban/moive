/**
 * Created by J on 2017/2/12.
 */
(function (angular) {
    //创建http服务
    var app=angular.module('httpApp',[]);
    app.service('jsonpService',[function () {
        this.getJSONP=function (url,params,func) {
            //1 拼凑链接
            // 1.1 生成一个随机的jsonp名字
            //2 创建script标签将链接放入到src
            //3 接收jsonp方法
            //4 将创建好的script标签插入到页面上去
            var strUrl=url+'?';
            //遍历对象
            for(var key in params){
                strUrl+=key+'='+params[key]+'&'
            }
            //随机的jsonp名字
            var jsonpname='jsonp_'+Math.random().toString().substring(2);
            strUrl+='callback='+jsonpname;
            //创建script标签
            var script=document.createElement('script');
            script.src=strUrl;
            //jsonp方法
            window[jsonpname]=function (data) {
                //通过回调函数将参数传递出去
                func(data);
                //销毁script标签
                document.body.removeChild(script);
            };
            //创建的script标签添加到body中
            document.body.appendChild(script);
        }
    }]);
})(angular);
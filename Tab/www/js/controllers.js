angular.module('starter.controllers', ['ngCordova'])

/*.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})*/
.controller('DeviceCtrl',['$scope','$cordovaDevice', function($scope, $cordovaDevice) {

    document.addEventListener("deviceready", function () {

        $scope.device = $cordovaDevice.getDevice();
        //$scope.cordova = $cordovaDevice.getCordova();
        $scope.manufacturer=$cordovaDevice.getManufacturer();
        $scope.model = $cordovaDevice.getModel();
        $scope.platform = $cordovaDevice.getPlatform();
        $scope.uuid = $cordovaDevice.getUUID();
        $scope.version = $cordovaDevice.getVersion();

    }, false);
}])

 .controller( 'ClickCtrl',['$scope','$ionicPopover','$timeout',function($scope,$ionicPopover,$timeout){
        $scope.popover = $ionicPopover.fromTemplateUrl('choice.html', {
            scope: $scope
        });
        // .fromTemplateUrl() 方法
        $ionicPopover.fromTemplateUrl('choice.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;

        });
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        // 清除浮动框
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // 在隐藏浮动框后执行
        $scope.$on('popover.hidden', function() {
            // 执行代码
        });
        // 移除浮动框后执行
        $scope.$on('popover.removed', function() {
            // 执行代码
        });
    }])

.controller('CttmCtrl', ['$scope','$http',function($scope,$http) {
    $scope.inputText = "";
    $scope.results = [];
    $scope.abouts = [];
    $scope.resultsSize = 0;
    $scope.aboutsSize = 0;
    $scope.results2 = [];
    $scope.hshow=false;//“翻译”显示
    $scope.hshow1=false;//“相关词条”显示
    $scope.hload=false;//加载动画显示
    $scope.submit = function(){
        $scope.hswitch = false;//结果显示
        if($scope.inputText==""){
            alert("请输入关键词进行查询");
            return;
        }
        $scope.hload=true;
        $http({
            method: 'POST',
            url: 'http://dicsv.mglip.com/DicAndroidSer/Service1.svc/dic/appDictionary',
            params: {'regular':'汉蒙' , 'inputStr':$scope.inputText,userName:'lichunhui',passWord:'123456'
                }

        })
            .success(function (date) {

                $scope.results = [];
                $scope.abouts = [];
                $scope.resultsSize= 0;
                $scope.aboutsSize = 0;
                if(date['dictionary']==null){
                    alert("未查到结果")
                }else{
                    date.dictionary.forEach(function (e) {
                        if(e.chinese==$scope.inputText||e.chinese==$scope.inputText+' '){
                            $scope.resultsSize ++;
                            $scope.results.push(e);
                        }else {
                            $scope.aboutsSize ++;
                            $scope.abouts.push(e);
                        }
                    });
                }
               //console.log( $scope.abouts);
                $scope.hload=false;
                $scope.hswitch = true;
                if($scope.resultsSize!=0){
                    $scope.hshow=true;
                }else {
                    $scope.hshow=false;
                }
                if($scope.aboutsSize!=0){
                    $scope.hshow1=true;
                }else {
                    $scope.hshow1=false;
                }
            })
            .error(function () {
                alert("查询失败");
                $scope.hload = false;
            });
    };
}])

 .controller('CtwmCtrl', ['$scope','$http',function($scope,$http) {
        $scope.inputText = "";
        $scope.results = [];
        $scope.abouts = [];
        $scope.resultsSize = 0;
        $scope.aboutsSize = 0;
        $scope.results2 = [];
       // $scope.hchange=false;//结果显示
        $scope.cshow=false;//“翻译”显示
        $scope.cshow1=false;//“相关词条”显示
        $scope.cload=false;//加载动画显示
        $scope.submit = function(){
            $scope.hchange=false;//结果显示
           // console.log($scope.inputText);
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }

                $scope.cload = true;
                $http({
                    method: 'POST',
                    url: 'http://dicsv.mglip.com/DicAndroidSer/Service1.svc/dic/appDictionary',
                    params: {'regular': '汉新', 'inputStr': $scope.inputText, userName: 'lichunhui', passWord: '123456'
                    }

                })
                    .success(function (date) {

                        $scope.results = [];
                        $scope.abouts = [];
                        $scope.resultsSize = 0;
                        $scope.aboutsSize = 0;
                        if (date['dictionary'] == null) {

                            alert("未查到结果")


                        } else {
                            date.dictionary.forEach(function (e) {
                                if (e.chinese == $scope.inputText || e.chinese == $scope.inputText + ' ') {
                                    $scope.resultsSize++;
                                    $scope.results.push(e);
                                } else {
                                    $scope.aboutsSize++;
                                    $scope.abouts.push(e);
                                }
                            });
                            $scope.hchange = true;
                            if ($scope.resultsSize != 0) {
                                $scope.cshow = true;
                            } else {
                                $scope.cshow = false;
                            }
                            if($scope.aboutsSize!=0){
                                $scope.cshow1=true;
                            }else{
                                $scope.cshow1=false;
                            }
                            $scope.cload = false;
                        }
                        // console.log( $scope.abouts);

                    })
                    .error(function () {
                        alert("查询失败");
                        $scope.isLoading = false;
                    });

        };

    }])

 .controller('TmtcCtrl', ['$scope','$http',function($scope,$http) {
        $scope.mshow=false;//“翻译”控制
        $scope.mshow1=false;//“相关词条”显示
        $scope.mload=false;//加载动画控制
        $scope.mswitch=false;//结果控制
        $scope.inputText = "";
        $scope.results = [];
        $scope.abouts = [];
        $scope.resultsSize = 0;
        $scope.aboutsSize = 0;
        $scope.results2 = [];
        $scope.checkEnter = function (e) {

            var et=e||window.event;
            var keycode=et.charCode||et.keyCode;
            if(keycode==13)
            {
                $scope.submit();
                if(window.event)
                    window.event.returnValue = false;
                else
                    e.preventDefault();//for firefox
            }
        };
        $scope.submit = function(){
            $scope.mswitch=false;
            var input = document.getElementById('inputVertical');
            $scope.inputText = input.innerText;
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
            $scope.mload=true;
            $scope.results = [];
            $scope.abouts = [];
            $scope.resultsSize = 0;
            $scope.aboutsSize = 0;
            $scope.results2 = [];
            $http({
                method: 'POST',
                url: 'http://dicsv.mglip.com/DicAndroidSer/Service1.svc/dic/appDictionary',
                params: {'regular':'蒙汉' , 'inputStr':$scope.inputText,userName:'lichunhui',passWord:'123456'
                }

            })
                .success(function (date) {

                    if(date['dictionary']==null){
                        alert("未查到结果")
                    }else{
                        date.dictionary.forEach(function (e) {
                            $scope.results2.push(e);
                            if(e.mogInteCode==$scope.inputText||e.mogInteCode==$scope.inputText+' '){
                                $scope.resultsSize ++;
                                $scope.results.push(e);
                            }else {
                                $scope.aboutsSize ++;
                                $scope.abouts.push(e);
                            }
                        });
                    }
                    $scope.mswitch=true;
                    $scope.mload=false;
                    if($scope.resultsSize!=0){
                        $scope.mshow=true;
                    }else{
                        $scope.mshow=false;
                    }
                    if($scope.aboutsSize!=0){
                        $scope.mshow1=true;
                    }else{
                        $scope.mshow1=false;
                    }

                })
                .error(function () {
                    alert("查询失败");
                });
            //var response = {"d":[{"__type":"Dictionary","id":0,"chinese":"吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"гэдэс гарах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"吃饱;饱足 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цадах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"使之吃饱;让人吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цатгах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0}]};
        };
    }])

 .controller('WmtcCtrl', ['$scope','$http',function($scope,$http) {
        $scope.wshow=false;//“翻译”显示
        $scope.wshow1=false;//“相关词条”显示
        $scope.wchange=false;//结果显示
        $scope.wload=false;//加载动画显示
        $scope.inputText = "";
        $scope.results = [];
        $scope.aboutss = [];
        $scope.resultsSize = 0;
        $scope.aboutssSize = 0;
        $scope.submit = function() {
            $scope.wchange=false;
            if ($scope.inputText == "") {
                alert("请输入关键词进行查询");
                return;
            }
         $scope.wload=true;
            $http({
                method: 'POST',
                url: 'http://dicsv.mglip.com/DicAndroidSer/Service1.svc/dic/appDictionary',
                params: {'regular':'新汉' , 'inputStr':$scope.inputText,userName:'lichunhui',passWord:'123456'
                }

            })
                .success(function (date) {
                    $scope.results = [];
                    $scope.aboutss = [];
                    $scope.resultsSize = 0;
                    $scope.aboutssSize = 0;
                    if (date['dictionary']==null) {
                        alert("未查到结果")
                    } else {
                        date.dictionary.forEach(function (e) {
                            if (e.newMog.trim() == $scope.inputText.trim()) {
                                $scope.resultsSize ++;
                                $scope.results.push(e);
                            } else {

                                $scope.aboutssSize ++;
                                $scope.aboutss.push(e);
                            }
                        });
                    }
                 $scope.wchange=true;
                    if($scope.resultsSize!=0){
                        $scope.wshow=true;
                    }else{
                        $scope.wshow=false;
                    }
                    if($scope.aboutssSize!=0){
                        $scope.wshow1=true;
                    }else{
                        $scope.wshow1=false;
                    }
                    $scope.wload=false;
                })
                .error(function () {
                    alert("查询失败");

                });
                };
    }]);

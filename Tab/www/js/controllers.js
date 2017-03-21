angular.module('starter.controllers', [])

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
    $scope.hswitch = false;
    $scope.hshow=false;
    $scope.hload=false;
    $scope.submit = function(){
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
                $scope.hswitch = true;
                if($scope.results!=null){
                    $scope.hshow=true;
                }else {
                    $scope.hshow=false;
                }
                $scope.hload=false;
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
        $scope.hchange=false;
        $scope.cshow=false;
        $scope.submit = function(){

            console.log($scope.inputText);
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
            $http({
                method: 'POST',
                url: 'http://dicsv.mglip.com/DicAndroidSer/Service1.svc/dic/appDictionary',
                params: {'regular':'汉新' , 'inputStr':$scope.inputText,userName:'lichunhui',passWord:'123456'
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
                    // console.log( $scope.abouts);
                    $scope.hchange=true;
                    if($scope.results!=null){
                        $scope.cshow=true;
                    }else{
                        $scope.cshow=false;
                    }
                })
                .error(function () {
                    alert("查询失败");
                    $scope.isLoading = false;
                });

        };

    }])

 .controller('TmtcCtrl', ['$scope','$http',function($scope,$http) {
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
        $scope.mshow=false;
        $scope.mswitch=false;
        $scope.inputText = "";
        $scope.results = [];
        $scope.abouts = [];
        $scope.resultsSize = 0;
        $scope.aboutsSize = 0;
        $scope.results2 = [];
        $scope.submit = function(){
            var input = document.getElementById('inputVertical');
            $scope.inputText = input.innerText;
            if($scope.inputText==""){
                alert("请输入关键词进行查询");
                return;
            }
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
                    if($scope.results!=null){
                       $scope.mshow=true;
                    }else{
                        $scope.mshow=false;
                    }

                })
                .error(function () {
                    alert("查询失败");
                });
            //var response = {"d":[{"__type":"Dictionary","id":0,"chinese":"吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"гэдэс гарах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"吃饱;饱足 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цадах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0},{"__type":"Dictionary","id":0,"chinese":"使之吃饱;让人吃饱 ","mogInteCode":" ","source":null,"character":null,"mogMekcode":null,"mogLatin":null,"mogLatinAlert":null,"mogInteAlert":null,"classify":null,"english":null,"newMog":"цатгах ","oldMogExplain":null,"newMogExplain":null,"mogIntelletualCode":null,"mogMongoliaCode":null,"middleEncode":null,"chineseCount":0}]};
        };
    }])

 .controller('WmtcCtrl', ['$scope','$http',function($scope,$http) {
        $scope.wshow=false;
        $scope.wchange=false;
        $scope.inputText = "";
        $scope.results = [];
        $scope.aboutss = [];
        $scope.submit = function() {
            if ($scope.inputText == "") {
                alert("请输入关键词进行查询");
                return;
            }

            $http({
                method: 'POST',
                url: 'http://dicsv.mglip.com/DicAndroidSer/Service1.svc/dic/appDictionary',
                params: {'regular':'新汉' , 'inputStr':$scope.inputText,userName:'lichunhui',passWord:'123456'
                }

            })
                .success(function (date) {
                    $scope.results = [];
                    $scope.aboutss = [];
                    if (date['dictionary']==null) {
                        alert("未查到结果")
                    } else {
                        date.dictionary.forEach(function (e) {
                            if (e.newMog.trim() == $scope.inputText.trim()) {
                                $scope.results.push(e);
                            } else {
                                $scope.aboutss.push(e);
                            }
                        });
                    }
                 $scope.wchange=true;
                    if($scope.results!=null){
                        $scope.wshow=true;
                    }else{
                        $scope.wshow=false;
                    }
                })
                .error(function () {
                    alert("查询失败");

                });
                };
    }]);

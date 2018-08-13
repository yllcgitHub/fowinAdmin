// by: xianghongai@gmail.com
$(document).ready(function() {
    $(".J_FilterArea").each(function(index, element) {

        // 是否已选
        var selectProvince = false;
        var selectCity = false;
        var selectCounty = false;

        // 各元素
        var $this = $(this);
        var $selectAll = $this.find(".filter-select-all");
        var $popupItem = $this.find(".popup-area");

        var $province = $this.find(".J_Province");
        var $city = $this.find(".J_City");
        var $county = $this.find(".J_County");

        var $provinceName = $province.find(".province-name");
        var $cityName = $city.find(".city-name");
        var $countyName = $county.find(".county-name");

        var $provincePanel = $this.find(".J_ProvincePanel");
        var $cityPanel = $this.find(".J_CityPanel");
        var $countyPanel = $this.find(".J_CountyPanel");

        var $provinceItem;
        var $cityItem;
        var $countyItem;

        // JSON数据
        // 模拟数据：common/address/address_all.mi.js
        var data = cnAreaData;

        function CityResponse() {
            var hasCls = $city.hasClass("popup-active");
            // 省区是否已选
            if (selectProvince) {
                $province.removeClass("popup-active");
                // 自身是否激活状态
                if (!hasCls) {
                    $city.addClass("popup-active");
                    $county.removeClass("popup-active");
                } else {
                    $city.removeClass("popup-active");
                }
            } else {
                $province.addClass("popup-active");
            }
        }

        function CountyResponse() {
            var hasCls = $county.hasClass("popup-active");
            // 省区是否已选
            if (selectProvince) {
                $province.removeClass("popup-active");
                // 市区是否已选
                if (selectCity) {
                    $city.removeClass("popup-active");
                    // 自身是否激活状态
                    if (!hasCls) {
                        $county.addClass("popup-active");
                    } else {
                        $county.removeClass("popup-active");
                    }
                } else {
                    $city.addClass("popup-active");
                }
            } else {
                $province.addClass("popup-active");
            }
        }

        var provinceID = 0;
        var cityID = 0;
        var countyID = 0;

        // 初始化省
        function initProvince() {
            var option = '';
            for (var k in data) {
                option += '<li class="list-area-item province-item" data-province-id="' + data[k]['id'] + '">' + data[k]['name'] + '</li>';
            }
            $provincePanel.empty();
            $(option).appendTo($provincePanel);
            $provinceItem = $provincePanel.find(".province-item");

            // 点击省份，市区数据响应
            $provinceItem.on("click", function(event) {
                // 阻止事件冒泡
                // event.stopPropagation();
                var $item = $(this);
                initCity();
                initCounty();
                // 设置市区
                provinceID = $item.data("province-id");
                setCity($item.data("province-id"));
                selectProvince = true;
                // 省隐藏，市出现
                $province.removeClass("popup-active").addClass("active");
                $selectAll.removeClass("active");
                $provinceName.text($item.text());
                $city.addClass("popup-active");
                areaId = provinceID;
                getactivityList(activityCategory, activityStatus);
            });
        }

        $(".J_ProvincePanel").on("click", ".province-item", function() {
            console.log("点击省");
            provinceID = $(this).data("province-id");
            console.log(provinceID);
        });


        // 初始化市
        function initCity() {
            $city.removeClass("active");
            $cityName.text("市");
            $cityPanel.empty();
        }

        // 初始化县
        function initCounty() {
            $county.removeClass("active");
            $countyName.text("区/县");
            $countyPanel.empty();
        }

        // 设置市区
        function setCity(ProvinceID) {
            var option = '';
            for (var k in data) {
                if (data[k]['id'] == ProvinceID) {
                    var child = data[k]['child'];
                    for (var s in child) {
                        option += '<li class="list-area-item city-item" data-city-id="' + child[s]['id'] + '" data-province-id="' + ProvinceID + '">' + child[s]['name'] + '</li>';
                    }
                }
            }
            $cityPanel.empty();
            $(option).appendTo($cityPanel);
            $cityItem = $cityPanel.find(".city-item");

            // 点击市区，县区数据响应
            $cityItem.on("click", function(event) {
                // 阻止事件冒泡
                // event.stopPropagation();
                var $item = $(this);
                initCounty();
                // 设置县区
                cityID = $item.data("city-id");
                setCounty($item.data("province-id"), $item.data("city-id"));
                $cityName.text($item.text());
                selectCity = true;
                // 市隐藏，县出现
                $city.removeClass("popup-active").addClass("active");
                $cityName.text($item.text());
                $county.addClass("popup-active");
                areaId = cityID;
                getactivityList(activityCategory, activityStatus);
            });
        }

        // 设置县区
        function setCounty(ProvinceID, CityID) {
            var option = '';
            for (var k in data) {
                if (data[k]['id'] == ProvinceID) {
                    var child = data[k]['child'];
                    for (var s in child) {
                        if (child[s]['id'] == CityID) {
                            var _child = child[s]['child'];
                            for (var ss in _child) {
                                option += '<li class="list-area-item county-item" data-zipcode="' + _child[ss]['zipcode'] + '" data-county-id="' + _child[ss]['id'] + '" data-city-id="' + CityID + '" data-province-id="' + ProvinceID + '">' + _child[ss]['name'] + '</li>';
                            }
                        }
                    }
                }
            }
            $countyPanel.empty();
            $(option).appendTo($countyPanel);
            $countyItem = $countyPanel.find(".county-item");

            // 县区数据响应
            $countyItem.on("click", function(event) {
                // 阻止事件冒泡
                // event.stopPropagation();
                var $item = $(this);
                selectCounty = true;
                // 县隐藏，整个联动流程成功完成
                countyID = $item.data("county-id");
                $county.removeClass("popup-active").addClass("active");
                $countyName.text($item.text());
            });
        }

        // 默认注入省份
        initProvince();

        $selectAll.on("click", function() {
            selectProvince = false;
            selectCity = false;
            selectCounty = false;
            $(this).addClass("active").siblings(".item").removeClass("popup-active active");
            // 初始化地区联动
            $provinceName.text("省");
            initCity();
            initCounty();
        });

        // $popupItem.on("mouseleave", function() {
        //     // 影响下一级地区显示事件
        //     // $(this).removeClass("popup-active");
        // });

        // $province.on("mouseenter", function() {
        //     $province.addClass("popup-active");
        //     $city.removeClass("popup-active");
        //     $county.removeClass("popup-active");
        // });

        // 鼠标进入城市, 如果已经选择省, 就提示选择市; 如果没有选择省, 提示选择省
        // $city.on("mouseenter", function() {
        //     CityResponse();
        // });

        // $county.on("mouseenter", function() {
        //     CountyResponse();
        // });


        $province.on({
            mouseenter: function() {
                $province.addClass("popup-active").data("enter", 1);
            },
            mouseleave: function() {
                $province.removeClass("popup-active").data("enter", 0);
                if (selectProvince) {
                    $city.addClass("popup-active");
                }
            }
        });


        $city.on({
            mouseenter: function() {
                var hasCls = $city.hasClass("popup-active");
                // 省区是否已选
                if (selectProvince) {
                    $province.removeClass("popup-active");
                    // 自身是否激活状态
                    if (!hasCls) {
                        $city.addClass("popup-active");
                        $county.removeClass("popup-active");
                    } else {
                        $city.removeClass("popup-active");
                    }
                } else {
                    // 省没选择
                    $province.addClass("popup-active");
                }
            },
            mouseleave: function() {
                if (selectProvince) {
                    if (selectCity) {
                        $county.addClass("popup-active");
                        // 怎么关闭市
                    } else {
                        $city.removeClass("popup-active");
                    }
                } else {
                    $province.mouseenter();
                }
                // 怎么关闭省
            }
        });

        $county.on({
            mouseenter: function() {
                var hasCls = $county.hasClass("popup-active");
                // 省区是否已选
                if (selectProvince) {
                    $province.removeClass("popup-active");
                    // 市区是否已选
                    if (selectCity) {
                        $city.removeClass("popup-active");
                        // 自身是否激活状态
                        if (!hasCls) {
                            $county.addClass("popup-active");
                        } else {
                            $county.removeClass("popup-active");
                        }
                    } else {
                        $city.addClass("popup-active");
                    }
                } else {
                    $province.addClass("popup-active");
                }
            },
            mouseleave: function() {

            }
        });

        // $city.on("click", function() {
        //     CityResponse();
        // });

        // $county.on("click", function() {
        //     CountyResponse();
        // });
    });
});

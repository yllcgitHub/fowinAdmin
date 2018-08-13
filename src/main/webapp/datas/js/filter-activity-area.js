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
        var provinceName = "";
        var cityName = "";
        var countyName = "";

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
                provinceName = $item.text();

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
                cityName = $item.text();

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
                countyID = $item.data("county-id");
                countyName = $item.text();
                selectCounty = true;
                // 县隐藏，整个联动流程成功完成
                $county.removeClass("popup-active").addClass("active");
                $countyName.text($item.text());
                areaId = countyID;
                getactivityList(activityCategory, activityStatus);
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

            provinceID = 0;
            cityID = 0;
            countyID = 0;
            provinceName = "";
            cityName = "";
            countyName = "";
        });

        $province.on({
            mouseenter: function() {
                // 本层进入状态为自身进入, 显示
                $province.addClass("popup-active").attr("data-enter", 1);
            },
            mouseleave: function() {
                // 从本层离开, 隐藏
                $province.removeClass("popup-active").attr("data-enter", 0);
                // 离开时,
                if ($city.attr("data-enter") !== 1) {
                    $city.removeClass("popup-active");
                }
            }
        });

        $city.on({
            mouseenter: function() {
                // 本层进入状态为自身进入
                $city.attr("data-enter", 1);
                var hasCls = $city.hasClass("popup-active");
                // 省区是否已选
                if (selectProvince) {
                    $province.removeClass("popup-active");
                    // 自身是否激活状态
                    if (!hasCls) {
                        $city.addClass("popup-active");
                        $county.removeClass("popup-active").attr("data-enter", 0);
                    }
                } else {
                    // 省没选择
                    $province.addClass("popup-active").attr("data-enter", 2);
                }
            },
            mouseleave: function() {
                $city.removeClass("popup-active").attr("data-enter", 0);
                // 上一层级
                if ($province.attr("data-enter") !== 1) {
                    $province.removeClass("popup-active");
                }
            }
        });

        $county.on({
            mouseenter: function() {
                $county.attr("data-enter", 1);
                var hasCls = $county.hasClass("popup-active");
                // 省区是否已选
                if (selectProvince) {
                    // 市区是否已选
                    if (selectCity) {
                        // 自身是否激活状态
                        if (!hasCls) {
                            $county.addClass("popup-active");
                        }
                    } else {
                        // 市区没选择
                        $city.addClass("popup-active").attr("data-enter", 2);
                    }
                } else {
                    // 省份没选择
                    $province.addClass("popup-active").attr("data-enter", 2);
                }
            },
            mouseleave: function() {
                $county.removeClass("popup-active").attr("data-enter", 0);
                if (selectProvince) {
                    if ($city.attr("data-enter") !== 1) {
                        $city.removeClass("popup-active").attr("data-enter", 0);
                    }
                } else {
                    if ($province.attr("data-enter") !== 1) {
                        $province.removeClass("popup-active").attr("data-enter", 0);
                    }
                }
            }
        });

        $(".J_ProvincePanel").on("click", ".province-item", function() {
            console.log("省:" + provinceID + "/" + provinceName);
        });

        $(".J_CityPanel").on("click", ".city-item", function() {
            console.log("市:" + cityID + "/" + cityName);
        });

        $(".J_CountyPanel").on("click", ".county-item", function() {
            console.log("县:" + countyID + "/" + countyName);
        });

    });
});

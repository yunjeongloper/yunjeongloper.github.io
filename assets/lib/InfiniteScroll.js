'use strict';

var pageLink = document.getElementsByClassName("page-link");
var navbar = document.getElementsByClassName("site-header");
var home = document.getElementsByClassName("galaxy-square");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfiniteScroll = function () {
    function InfiniteScroll(path, wrapperId) {
        _classCallCheck(this, InfiniteScroll);

        if (path === undefined || wrapperId === undefined) throw Error('no parameter.');
        this.path = path;
        this.pNum = 2;
        this.wNode = document.getElementById(wrapperId);
        this.wrapperId = wrapperId;
        this.enable = true;

        this.detectScroll();
    }

    _createClass(InfiniteScroll, [{
        key: 'detectScroll',
        value: function detectScroll() {
            var _this = this;

            window.onscroll = function (ev) {
                var navHeight = navbar[0].offsetHeight;
                var homeHeight = (home[0] === undefined)? -10 : home[0].offsetHeight;

                if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) _this.getNewPost();
                if (window.pageYOffset + navHeight >= homeHeight) {
                    navbar[0].classList.add('background-seashell', 'borderbottom-1');
                    for(var i = 0; i < pageLink.length; i ++ ) {
                        pageLink[i].classList.add('color-black');
                    }
                } else {
                    navbar[0].classList.remove('background-seashell', 'borderbottom-1');
                    for(var i = 0; i < pageLink.length; i ++ ) {
                        pageLink[i].classList.remove('color-black');
                    }
                }
            };
        }
    }, {
        key: 'getNewPost',
        value: function getNewPost() {
            var _this2 = this;

            if (this.enable === false) return false;
            this.enable = false;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        _this2.pNum++;
                        var childItems = _this2.getChildItemsByAjaxHTML(xmlhttp.responseText);
                        _this2.appendNewItems(childItems);
                    }
                    return _this2.enable = true;
                }
            };
            xmlhttp.open("GET", location.origin + this.path + this.pNum, true);
            xmlhttp.send();
        }
    }, {
        key: 'getChildItemsByAjaxHTML',
        value: function getChildItemsByAjaxHTML(HTMLText) {
            var newHTML = document.createElement('html');
            newHTML.innerHTML = HTMLText;
            var childItems = newHTML.querySelectorAll('#' + this.wrapperId + ' > *');
            return childItems;
        }
    }, {
        key: 'appendNewItems',
        value: function appendNewItems(items) {
            var _this3 = this;

            items.forEach(function (item) {
                _this3.wNode.appendChild(item);
            });
        }
    }]);

    return InfiniteScroll;
}();
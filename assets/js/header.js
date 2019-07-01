(function () {

    var pageLink = document.getElementsByClassName("page-link");
    var navbar = document.getElementsByClassName("site-header");
    var home = document.getElementsByClassName("galaxy-square");

    window.onscroll = function() {changeNavStyle()};

    function changeNavStyle() {
        var navHeight = navbar[0].offsetHeight;
        var homeHeight = (home[0] === undefined)? -10 : home[0].offsetHeight;

        if (window.pageYOffset + navHeight >= homeHeight) {
            navbar[0].classList.add('background-white', 'borderbottom-1');
            for(var i = 0; i < pageLink.length; i ++ ) {
                pageLink[i].classList.add('color-black');
            }
        } else {
            navbar[0].classList.remove('background-white', 'borderbottom-1');
            for(var i = 0; i < pageLink.length; i ++ ) {
                pageLink[i].classList.remove('color-black');
            }
        }
    }

})();
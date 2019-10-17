document.addEventListener('DOMContentLoaded', function () {
    // document.documentElement.insertBefore(document.querySelector('.' + $pageRootClassName + '__shadows'), document.body.nextSibling);

    var mainLinks = document.querySelectorAll('.main__link');

    for (var i = 0, c = mainLinks.length; i < c; i++) {
        prepareLink(i)
    }

    function qwe(obj, dir) {
        obj.step = obj.step || 0;
        var coef = 5;

        obj.timer = requestAnimationFrame(function () {
            obj.xTranslate += (dir ? 1 : -1) * coef
            obj.style.transform = 'translateX(' + obj.xTranslate + 'px)';

            if (dir) {
                var objLastChild = obj.lastChild;
                if (objLastChild.getBoundingClientRect().left > window.innerWidth) {
                    obj.insertBefore(objLastChild, obj.firstChild);
                    // obj.xTranslate += -1 * objLastChild.getBoundingClientRect().width;
                    obj.xTranslate += -1 * parseFloat(window.getComputedStyle(objLastChild).getPropertyValue('width'));
                    // console.log(objLastChild.getBoundingClientRect().width, parseFloat(window.getComputedStyle(objLastChild).getPropertyValue('width')))
                    obj.style.transform = 'translateX(' + obj.xTranslate + 'px)';
                    obj.step = 0;
                }
            } else {
                var objFirstChild = obj.firstChild;
                if (objFirstChild.getBoundingClientRect().right < 0) {
                    obj.appendChild(objFirstChild);
                    // obj.xTranslate += objFirstChild.getBoundingClientRect().width;
                    obj.xTranslate += parseFloat(window.getComputedStyle(objFirstChild).getPropertyValue('width'));
                    obj.style.transform = 'translateX(' + obj.xTranslate + 'px)';
                    obj.step = 0;
                }
            }

            // for (var i = 0, c = obj.childNodes.length; i < c; i++) {
            //     var rect = obj.childNodes[i].getBoundingClientRect();
            //     obj.childNodes[i].style.color = '';

            //     if (rect.left > 0 && rect.right < window.innerWidth) {
            //         obj.childNodes[i].style.color = 'red';
            //     }
            // }

            qwe(obj, dir);
        }, 20);
    }

    function getDir(i) {
        // return i % 2 == 0;
        return true;
    }

    function prepareLink(i) {
        // console.log(mainLinks[i].getBoundingClientRect().width);
        var linkLabel = mainLinks[i].querySelector('.main__label');

        var l = 2;
        var m = l;
        while (l > 0) {
            // var tt1 = linkLabel.cloneNode(true);
            // tt1.setAttribute('i', i + 'right')
            var tt2 = linkLabel.cloneNode(true);
            tt2.setAttribute('i', i + 'left')
            // mainLinks[i].appendChild(tt1);
            mainLinks[i].insertBefore(tt2, linkLabel);
            l--;
        }

        // linkLabel.style.color = 'red';
        // console.log(linkLabel.getBoundingClientRect().width)
        // mainLinks[i].style.left = (-1 * linkLabel.getBoundingClientRect().width * m) + 'px';
        mainLinks[i].xTranslate = -1 * linkLabel.getBoundingClientRect().width * m;
        mainLinks[i].style.transform = 'translateX(' + mainLinks[i].xTranslate + 'px)';

        var dir = getDir(i);
        mainLinks[i].addEventListener('mouseover', function () {
            qwe(this, dir);
            // this.parentNode.classList.add('main__item_state_hover');
        }, window.passiveSupported ? { passive: true } : false);

        mainLinks[i].addEventListener('mouseout', function () {
            if (this.timer) {
                // clearTimeout(this.timer);
                cancelAnimationFrame(this.timer);
            }

            this.parentNode.classList.remove('main__item_state_hover');
        }, window.passiveSupported ? { passive: true } : false);
    }
}, window.passiveSupported ? { passive: true } : false);

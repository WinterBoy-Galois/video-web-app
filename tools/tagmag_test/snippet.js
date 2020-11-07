var tagmagCssPath = 'http://tagpin.co.uk/Scripts/tagging/snippet.min.css';
var tagMagGetImageTagsService = 'http://tagpin.co.uk/services/getimagetags';
var tagmagPopupIframe = 'http://tagpin.co.uk/embed/popup?publisherid=' + tagmagPublisherID + '&src=';
var tagmagUserRights = 'http://tagpin.co.uk/services/getuserrights';
var tagmagDeleteTag = 'http://tagpin.co.uk/services/deletetag';
var tagmagCreateTagUrl = 'http://tagpin.co.uk/embed/createtag';
var tagmagUpdatePageView = 'http://tagpin.co.uk/services/updatepageviews';
var tagmagSnippetUrl = '//tagpin.co.uk/scripts/tagging/snippet.min.js';

//overall page views counter
callTheJsonp(tagmagUpdatePageView + "?publisherid=" + tagmagPublisherID);

var tagmagHasRightToAddTag = 'false';
var tagmagTagIcon = '';

var tagmagBrowser = (function () {
    var N = navigator.appName, ua = navigator.userAgent, tem;
    var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
    M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
    return M;
})();

var tagmagIsTouchScreen = (function () {
    return !!('ontouchstart' in window) // works on most browsers
      || !!('onmsgesturechange' in window); // works on ie10
})();

if (tagmagBrowser[0] === "Chrome") {
    tagmagBrowser.IsChrome = true;
}
else {
    tagmagBrowser.IsChrome = false;
}

if (tagmagBrowser[0] === "Firefox") {
    tagmagBrowser.IsFF = true;
}
else {
    tagmagBrowser.IsFF = false;
}

if (tagmagBrowser[0] === "Safari") {
    tagmagBrowser.IsSafari = true;
}
else {
    tagmagBrowser.IsSafari = false;
}

if (tagmagBrowser[0] === "Opera") {
    tagmagBrowser.IsOpera = true;
}
else {
    tagmagBrowser.IsOpera = false;
}

if (tagmagBrowser[0] === "MSIE"
			&& tagmagBrowser[1] === "7.0") {
    tagmagBrowser.IsIE7 = true;
}
else {
    tagmagBrowser.IsIE7 = false;
}

if (tagmagBrowser[0] === "MSIE"
		&& tagmagBrowser[1] === "8.0") {
    tagmagBrowser.IsIE8 = true;
}
else {
    tagmagBrowser.IsIE8 = false;
}

if (tagmagBrowser[0] === "MSIE"
			&& tagmagBrowser[1] === "9.0") {
    tagmagBrowser.IsIE9 = true;
}
else {
    tagmagBrowser.IsIE9 = false;
}

if (tagmagBrowser[0] === "MSIE"
			&& tagmagBrowser[1] === "10.0") {
    tagmagBrowser.IsIE10 = true;
}
else {
    tagmagBrowser.IsIE10 = false;
}

if (document.documentMode == 7) {
    tagmagBrowser.IsIE7 = true;
}

if (document.documentMode == 8) {
    tagmagBrowser.IsIE8 = true;
}

if (tagmagBrowser.IsChrome || tagmagBrowser.IsFF || tagmagBrowser.IsOpera
			|| tagmagBrowser.IsSafari || tagmagBrowser.IsIE9) {
    (function tagmag_Init() {
        tagmag_AddStyle();
        setTimeout(function () {
            tagmag_AddScriptToTumblrIframe();
            tagmag_ScanImages();
        }, 100);
    })();
}

function tagmag_GetImageWidth(image) {
    if (isEmpty(image) == true){
        return 0;
    }
    var width = image.clientWidth;
    return width;
}

function tagmag_GetImageHeight(image) {
    if (isEmpty(image) == true){
        return 0;
    }
    var height = image.clientHeight;
    return height;
}

//in some cases tumblr merge images and show them as iFrame, we want to inject script inside those iframes
function tagmag_AddScriptToTumblrIframe() {
    var iframeGalleries = document.getElementsByTagName('iframe');

    for (var i = 0; i < iframeGalleries.length; i++) {
        if (iframeGalleries[i].className.indexOf('photoset') > -1) {
            if (isEmpty(iframeGalleries[i].contentWindow.document) == false) {

                var publisherScriptContent = 'var tagmagPublisherID="' + tagmagPublisherID + '";';
                var publisherScript = document.createElement('script');
                if (tagmagBrowser.IsFF) {
                    publisherScript.text = publisherScriptContent;
                }
                else {
                    publisherScript.innerText = publisherScriptContent;
                }

                var url = tagmagSnippetUrl;
                var script = document.createElement('script');
                script.setAttribute('src', url);
                script.async = true;

                iframeGalleries[i].contentWindow.document.getElementsByTagName('head')[0].appendChild(publisherScript);
                iframeGalleries[i].contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
            }
        }
    }
}

function tagmag_GenerateQueryNumber() {
    return Math.floor((Math.random() * 10) + 1);
}

function tagmag_AddStyle() {
    // create a new script element
    var style = document.createElement('link');
    // set the src attribute to that url
    style.setAttribute('href', tagmagCssPath);
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("type", "text/css");
    // insert the script in out page
    document.getElementsByTagName('head')[0].appendChild(style);
}

function tagmag_ScanImages() {
    var allImages = document.getElementsByTagName("img");
    for (var i = 0, max = allImages.length; i < max; i++) {
        var image = allImages[i];
        if (isEmpty(image) == false
				&& tagmag_GetImageWidth(image) > 200) {
            tagmagWrapImage(image);

            //double check image position - if image was moved after adding wrapper, we need to change wrapper position as well
            //function construction is used to localize value of image variable
            //repeat after 1
            (function (image) {
                setTimeout(function () {
                    tagmagChangeWrapperPosition(image);
                }, 1000);
            } (image));
            (function (image) {
                setTimeout(function () {
                    tagmagChangeWrapperPosition(image);
                }, 3000);
            } (image));
            (function (image) {
                setTimeout(function () {
                    tagmagChangeWrapperPosition(image);
                }, 10000);
            } (image));

        }
    }

    //checking for user rights
    callTheJsonp(tagmagUserRights + "?upd=" + tagmag_GenerateQueryNumber() + "&publisherid=" + tagmagPublisherID + '&callback=parseGetRights');

    tagmagInitNextGenGallery();
    tagmagInitFlexGallery();

    setTimeout(function () {
        //showAllWrappers();
    }, 1000);

    setTimeout(function () {
        //hideAllWrappers();
    }, 8000);

}

function tagmagInitNextGenGallery() {
    document.body.addEventListener('DOMNodeInserted', tagmagOnNodeInserted, false);
    document.body.addEventListener('DOMNodeRemoved', tagmagOnNodeRemoved, false);
}

function tagmagInitFlexGallery() {
    var navigationButtons = document.body.getElementsByClassName('flex-next');
    if (navigationButtons.length > 0) {
        for (var i = 0; i < navigationButtons.length; i++) {
            navigationButtons[i].addEventListener('click', flexNavigationButtonClick, false);
        }
    }
    navigationButtons = document.body.getElementsByClassName('flex-prev');
    if (navigationButtons.length > 0) {
        for (var i = 0; i < navigationButtons.length; i++) {
            navigationButtons[i].addEventListener('click', flexNavigationButtonClick, false);
        }
    }
    var pagingPanels = document.body.getElementsByClassName('flex-control-paging');
    if (pagingPanels.length > 0) {
        for (var i = 0; i < pagingPanels.length; i++) {
            pagingButtons = pagingPanels[i].getElementsByTagName("a");
            if (pagingButtons.length > 0) {
                for (var j = 0; j < pagingButtons.length; j++) {
                    pagingButtons[j].addEventListener('click', flexNavigationButtonClick, false);
                }
            }
        }
    }
}

function flexNavigationButtonClick(event) {
    var navigationButton = event.target;
    var slider = getParentByClassName(navigationButton, "flexslider");
    if (isEmpty(slider) == false) {
        var allSlides = slider.getElementsByClassName('outer');
        if (allSlides.length > 0) {
            for (var i = 0; i < allSlides.length; i++) {
                var inactiveImage = allSlides[i].getElementsByTagName("img");
                if (inactiveImage.length > 0) {
                    tagmagUnWrapImage(inactiveImage[0]);
                }
            }
        }
        setTimeout(function () {
            var activeSlide = slider.getElementsByClassName('flex-active-slide');
            if (activeSlide.length > 0) {
                var activeImage = activeSlide[0].getElementsByTagName("img");
                if (activeImage.length > 0) {
                    tagmagReWrapImage(activeImage[0]);
                }
            }
        }, 200);
    }
}

function tagmagOnNodeInserted(event) {
    var newNode = event.target;
    if (newNode.id == "shWrap") {
        var allImages = newNode.getElementsByTagName("img");
        tagmagReWrapImage(allImages[0]);
    }
}

function tagmagReWrapImage(image) {
    if (isEmpty(image) == false) {

        setTimeout(function () {

            tagmagWrapImage(image);
            var divWrapper = document.getElementById(image.src);
            divWrapper.zIndexSet = "11002";

            setTimeout(function () {
                if (tagmagHasRightToAddTag == 'true') {
                    createDivAddTagWrapper(divWrapper);
                    var divAddTagWindow = document.getElementById('tagmag_AddTagWindowCreateTag');
                    showVisibility(ifrmCreateTag);
                }
                if (isEmpty(divWrapper.ShoppingCart) == false) {
                    divWrapper.ShoppingCart.style.zIndex = divWrapper.zIndexSet;
                    showElement(divWrapper.ShoppingCart);
                }
                tagmagChangeWrapperChildren(divWrapper, divWrapper.zIndexSet, "", "");
                tagmagChangeWrapperPosition(image);
            }, 300);

            setTimeout(function () {
                tagmagChangeWrapperPosition(image);
                setTimeout(function () {
                    tagmagChangeWrapperPosition(image);
                }, 700);
            }, 400);

        }, 500);

    }
}

function tagmagOnNodeRemoved(event) {
    var oldNode = event.target;
    if (oldNode.id == "shDisplay"
            || oldNode.id == "shWrap") {
        var allImages = oldNode.getElementsByTagName("img");
        tagmagUnWrapImage(allImages[0]);
    }
}

function tagmagUnWrapImage(image) {
    if (isEmpty(image) == false) {
        var divWrapper = document.getElementById(image.src);
    }
    if (tagmagBrowser.IsIE9 == false) {
        setTimeout(function () {
            var newNode = document.getElementById("shWrap");
            if (isEmpty(newNode) == false) {
                var newImages = newNode.getElementsByTagName("img");
                if (isEmpty(newImages[0]) == false) {
                    if (image.src == newImages[0].src) {
                        return;
                    }
                }
            }

            if (isEmpty(divWrapper) == false) {
                if (isEmpty(divWrapper.ShoppingCart) == false) {
                    removeElement(divWrapper.ShoppingCart);
                }
                removeElement(divWrapper);
            }

        }, 50);
    }
    else {
        if (isEmpty(divWrapper.ShoppingCart) == false) {
            removeElement(divWrapper.ShoppingCart);
        }
        removeElement(divWrapper);
    }
}


function tagmagChangeWrapperPosition(image) {
    var imageOffset = tagmagFindPos(image);
    var divWrapper = document.getElementById(image.src);
    divWrapper.style.top = imageOffset.top + "px";
    divWrapper.style.left = imageOffset.left + "px";

    if (isEmpty(divWrapper.ShoppingCart) == false) {
        tagmagSetShoppingCartPosition(divWrapper);
    }
}

function tagmagChangeWrapperChildren(wrapper, index, hide, show) {
    var addTagButtons = wrapper.getElementsByClassName('tagmag_AddTagWrapper');
    if (addTagButtons.length > 0) {
        if (isEmpty(index) == false) {
            addTagButtons[0].style.zIndex = index;
        }
        if (isEmpty(hide) == false) {
            hideElement(addTagButtons[0]);
        }
        if (isEmpty(show) == false) {
            showElement(addTagButtons[0]);
        }
    }
    var tags = wrapper.getElementsByClassName('tagmag_TagWrapper');
    if (tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {
            if (isEmpty(index) == false) {
                tags[i].style.zIndex = index;
            }
            if (isEmpty(hide) == false) {
                hideElement(tags[i]);
            }
            if (isEmpty(show) == false) {
                showElement(tags[i]);
            }
        }
    }
}

function tagmagWrapImage(image) {

    var divWrapper = document.getElementById(image.src);

    if (isEmpty(divWrapper) == true) {
        //tagmag_Wrapper
        var imageOffset = tagmagFindPos(image);
        divWrapper = createDivWrapper(image.src, imageOffset.top, imageOffset.left);
        divWrapper.ImagePaddingLeft = imageOffset.paddingLeft;
        divWrapper.ImagePaddingTop = imageOffset.paddingTop;
        divWrapper.zIndexHasBeenChanged = false;

        document.body.appendChild(divWrapper);

        callTheJsonp(tagMagGetImageTagsService + "?upd=" + tagmag_GenerateQueryNumber() + "&src=" + image.src + '&publisherID=' + tagmagPublisherID + '&callback=parseGetTags');
    }

    divWrapper.ImageObj = image;
    image.onmouseover = imageOnMouseOverCallback;
    image.onmouseout = imageOnMouseOutCallback;

}

function getParentByClassName(obj, className) {
    var obj_parent = obj.parentNode;
    if (!obj_parent) return null;
    if (isEmpty(obj_parent.className) == false && obj_parent.className.split(' ').indexOf(className) > -1) {
        return obj_parent;
    }
    else return getParentByClassName(obj_parent, className);
}

function tagmagGetOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function getElementPadding(el) {
    var curtop = el.style.paddingTop.replace("px", "");
    if (isEmpty(curtop)) {
        style = window.getComputedStyle(el);
        curtop = style.getPropertyValue('padding-top').replace("px", "");
    }
    var curleft = el.style.paddingLeft.replace("px", "");
    if (isEmpty(curleft)) {
        style = window.getComputedStyle(el);
        curleft = style.getPropertyValue('padding-left').replace("px", "");
    }
    return { paddingTop: parseInt(curtop) || 0, paddingLeft: parseInt(curleft) || 0 };
}

function getElementMargins(el) {
    var curtop = el.style.marginTop.replace("px", "");
    if (isEmpty(curtop)) {
        style = window.getComputedStyle(el);
        curtop = style.getPropertyValue('margin-top').replace("px", "");
    }
    var curleft = el.style.marginLeft.replace("px", "");
    if (isEmpty(curleft)) {
        style = window.getComputedStyle(el);
        curleft = style.getPropertyValue('margin-left').replace("px", "");
    }
    return { marginTop: parseInt(curtop) || 0, marginLeft: parseInt(curleft) || 0 };
}

function tagmagFindPos(obj) {
    var paddings = getElementPadding(obj);
    obj.PaddingObj = paddings;
    //html margin - bug in WP
    var htmlDoc = document.getElementsByTagName('html');
    var htmlMargins = getElementMargins(htmlDoc[0]);

    var imageMargins = getElementMargins(obj);
    var obj2 = obj;
    var curtop = 0;
    var curleft = 0;
    if (document.getElementById || document.all) {
        do {
            curleft += obj.offsetLeft - obj.scrollLeft;
            curtop += obj.offsetTop - obj.scrollTop;
            obj = obj.offsetParent;
            obj2 = obj2.parentNode;
            while (obj2 != obj) {
                curleft -= obj2.scrollLeft;
                curtop -= obj2.scrollTop;
                obj2 = obj2.parentNode;
            }
        } while (obj.offsetParent)
        curleft += paddings.paddingLeft;
        curleft += htmlMargins.marginLeft;
        curtop += paddings.paddingTop;
        curtop += htmlMargins.marginTop;
        if (imageMargins.marginTop < 0) {
            curtop = curtop - imageMargins.marginTop;
        }
    } else if (document.layers) {
        curtop += obj.y;
        curleft += obj.x;
    }

    //todo - image padding is not included. Read padding from elem style and css. Add it to top and left values.

    return { top: curtop, left: curleft, paddingTop: paddings.paddingTop, paddingLeft: paddings.paddingLeft };
}

function tagmagGetOffsetWithBounding(el) {
    if (el.getBoundingClientRect)
        return el.getBoundingClientRect();
    else {
        var x = 0, y = 0;
        do {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
        }
        while (el = el.offsetParent);

        return { top: y, left: x }
    }
}

function pointerIsInWrapper(currentWrapper, e) {

    var mousePosX = window.pageXOffset + e.clientX;
    var mousePosY = window.pageYOffset + e.clientY;

    //apply if mouse is outside image
    if (mousePosX < currentWrapper.offsetLeft
			|| mousePosX > (currentWrapper.offsetLeft + tagmag_GetImageWidth(currentWrapper.ImageObj) - currentWrapper.ImagePaddingLeft - 5)
			|| mousePosY < currentWrapper.offsetTop
			|| mousePosY > (currentWrapper.offsetTop + tagmag_GetImageHeight(currentWrapper.ImageObj) - currentWrapper.ImagePaddingTop - 5)) {
        return false;
    }

    return true;

}

function hideAllWrappers() {
    var wrappers = document.getElementsByClassName('tagmag_Wrapper');
    for (var i = 0; i < wrappers.length; i++) {
        if (wrappers[i].isMouseInside == false) {
            hideElement(wrappers[i]);
        }
    }
}

function showAllWrappers() {
    var wrappers = document.getElementsByClassName('tagmag_Wrapper');
    for (var i = 0; i < wrappers.length; i++) {
        showElement(wrappers[i]);
    }
}

function imageOnMouseOverCallback() {
    var wrapperID = this.src;
    var currentWrapper = document.getElementById(wrapperID);
    showElement(currentWrapper);
    currentWrapper.isMouseInside = true;

    var currentShoppingCart = currentWrapper.ShoppingCart;
    if (isEmpty(currentShoppingCart) == false
            && tagmagIsTouchScreen == false) {
        hideElement(currentShoppingCart);
    }

}

function imageOnMouseOutCallback(e) {
    var wrapperID = this.src;
    var currentWrapper = document.getElementById(wrapperID);

    e = window.event || e;

    //apply if mouse is outside image
    if (pointerIsInWrapper(currentWrapper, e) == false) {
        hideElement(currentWrapper);
        currentWrapper.isMouseInside = false;

        var currentShoppingCart = currentWrapper.ShoppingCart;
        if (isEmpty(currentShoppingCart) == false) {
            showElement(currentShoppingCart);
        }

    }
}

function createDivWrapper(id, top, left) {

    var divWrapper = document.createElement("div");
    id = id.split(' ').join('+');
    divWrapper.id = id;
    divWrapper.style.top = top + "px";
    divWrapper.style.left = left + "px";
    hideElement(divWrapper);
    divWrapper.className = "tagmag_Wrapper";
    divWrapper.isMouseInside = false;
    divWrapper.callJsonP = callTheJsonp;

    return divWrapper;

}

function createDivAddTagWrapper(divWrapper) {

    var addTagWrappers = divWrapper.getElementsByClassName('tagmag_AddTagWrapper');

    if (addTagWrappers.length == 0) {
        //tagmag_AddTagWrapper
        var divAddTagWrapper = document.createElement("div");
        divAddTagWrapper.style.top = 10 + "px";
        divAddTagWrapper.style.left = 10 + "px";
        divAddTagWrapper.className = "tagmag_AddTagWrapper";
        divAddTagWrapper.parentWrapper = divWrapper;
        divAddTagWrapper.onclick = addTagCallback;
        //tagmag_AddTagGraphic
        var divAddTagGraphic = document.createElement("div");
        divAddTagGraphic.className = "tagmag_AddTagGraphic";
        divAddTagWrapper.appendChild(divAddTagGraphic);

        divWrapper.appendChild(divAddTagWrapper);
    }
}

function initAddTagWindow() {

    //tagmag_AddTagWindow
    var divAddTagWindow = document.createElement("div");
    divAddTagWindow.id = "tagmag_AddTagWindow";
    divAddTagWindow.style.width = "100%"; //document.body.clientWidth + 100 + "px";
    divAddTagWindow.style.height = document.body.clientHeight + 100 + "px";
    document.body.appendChild(divAddTagWindow);

    //tagmag_AddTagWindowImageWrapper
    var divAddTagImageWrapper = document.createElement("div");
    divAddTagImageWrapper.id = "tagmag_AddTagWindowImageWrapper";
    //tagmag_AddTagWindowImage
    var divAddTagImage = document.createElement("img");
    divAddTagImage.id = "tagmag_AddTagWindowImage";
    divAddTagImage.onclick = addTagImageClickCallback;
    divAddTagImageWrapper.appendChild(divAddTagImage);
    //tagmag_AddTagDumbWrapper
    var divTagDumbWrapper = document.createElement("div");
    divTagDumbWrapper.id = "tagmag_AddTagDumbWrapper";
    divTagDumbWrapper.className = "tagmag_TagWrapper";
    //tagmag_TagGraphic
    var divTagGraphic = document.createElement("div");
    divTagGraphic.className = "tagmag_TagGraphic";
    divTagDumbWrapper.appendChild(divTagGraphic);
    divAddTagImageWrapper.appendChild(divTagDumbWrapper);
    divAddTagWindow.appendChild(divAddTagImageWrapper);


    //tagmag_AddTagWindowDescription
    var divAddTagDescription = document.createElement("div");
    divAddTagDescription.id = "tagmag_AddTagWindowDescription";
    //tagmag_AddTagWindowDescription p
    var divAddTagDescriptionP = document.createElement("p");
    divAddTagDescriptionP.innerHTML = "<b>CLICK TO TAG</b>";
    divAddTagDescription.appendChild(divAddTagDescriptionP);
    //tagmag_AddTagWindowClose
    var divAddTagClose = document.createElement("div");
    divAddTagClose.id = "tagmag_AddTagWindowClose";
    divAddTagClose.onclick = closeTagWindowCallback;
    divAddTagDescription.appendChild(divAddTagClose);
    divAddTagWindow.appendChild(divAddTagDescription);

    //tagmag_AddTagWindowCreateTag
    ifrmCreateTag = document.createElement("iframe");
    ifrmCreateTag.id = "tagmag_AddTagWindowCreateTag";
    if (tagmagIsTouchScreen == false) {
        ifrmCreateTag.setAttribute("scrolling", "no");
    }
    //next gen gallery bug - pressing esc sets this iframe to visible
    hideElement(ifrmCreateTag);
    divAddTagWindow.appendChild(ifrmCreateTag);

    //tagmag_CreateTagWindowClose
    var divCreateTagClose = document.createElement("div");
    divCreateTagClose.id = "tagmag_CreateTagWindowClose";
    divCreateTagClose.onclick = closeCreateWindowCallback;
    //divAddTagWindow.appendChild(divCreateTagClose);

}

function addTagImageClickCallback(e) {

    /*
    var divCreateTagClose = document.getElementById('tagmag_CreateTagWindowClose');
    showElement(divCreateTagClose);
    */

    var offsetX = e.offsetX;
    var offsetY = e.offsetY;

    if (tagmagBrowser.IsFF) {
        offsetX = e.layerX;
        offsetY = e.layerY;
    }

    var divTagDumbWrapper = document.getElementById('tagmag_AddTagDumbWrapper');
    divTagDumbWrapper.style.top = offsetY + "px";
    divTagDumbWrapper.style.left = offsetX + "px";
    showElement(divTagDumbWrapper);

    var ifrmCreateTag = document.getElementById('tagmag_AddTagWindowCreateTag');
    ifrmCreateTag.setAttribute("src", tagmagCreateTagUrl +
											"?publisherid=" + tagmagPublisherID
											+ "&imagewidth=" + Math.floor(tagmag_GetImageWidth(this))
											+ "&imageheight=" + Math.floor(tagmag_GetImageHeight(this))
											+ "&leftposition=" + offsetX
											+ "&topposition=" + offsetY
                                            + "&windowWidth=" + ifrmCreateTag.style.width
											+ "&src=" + this.src);
    showElement(ifrmCreateTag);
}

function getAddTagWindow(wrapper) {

    var documentObj = document;
    var windowObj = window;
    //in case images are in iframe
    if (isEmpty(parent) == false) {
        documentObj = parent.document;
        windowObj = parent;
    }

    var divAddTagWindow = documentObj.getElementById('tagmag_AddTagWindow');

    //tagmag_AddTagWindowImage
    var divAddTagImage = documentObj.getElementById('tagmag_AddTagWindowImage');
    divAddTagImage.setAttribute("src", wrapper.ImageObj.src);
    var resizedImage = getResizedImage(wrapper.ImageObj);
    divAddTagImage.style.width = resizedImage.width + "px";
    divAddTagImage.style.height = resizedImage.height + "px";

    //tagmag_AddTagWindowImageWrapper
    var divAddTagImageWrapper = documentObj.getElementById('tagmag_AddTagWindowImageWrapper');
    divAddTagImageWrapper.style.top = windowObj.pageYOffset + 40 + "px";
    divAddTagImageWrapper.style.left = windowObj.pageXOffset + 20 + "px";
    divAddTagImageWrapper.style.width = resizedImage.width + "px";
    divAddTagImageWrapper.style.height = resizedImage.height + "px";

    //tagmag_AddTagDumbWrapper
    var divTagDumbWrapper = documentObj.getElementById('tagmag_AddTagDumbWrapper');
    hideElement(divTagDumbWrapper);

    //tagmag_AddTagWindowCreateTag
    var ifrmCreateTag = documentObj.getElementById('tagmag_AddTagWindowCreateTag');
    ifrmCreateTag.setAttribute("src", "");
    ifrmCreateTag.style.top = windowObj.pageYOffset + 15 + "px";
    ifrmCreateTag.style.left = windowObj.pageXOffset + resizedImage.width + 45 + "px";
    ifrmCreateTag.style.width = windowObj.innerWidth - (resizedImage.width + 45 + 20) + "px";
    hideElement(ifrmCreateTag);

    var divAddTagClose = documentObj.getElementById('tagmag_AddTagWindowClose');
    //divAddTagClose.style.top = windowObj.pageYOffset + 15 + "px";
    //divAddTagClose.style.left = resizedImage.width + 20 + "px";
    divAddTagClose.currWrapper = wrapper;

    //tagmag_CreateTagWindowClose
    /*
    var divCreateTagClose = documentObj.getElementById('tagmag_CreateTagWindowClose');
    divCreateTagClose.style.top = windowObj.pageYOffset + 115 + "px";
    divCreateTagClose.style.left = windowObj.pageXOffset + resizedImage.width + 65 + 610 + "px";
    hideElement(divCreateTagClose);
    */

    var divAddTagDescription = documentObj.getElementById('tagmag_AddTagWindowDescription');
    divAddTagDescription.style.top = windowObj.pageYOffset + 15 + "px";
    divAddTagDescription.style.left = windowObj.pageXOffset + 20 + "px";
    divAddTagDescription.style.width = resizedImage.width + 20 + "px";

    return divAddTagWindow;
}

function getResizedImage(image) {

    var sizeLimit = 500;

    var width = tagmag_GetImageWidth(image);
    var height = tagmag_GetImageHeight(image);

    var ratio = width / height;

    if (width > sizeLimit
			|| height > sizeLimit) {
        //horizontal
        if (ratio >= 1) {
            width = sizeLimit;
            height = sizeLimit / ratio;
        }
        else {
            height = sizeLimit;
            width = sizeLimit * ratio;
        }
    }

    return { width: width, height: height }
}

function closeCreateWindowCallback() {

    var divCreateTagClose = document.getElementById('tagmag_CreateTagWindowClose');
    hideElement(divCreateTagClose);

    var divTagDumbWrapper = document.getElementById('tagmag_AddTagDumbWrapper');
    hideElement(divTagDumbWrapper);

    var ifrmCreateTag = document.getElementById('tagmag_AddTagWindowCreateTag');
    hideElement(ifrmCreateTag);
}

function closeTagWindowCallback() {

    document.body.style.overflow = 'auto';

    var divAddTagWindow = document.getElementById('tagmag_AddTagWindowCreateTag');
    hideElement(ifrmCreateTag);
    var divAddTagWindow = document.getElementById('tagmag_AddTagWindow');
    hideVisibility(divAddTagWindow);

    //refresh tags on image
    for (var i = 0; i < this.currWrapper.childNodes.length; i++) {
        if (this.currWrapper.childNodes[i].className == "tagmag_TagWrapper") {
            removeElement(this.currWrapper.childNodes[i]);
        }
    }
    this.currWrapper.callJsonP(tagMagGetImageTagsService + "?upd=" + tagmag_GenerateQueryNumber() + "&src=" + this.currWrapper.ImageObj.src + '&publisherID=' + tagmagPublisherID + '&callback=parseGetTags');
}

function addTagCallback() {

    var top = window.pageYOffset;
    var left = window.pageXOffset;
    document.body.style.overflow = 'hidden';

    var divAddTagWindow = getAddTagWindow(this.parentWrapper);
    showVisibility(divAddTagWindow);
}

function windowNoScroll(top, left)
{
    window.pageYOffset = top;
    window.pageXOffset = left;
}

function pointerIsInPopup(divTagPopup, e) {

    var mousePosX = window.pageXOffset + e.clientX;
    var mousePosY = window.pageYOffset + e.clientY;

    var popupOffsetTop = divTagPopup.parentWrapper.offsetTop + divTagPopup.offsetTop;
    var popupOffsetLeft = divTagPopup.parentWrapper.offsetLeft + divTagPopup.offsetLeft;

    //apply if mouse is outside popup
    if (mousePosX < popupOffsetLeft
		|| mousePosX > (popupOffsetLeft + divTagPopup.clientWidth)
		|| mousePosY < popupOffsetTop
		|| mousePosY > (popupOffsetTop + divTagPopup.clientHeight)) {
        return false;
    }

    return true;

}

function createDivTagWrapper(tagID, top, left, divTagPopup, image) {

    var divTagWrapper = document.createElement("div");
    divTagWrapper.id = tagID;
    divTagWrapper.style.top = top + "px";
    divTagWrapper.style.left = left + "px";
    divTagWrapper.className = "tagmag_TagWrapper";


    divTagWrapper.onmouseover =
	function () {

	    var divTagPopup = this.RelatedPopup;

	    showElement(divTagPopup);
	    this.OriginalZindex = this.style.zIndex;
	    this.style.zIndex = "100000";
	};

    divTagWrapper.onmouseout =
	function (e) {

	    var divTagPopup = this.RelatedPopup;

	    e = window.event || e;

	    if (pointerIsInPopup(divTagPopup, e) == false) {
	        if (isEmpty(this.OriginalZindex) == false) {
	            this.style.zIndex = this.OriginalZindex;
	        }
	        else {
	            this.style.zIndex = "6";
	        }
	        hideElement(divTagPopup);
	    }
	};

    //tagmag_TagGraphic
    var divTagGraphic = document.createElement("div");
    divTagGraphic.className = "tagmag_TagGraphic";
    if (isEmpty(tagmagTagIcon) == false) {
        divTagGraphic.style.backgroundImage = 'url("' + tagmagTagIcon + '")';
    }

    divTagWrapper.appendChild(divTagGraphic);

    return divTagWrapper;

}

function getPopupTopPosition(tagTop, popupHeight, imageHeight) {

    var popupTop = tagTop - (popupHeight / 2);
    if (popupTop < 0) {
        popupTop = 10;
    }
    else if ((imageHeight - (popupTop + popupHeight)) < 0) {
        popupTop = imageHeight - popupHeight - 20;
    }
    return popupTop;
}

function getPopupLeftPosition(tagLeft, popupWidth, imageWidth, wrapper) {

    var popupLeft = tagLeft;
    var globalOffset = parseInt(wrapper.style.left.replace("px", "")) + tagLeft + popupWidth;
    //move popup left if tag is at the left of the window
    if (window.innerWidth - globalOffset < 0) {
        popupLeft = popupLeft - popupWidth - 30;
    }
    return popupLeft;
}

function popupDeleteCallback() {
    var tag = document.getElementById(this.tagID);
    var popup = document.getElementById("popup" + this.tagID);
    removeElement(tag);
    removeElement(popup);
    callTheJsonp(tagmagDeleteTag + "?tagid=" + this.tagID + "&callback=parseDeleteTag");
    return false;
}

function createDivTagPopup(top, left, tagID, imageWidth, imageHeight, wrapper, category, src, tagCount) {

    //popup top position
    var popupHeight = 253;
    var popupTop = getPopupTopPosition(top, popupHeight, imageHeight);

    //popup left position
    var popupWidth = 167;
    if (tagCount == 2) {
        popupWidth = 339;
    }
    else if (tagCount > 2) {
        popupWidth = 417;
    }

    var popupLeft = getPopupLeftPosition(left, popupWidth, imageWidth, wrapper);

    var divTagPopup = document.createElement("div");
    divTagPopup.id = "popup" + tagID;
    divTagPopup.style.top = popupTop + "px";
    divTagPopup.style.left = popupLeft + "px";
    if (popupLeft < left) {
        divTagPopup.style.paddingRight = "30px";
    }
    else {
        divTagPopup.style.paddingLeft = "30px";
    }
    hideElement(divTagPopup);
    divTagPopup.className = "tagmag_TagPopup";
    divTagPopup.parentWrapper = wrapper;
    divTagPopup.onmouseover = function () {
    }
    divTagPopup.onmouseout = function (e) {
        e = window.event || e;
        if (pointerIsInPopup(this, e) == false) {
            this.RelatedTag.style.zIndex = "6";
            hideElement(divTagPopup);
        }
    }

    //tagmag_TagPopupContent
    var divTagPopupContent = document.createElement("div");
    divTagPopupContent.className = "tagmag_TagPopupContent";

    //tagmag_Clear
    var divClear = document.createElement("div");
    divClear.className = "tagmag_Clear";

    //iframe
    ifrm = document.createElement("iframe");

    var imageUrl = src;
    ifrm.setAttribute("src", tagmagPopupIframe + imageUrl + "&category=" + category);
    if (tagmagIsTouchScreen == false) {
        ifrm.setAttribute("scrolling", "no");
    }
    ifrm.style.width = popupWidth + "px";
    //ifrm.style.height = popupHeight + "px";
    divTagPopupContent.appendChild(ifrm);

    //tagmag_TagPopupFooter
    var divTagPopupFooter = document.createElement("div");
    divTagPopupFooter.className = "tagmag_TagPopupFooter";
    divTagPopupFooter.style.width = popupWidth + 10 + "px";
    var divTagPopupFooterP = document.createElement("p");
    divTagPopupFooterP.innerHTML = 'Powered by <a target="_blank" href="http://tagpin.co.uk">Tagmag</a>';
    divTagPopupFooter.appendChild(divTagPopupFooterP);

    divTagPopup.appendChild(divTagPopupContent);
    divTagPopup.appendChild(divClear);
    divTagPopup.appendChild(divTagPopupFooter);

    //tagmag_PopupClose
    if (tagmagIsTouchScreen) {
        var divTagPopupClose = document.createElement("div");
        divTagPopupClose.className = "tagmag_PopupClose";
        divTagPopupClose.style.top = 0 + "px";
        divTagPopupClose.style.left = popupWidth + 55 + "px";
        divTagPopupClose.Popup = divTagPopup;
        divTagPopupClose.onclick =
	    function () {
	        var popup = this.Popup;
	        hideElement(popup);
	    };
        divTagPopup.appendChild(divTagPopupClose);
        divTagPopup.CloseButton = divTagPopupClose;
    }

    return divTagPopup;

}

function createShoppingCart(wrapper) {

    var divShoppingCart = document.createElement("div");
    divShoppingCart.className = "tagmag_ShoppingCart";

    wrapper.ShoppingCart = divShoppingCart;
    divShoppingCart.Wrapper = wrapper;

    tagmagSetShoppingCartPosition(wrapper);

    document.body.appendChild(divShoppingCart);

    divShoppingCart.onclick =
	function () {
	    var currentWrapper = this.Wrapper;
	    showElement(currentWrapper);
	    hideElement(this);
	};

}

function tagmagSetShoppingCartPosition(wrapper) {
    if (isEmpty(wrapper.ShoppingCart) == false) {
        var posTop = parseInt(wrapper.style.top.replace("px", ""));
        var posLeft = parseInt(wrapper.style.left.replace("px", ""));
        wrapper.ShoppingCart.style.top = posTop + 5 + "px";
        wrapper.ShoppingCart.style.left = posLeft + 5 + "px";
    }
}

function showElement(element) {
    element.style.display = "inline";
}

function hideElement(element) {
    element.style.display = "none";
}

function showVisibility(element) {
    element.style.visibility = "visible";
}

function hideVisibility(element) {
    element.style.visibility = "hidden";
}

function removeElement(element) {
    element.parentNode.removeChild(element);
}

function isEmpty(variable) {
    if (variable == ''
			|| variable == "undefined"
			|| variable == null) {
        return true;
    }
    else {
        return false;
    }
}

function callTheJsonp(url) {
    // the url of the script where we send the asynchronous call
    if (isEmpty(url)) {
        return;
    }
    // create a new script element
    var script = document.createElement('script');
    // set the src attribute to that url
    script.setAttribute('src', url);
    // identify jsonp script to delete it later
    script.id = 'JSONP';
    //async if possible
    script.async = true;
    // insert the script in out page
    document.getElementsByTagName('head')[0].appendChild(script);
}

function cleanTheJsonp() {
    var tmp;
    if (tagmagBrowser[0] !== "MSIE"
				&& tagmagBrowser[1] !== "7.0") {
        while (tmp = document.getElementById('JSONP')) {
            tmp.parentNode.removeChild(tmp);
            for (var prop in tmp) delete tmp[prop];
        }
        tmp = null;
    }
}

function parseGetTags(response) {
    try {
        if (isEmpty(response) == false) {

            var divWrapperID = encodeURI(response.ImageID);
            divWrapperID = divWrapperID.replace(/%20/g, "+");
            var divWrapper = document.getElementById(divWrapperID);

            if (isEmpty(response.TagIcon) == false) {
                tagmagTagIcon = response.TagIcon;
            }

            if (isEmpty(divWrapper) == false) {

                for (var i = 0, max = response.Tags.length; i < max; i++) {

                    var imageWidth = tagmag_GetImageWidth(divWrapper.ImageObj) - (divWrapper.ImageObj.PaddingObj.paddingLeft * 2);
                    var imageHeight = tagmag_GetImageHeight(divWrapper.ImageObj) - (divWrapper.ImageObj.PaddingObj.paddingTop * 2);

                    var tagLeftPosition = getTagLeftPosition(response.Tags[i].TagPositionLeft, imageWidth);
                    var tagTopPosition = getTagTopPosition(response.Tags[i].TagPositionTop, imageHeight);

                    //tagmag_TagPopup
                    var divTagPopup = createDivTagPopup(tagTopPosition, tagLeftPosition, response.Tags[i].TagID, tagmag_GetImageWidth(divWrapper.ImageObj),
												(divWrapper.ImageObj), divWrapper, response.Tags[i].Category, divWrapperID, response.Tags[i].TagCount);

                    //tagmag_TagWrapper
                    var divTagWrapper = createDivTagWrapper(response.Tags[i].TagID, tagTopPosition, tagLeftPosition, divTagPopup, divWrapper.ImageObj);

                    divTagPopup.RelatedTag = divTagWrapper;
                    divTagWrapper.RelatedPopup = divTagPopup;

                    divWrapper.appendChild(divTagWrapper);
                    divWrapper.appendChild(divTagPopup);

                }

                if (response.Tags.length > 0) {
                    createShoppingCart(divWrapper);
                }

                //for galleries when tags have bigger z indexes
                if (isEmpty(divWrapper.zIndexSet) == false) {
                    tagmagChangeWrapperChildren(divWrapper, divWrapper.zIndexSet, "", "");
                }

            }
        }

    }
    catch (an_exception) {
    }
}

function parseDeleteTag(response) {
    try {

        //cleaning jsonp scripts after executing
        setTimeout(function () {
            cleanTheJsonp();
        }, 1000);

    }
    catch (an_exception) {
    }
}

function parseGetRights(response) {
    try {

        if (response.HasRightToAddTag == true) {
            tagmagHasRightToAddTag = 'true';
            initAddTagWindow();
            var wrappers = document.getElementsByClassName('tagmag_Wrapper');
            for (var i = 0; i < wrappers.length; i++) {
                createDivAddTagWrapper(wrappers[i]);
            }
        }

        //cleaning jsonp scripts after executing
        setTimeout(function () {
            cleanTheJsonp();
        }, 1000);

    }
    catch (an_exception) {
    }
}

function getTagLeftPosition(tagLeft, imageWidth) {
    var tagLeftPosition = tagLeft * imageWidth - 10;
    return tagLeftPosition;
}

function getTagTopPosition(tagTop, imageHeight) {
    var tagTopPosition = tagTop * imageHeight - 10;
    return tagTopPosition;
}

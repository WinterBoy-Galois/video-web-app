$(document).ready(function () {

    var popupWidth = 160;
    var imageSectionHeight = 160;

    updateCurrencyRates();
    $.ajax({
        url: "../Services/GetCountryByIP",
        type: "GET",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.length > 0) {
                var location = jQuery.parseJSON(data);
                $('#UserCountry').val(location.country_code);
            }
            else {
                $('#UserCountry').val('GB');
            }
            $('.price').each(function () {
                var convertedPrice = convertPrice($(this).attr('price'), $(this).attr('currency'));
                $(this).html(convertedPrice.currency + ' ' + convertedPrice.price);
            });
        },
        error: function () {
            return true;
        }
    });

    $('.imageSection').each(function () {

        var productImageWidth = $(this).find('img').attr('width');
        var productImageHeight = $(this).find('img').attr('height');

        var productImgMarginLeft = (popupWidth - productImageWidth) / 2;
        $(this).children('a').css("margin-left", productImgMarginLeft + "px");

        var productImgMarginTop = (imageSectionHeight - productImageHeight) / 2;
        $(this).children('a').css("margin-top", productImgMarginTop + "px");

    });

    $('.storeSection').each(function () {

        var isStoreAvatar = true;
        if ($(this).find('img').length == 0) {
            isStoreAvatar = false;
        }

        var storeName = $(this).find('.storeName').attr('storeNameText');
        var designerName = $(this).find('.followStore').attr('designerText');

        if (isStoreAvatar) {
            if (storeName.length > 16) {
                $(this).find('.storeName').css("font-size", "10px");
                $(this).find('.storeName').html('<b>' + storeName.substring(0, 19) + '</b>');
            }
            $(this).find('.followStore').html(designerName.substring(0, 17).toUpperCase());
        }
        else {
            if (storeName.length > 20) {
                $(this).find('.storeName').css("font-size", "10px");
                $(this).find('.storeName').html('<b>' + storeName.substring(0, 25) + '</b>');
            }
            $(this).find('.followStore').html(designerName.substring(0, 24).toUpperCase());
        }

    });

    if ($('.popupWrapper').length < 3) {
        $('.navButton').hide();
    }

    if ($('.popupWrapper').length == 2) {
        var lastTag = $('.popupWrapper').eq(1);
        lastTag.css("margin-right", "0");
    }

    if ($('.popupWrapper').length > 2) {
        $('.popupWrapper').hide();
        $('.popupWrapper').eq(0).show();
        $('.popupWrapper').eq(1).show();
    }

    $('.navPrev').click(function (e) {
        $(".popupWrapper:first").detach().insertAfter(".popupWrapper:last");
        $('.popupWrapper').hide();
        $('.popupWrapper').eq(0).show();
        $('.popupWrapper').eq(1).show();
    });

    $('.navNext').click(function (e) {
        $(".popupWrapper:last").detach().insertBefore(".popupWrapper:first");
        $('.popupWrapper').hide();
        $('.popupWrapper').eq(0).show();
        $('.popupWrapper').eq(1).show();
    });

    $(".popupWrapper").hover(
        function () {
            if ($(this).find('.fb-like').length == 0) {
                var tagID = $(this).attr('tag-id');
                var wrapper = $(this).find('.fb-like-wrapper');
                var wrapperID = wrapper.attr('id');
                wrapper.html('<div class="fb-like" data-href="http://tagpin.co.uk/product/' + tagID + '" data-send="false" data-layout="button_count" data-show-faces="false"></div>');
                FB.XFBML.parse(document.getElementById(wrapperID));
            }
            $(this).find('.socialPanel').show();
        },
        function () {
            $(this).find('.socialPanel').hide();
        }
    );

    $(".socialPanel").hover(
        function () {
            $(this).show();
        },
        function () {
        }
    );

    $('.deleteTag').click(function (e) {
        e.preventDefault();
        var popupWrapper = $(this).closest('.popupWrapper');
        var tagID = popupWrapper.attr('tag-id');
        $.ajax({
            url: "../Services/DeleteTag?tagid=" + tagID,
            type: "GET",
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    popupWrapper.html('<p class="deletedText">Deleted</p>');
                }
            },
            error: function () {
                return true;
            }
        });
    });

    $('.logClick').click(function (e) {
        var tagID = $(this).closest('.popupWrapper').attr('tag-id');
        parObj = { tagID: tagID, linkType: $(this).attr("linkType"), isTagMag: false };
        $.ajax({
            url: "../Services/LogTagClick",
            type: "POST",
            data: JSON.stringify(parObj),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function () {
                return true;
            },
            error: function () {
                return true;
            }
        });
    });
});
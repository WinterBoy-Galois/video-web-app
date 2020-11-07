$(document).ready(function () {

    $('.brandsAZSymbol').markFirstSymbol();

    //intialize brands a-z
    $('.brandsAZProgress').show();
    var parObj = { searchText: '', brandType: 'retailer' };
    $.ajax({
        url: "../Services/GetBrandsCatalog",
        type: "POST",
        data: JSON.stringify(parObj),
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            jQuery.data(document.body, 'retailerAZ', data);
            generateBrandsList(false);
            $('.brandsAZProgress').hide();
        },
        error: function () {
            return true;
        }
    });
    parObj = { searchText: '', brandType: 'women' };
    $.ajax({
        url: "../Services/GetBrandsCatalog",
        type: "POST",
        data: JSON.stringify(parObj),
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            jQuery.data(document.body, 'womenAZ', data);
        },
        error: function () {
            return true;
        }
    });
    parObj = { searchText: '', brandType: 'men' };
    $.ajax({
        url: "../Services/GetBrandsCatalog",
        type: "POST",
        data: JSON.stringify(parObj),
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            jQuery.data(document.body, 'menAZ', data);
        },
        error: function () {
            return true;
        }
    });
    parObj = { searchText: '', brandType: 'beauty' };
    $.ajax({
        url: "../Services/GetBrandsCatalog",
        type: "POST",
        data: JSON.stringify(parObj),
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            jQuery.data(document.body, 'beautyAZ', data);
        },
        error: function () {
            return true;
        }
    });
    parObj = { searchText: '', brandType: 'cpc' };
    $.ajax({
        url: "../Services/GetBrandsCatalog",
        type: "POST",
        data: JSON.stringify(parObj),
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            jQuery.data(document.body, 'cpcAZ', data);
        },
        error: function () {
            return true;
        }
    });




    $(".brandTab").click(function (e) {
        e.preventDefault();

        $('.brandTab').removeClass('brandTabActive');
        $(this).addClass('brandTabActive');

        $('.symbolWrapper').hide();
        var wrapperName = $(this).attr('wrapperName');
        $(wrapperName).show();

        $('#searchBrands').val("");
        $('#brandsAZType').val($(this).attr('brandType'));
        $('#brandsAZSymbolActiveValue').val('A');

        $('.brandsAZSymbol').markFirstSymbol();

        $('.brandsAZProgress').show();
        generateBrandsList(false);

    });

    $("#searchBrands").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "../Services/SearchBrands",
                dataType: "json",
                data: {
                    text: request.term
                },
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item,
                            value: item
                        }
                    }));
                }
            });
        },
        minLength: 2,
        select: function (event, ui) {

            $('.brandsAZSymbol').unmarkSymbols();
            $('.brandsAZProgress').show();

            var tagObj = { searchText: ui.item.label, brandType: $('#brandsAZType').val() };
            $.ajax({
                url: "../Services/GetBrandsCatalog",
                type: "POST",
                data: JSON.stringify(tagObj),
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    jQuery.data(document.body, 'searchAZ', data);
                    generateBrandsList(true);
                },
                error: function () {
                    return true;
                }
            });
        }
    });

    //press enter
    $("#searchBrands").keyup(function (event) {

        if (event.keyCode == 13) {

            $('.brandsAZSymbol').unmarkSymbols();
            $('.brandsAZProgress').show();

            var tagObj = { searchText: $(this).val(), brandType: $('#brandsAZType').val() };
            $.ajax({
                url: "../Services/GetBrandsCatalog",
                type: "POST",
                data: JSON.stringify(tagObj),
                datatype: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    jQuery.data(document.body, 'searchAZ', data);
                    generateBrandsList(true);
                },
                error: function () {
                    return true;
                }
            });
        }
    });

    $(".brandsAZSearch img").click(function (e) {

        e.preventDefault();

        $('.brandsAZSymbol').unmarkSymbols();
        $('.brandsAZProgress').show();

        var tagObj = { searchText: $("#searchBrands").val(), brandType: $('#brandsAZType').val() };
        $.ajax({
            url: "../Services/GetBrandsCatalog",
            type: "POST",
            data: JSON.stringify(tagObj),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                jQuery.data(document.body, 'searchAZ', data);
                generateBrandsList(true);
            },
            error: function () {
                return true;
            }
        });
    });

    $(".brandsAZSymbol").click(function (e) {

        $('.brandsAZSymbol').removeClass('brandsAZSymbolActive');
        $(this).addClass('brandsAZSymbolActive');

        $('#brandsAZSymbolActiveValue').val($(this).html().toUpperCase());
        generateBrandsList(false);

    });

    $(".brandProductPopupHeader img").click(function (e) {
        $('#brandProductPopup').hide();
        $('.brandProductPopupHeaderBrandName').html('');
        $('.brandProductPopupContent').html('');
        //enabling page scrolling
        $('body').css('overflow', 'auto');
        $(window).unbind('scroll');
        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                $(".scrollToTop").show();
            }
            else {
                $(".scrollToTop").hide();
            }
        });

    });

});

function generateBrandsList(isSearch) {

    var htmlCode = "";
    var tabValue = $('#brandsAZType').val();
    var data;
    var noResults = true;

    if (isSearch) {
        data = jQuery.data(document.body, 'searchAZ');
    }

    if (tabValue == 'women') {

        if (isSearch == false) {
            data = jQuery.data(document.body, 'womenAZ');
        }

        for (var i = 0; i < data.WomenSymbols.length; i++) {
            if ((data.WomenSymbols[i].Symbol == $('#brandsAZSymbolActiveValue').val() && data.WomenSymbols[i].Brands.length > 0 && isSearch == false)
                    || (isSearch && data.WomenSymbols[i].Brands.length > 0)) {
                noResults = false;
                htmlCode += '<div class="symbolWrapper womenSymbolWrapper">';
                htmlCode += '<div symbol="' + data.WomenSymbols[i].Symbol + '" class="brandSymbol">' + data.WomenSymbols[i].Symbol + '</div><div class="clear"></div>';
                for (var j = 0; j < data.WomenSymbols[i].Brands.length; j++) {
                    htmlCode += '<a class="brandNameLink" href="#" brandName="' + data.WomenSymbols[i].Brands[j] + '">' + data.WomenSymbols[i].Brands[j].substring(0, 25).toUpperCase(); +'</a>';
                }
                htmlCode += '</div><div class="clear"></div>';
            }
        }
    }

    else if (tabValue == 'men') {

        if (isSearch == false) {
            data = jQuery.data(document.body, 'menAZ');
        }

        for (var i = 0; i < data.MenSymbols.length; i++) {
            if ((data.MenSymbols[i].Symbol == $('#brandsAZSymbolActiveValue').val() && data.MenSymbols[i].Brands.length > 0 && isSearch == false)
                    || (isSearch && data.MenSymbols[i].Brands.length > 0)) {
                noResults = false;
                htmlCode += '<div class="symbolWrapper menSymbolWrapper">';
                htmlCode += '<div symbol="' + data.MenSymbols[i].Symbol + '" class="brandSymbol">' + data.MenSymbols[i].Symbol + '</div><div class="clear"></div>';
                for (var j = 0; j < data.MenSymbols[i].Brands.length; j++) {
                    htmlCode += '<a class="brandNameLink" href="#" brandName="' + data.MenSymbols[i].Brands[j] + '">' + data.MenSymbols[i].Brands[j].substring(0, 25).toUpperCase(); +'</a>';
                }
                htmlCode += '</div><div class="clear"></div>';
            }
        }
    }

    else if (tabValue == 'beauty') {

        if (isSearch == false) {
            data = jQuery.data(document.body, 'beautyAZ');
        }

        for (var i = 0; i < data.BeautySymbols.length; i++) {
            if ((data.BeautySymbols[i].Symbol == $('#brandsAZSymbolActiveValue').val() && data.BeautySymbols[i].Brands.length > 0 && isSearch == false)
                    || (isSearch && data.BeautySymbols[i].Brands.length > 0)) {
                noResults = false;
                htmlCode += '<div class="symbolWrapper beautySymbolWrapper">';
                htmlCode += '<div symbol="' + data.BeautySymbols[i].Symbol + '" class="brandSymbol">' + data.BeautySymbols[i].Symbol + '</div><div class="clear"></div>';
                for (var j = 0; j < data.BeautySymbols[i].Brands.length; j++) {
                    htmlCode += '<a class="brandNameLink" href="#" brandName="' + data.BeautySymbols[i].Brands[j] + '">' + data.BeautySymbols[i].Brands[j].substring(0, 25).toUpperCase(); +'</a>';
                }
                htmlCode += '</div><div class="clear"></div>';
            }
        }
    }

    else if (tabValue == 'retailer') {

        if (isSearch == false) {
            data = jQuery.data(document.body, 'retailerAZ');
        }

        for (var i = 0; i < data.RetailerSymbols.length; i++) {
            if ((data.RetailerSymbols[i].Symbol == $('#brandsAZSymbolActiveValue').val() && data.RetailerSymbols[i].Brands.length > 0 && isSearch == false)
                    || (isSearch && data.RetailerSymbols[i].Brands.length > 0)) {
                noResults = false;
                htmlCode += '<div class="symbolWrapper retailerSymbolWrapper">';
                htmlCode += '<div symbol="' + data.RetailerSymbols[i].Symbol + '" class="brandSymbol">' + data.RetailerSymbols[i].Symbol + '</div><div class="clear"></div>';
                for (var j = 0; j < data.RetailerSymbols[i].Brands.length; j++) {
                    htmlCode += '<a class="brandNameLink" href="#" brandName="' + data.RetailerSymbols[i].Brands[j] + '">' + data.RetailerSymbols[i].Brands[j].substring(0, 25).toUpperCase(); +'</a>';
                }
                htmlCode += '</div><div class="clear"></div>';
            }
        }
    }

    else if (tabValue == 'cpc') {

        if (isSearch == false) {
            data = jQuery.data(document.body, 'cpcAZ');
        }

        for (var i = 0; i < data.CpcSymbols.length; i++) {
            if ((data.CpcSymbols[i].Symbol == $('#brandsAZSymbolActiveValue').val() && data.CpcSymbols[i].Brands.length > 0 && isSearch == false)
                    || (isSearch && data.CpcSymbols[i].Brands.length > 0)) {
                noResults = false;
                htmlCode += '<div class="symbolWrapper retailerSymbolWrapper">';
                htmlCode += '<div symbol="' + data.CpcSymbols[i].Symbol + '" class="brandSymbol">' + data.CpcSymbols[i].Symbol + '</div><div class="clear"></div>';
                for (var j = 0; j < data.CpcSymbols[i].Brands.length; j++) {
                    htmlCode += '<a class="brandNameLink" href="#" brandName="' + data.CpcSymbols[i].Brands[j] + '">' + data.CpcSymbols[i].Brands[j].substring(0, 25).toUpperCase(); +'</a>';
                }
                htmlCode += '</div><div class="clear"></div>';
            }
        }
    }

    if (noResults) {
        htmlCode = '<p class="brandsAzNotFound">Oops, brands not found. How about expanding your search?</p>';
    }

    $('.brandsAZProgress').hide();
    $('.brandsPlaceholder').html(htmlCode);

    $('.brandSymbol').each(function (index) {
        var text = $(this).attr("symbol");
        $(this).html(text);
    });


    $('.brandNameLink').click(function (e) {
        e.preventDefault();

        //disabling page scrolling
        var top = $(window).scrollTop();
        var left = $(window).scrollLeft();
        $('body').css('overflow', 'hidden');
        $(window).scroll(function () {
            $(this).scrollTop(top).scrollLeft(left);
        });

        $('.scrollToTop').hide();

        $('#brandProductPopup').center();
        $('#brandProductPopup').show();

        var brandName = $(this).attr('brandName');
        var tagObj = { brand: $(this).attr('brandName') };

        var callUrl = "../Services/SearchProductsByBrands";
        if ($('#brandsAZType').val() == "retailer") {
            callUrl = "../Services/SearchProductsByRetailer";
        }

        $('.brandProductPopupContent').html('<img class="brandProductPopupContentProgress" alt="" src="http://tagpin.co.uk/media/SystemPics/progress.gif" />');
        $.ajax({
            url: callUrl,
            type: "POST",
            data: JSON.stringify(tagObj),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('.brandProductPopupHeaderBrandName').html(brandName);
                var htmlCode = "";
                var counter = 1;
                for (var i = 0; i < data.length; i++) {
                    var currency = '&#163;';
                    if (data[i].Currency == 'USD') {
                        currency = '&#36;';
                    }
                    if (counter == 1) {
                        htmlCode += '<div class="brandsAZProductCellLine">';
                    }
                    htmlCode += '<div class="brandsAZProductCell">';
                    htmlCode += '<div class="brandsAZProductCellName"><p>' + data[i].ProductNameFull + '</p></div>';
                    htmlCode += '<img src="' + data[i].Image + '" />';
                    htmlCode += '<div class="brandsAZProductCellFooter"><p class="currencySpace">' + currency + '</p><p>' + data[i].Price + '</p><div class="brandsAZCopyLink" link="' + ServerUrl + data[i].ProductJsonLink + '"><p>Copy Link</p></div></div>'
                    htmlCode += '</div>';
                    if (counter == 4) {
                        htmlCode += '</div><div class="clear"></div>';
                        counter = 0;
                    }
                    counter = counter + 1;
                }
                $('.brandProductPopupContent').html(htmlCode);
                $('.brandsAZCopyLink').click(function (e) {
                    window.prompt("Press Ctrl + C to copy link", $(this).attr('link'));
                });
            },
            error: function () {
                return true;
            }
        });
    });
};

jQuery.fn.unmarkSymbols = function () {
    this.removeClass('brandsAZSymbolActive');
}

jQuery.fn.markFirstSymbol = function () {
    this.removeClass('brandsAZSymbolActive');
    this.first().addClass('brandsAZSymbolActive');
}

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
}
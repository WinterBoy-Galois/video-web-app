var MediaServerUrl = 'http://tagpin.co.uk/media'

$(document).ready(function () {

    //CPC agreement code
    $(".cpcAgreementAgreeBtn").click(function (e) {
        $.ajax({
            url: "../Embed/AcceptCpcAgreement",
            type: "POST",
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $("#cpcConfirmationWindow").hide();
            },
            error: function () {
                return true;
            }
        });
    });

    var cpcConfirmMarginLeft = ($('#cpcConfirmationWindow').width() - $('.cpcConfirmationWindowContent').width()) / 2;
    $('.cpcConfirmationWindowContent').css('margin-left', cpcConfirmMarginLeft);

    updateCurrencyRates();
    updateUserLocation();

    //pre-fill search box
    $.ajax({
        url: "../Services/PreFillCreateTagSearchBox",
        type: "POST",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            setTimeout(function () {
                fillSearchResults(data);
            }, 300);
        },
        error: function () {
            return true;
        }
    });

    //hide advanced search
    $('.advancedSearchPanel').hide();
    $(".advancedSearchHeader").click(function (e) {
        if ($('.advancedSearchPanel').attr('isVisible') == 'true') {
            $('#advancedSearchArrowDown').hide();
            $('#advancedSearchArrowRight').show();
            $('.advancedSearchPanel').hide();
            $('.advancedSearchPanel').attr('isVisible', 'false');
        }
        else {
            $('#advancedSearchArrowDown').show();
            $('#advancedSearchArrowRight').hide();
            $('.advancedSearchPanel').show();
            $('.advancedSearchPanel').attr('isVisible', 'true');
        }
    });

    $('#manualAdd').hide();
    $('#manualSuccess').hide();
    $('.progressWrapper').hide();
    $('.errorMessage').hide();
    $('#searchSuccess').hide();
    $('.searchTagRight').hide();

    $('#searchText').watermark("Type Brand Name...");

    $('#link').watermark("Link");
    $('#designer').watermark("Designer");
    $('#tags').watermark("Text tags,");
    $('#pounds').watermark("pounds");
    $('#pence').watermark("pence");

    $("#searchText").autocomplete({
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
        open: function () {
            $(this).autocomplete('widget').css('z-index', 100);
            return false;
        }
    });

    $(".checkGender input[type=checkbox]").click(function (e) {
        $(this).parent().find('input[type=checkbox]').removeAttr('checked');
        $(this).attr('checked', 'checked');
        $(this).parent().find('input[type=hidden]').val($(this).val());
    });

    $(".checkCommission input[type=checkbox]").click(function (e) {
        if ($(this).parent().find('input[type=checkbox]:checked').length == 0
                || $(this).parent().find('input[type=checkbox]:checked').length == 2) {
            $(this).parent().find('input[type=hidden]').val('');
        }
        else {
            var value = $(this).parent().find('input[type=checkbox]:checked').val();
            $(this).parent().find('input[type=hidden]').val(value);
        }
    });

    $("#searchTab").click(function (e) {
        e.preventDefault();
        $('#manualAdd').hide();
        $('#searchAdd').show();
        $('#manualTab').removeClass('activeTab');
        $('#searchTab').addClass('activeTab');
    });

    var windowWidth = $("#windowWidth").val();
    $('.searchResults').width(windowWidth - 320);
    $('.searchResultsHeader').width(windowWidth - 300);
    var progressLeftPos = $('.searchResults').width() / 2 - 10;
    var progressToptPos = $('.searchResults').height() / 2 - 30;
    $('.searchTagSuccess h1').css('margin-left', (progressLeftPos + 120) + 'px');
    $('.searchTagSuccess h1').css('margin-top', progressToptPos + 'px');
    $('.searchTagSuccessHint').css('margin-left', (progressLeftPos + 65) + 'px');

    $("#searchTags").click(function (e) {
        e.preventDefault();

        var errDetected = false;

        if ($('#searchCategories').multiselect("getChecked").length == 0) {
            errDetected = true;
            $(this).parent().children('button').first().addClass("inputTextErrorMode");
        }
        else {
            $(this).parent().children('button').first().removeClass("inputTextErrorMode");
        }

        if (errDetected == true) {
            return;
        }

        $('.searchResults').html('<div style="margin-left:' + progressLeftPos + 'px; margin-top:' + progressToptPos + 'px" ><img alt="" src="http://tagpin.co.uk/media/SystemPics/progress.gif" /></div>');


        var storedIDs = "";
        $('#stores').multiselect("getChecked").each(function () {
            storedIDs += $(this).val() + ",";
        });

        var prices = "";
        $('#prices').multiselect("getChecked").each(function () {
            prices += $(this).val() + ",";
        });

        var colours = "";
        $('#colours').multiselect("getChecked").each(function () {
            colours += $(this).val() + ",";
        });

        var parCategory = ($('#searchCategories').multiselect("getChecked")).val();
        var gender = $('#searchGender').val();

        var searchObj = { text: $('#searchText').val(),
            category: parCategory,
            storeIDs: storedIDs,
            prices: prices,
            colours: colours,
            iswomen: gender,
            cpc: $('#searchCommission').val()
        };
        $.ajax({
            url: "../Services/SearchProducts",
            type: "POST",
            data: JSON.stringify(searchObj),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                fillSearchResults(data);
            },
            error: function () {
                return true;
            }
        });
    });

    $("#addTagsButton").click(function (e) {
        e.preventDefault();
        var errDetected = false;

        if ($('.searchResultTagBagItem').length == 0) {
            errDetected = true;
        }

        if (errDetected == true) {
            return;
        }

        var tags = new Array();

        for (var i = 0; i < $('.searchResultTagBagItem').length; i++) {
            var tagBagItem = $('.searchResultTagBagItem').eq(i);
            tags[i] = tagBagItem.data('productData');
        }

        var tagsObj = { imageID: $('#imageID').val(),
            category: ($('#searchCategories').multiselect("getChecked")).val(),
            positionTop: $('#positionTop').val(),
            positionLeft: $('#positionLeft').val(),
            userFolder: $("#signedinuserfolder").val(),
            imagewidth: $('#imageWidth').val(),
            imageheight: $('#imageHeight').val(),
            iswomen: $('#searchGender').val(),
            tags: tags
        };

        $('.searchTagWrapper').hide();
        $('.searchTagRight').hide();
        $('.progressWrapper').show();

        $.ajax({
            url: "../Services/AddTags",
            type: "POST",
            data: JSON.stringify(tagsObj),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('.progressWrapper').hide();
                $('#searchSuccess').show();
            },
            error: function () {
                return true;
            }
        });

    });

    $("#manualTab").click(function (e) {
        e.preventDefault();
        $('#manualAdd').show();
        $('#searchAdd').hide();
        $('#searchTab').removeClass('activeTab');
        $('#manualTab').addClass('activeTab');
    });

    $("#searchCategories").multiselect({
        noneSelectedText: 'Category <span style="font-style:italic;font-size:8pt;">(* required)</span>',
        selectedList: 1,
        header: false,
        height: 250,
        multiple: false
    });

    $("#categories").multiselect({
        noneSelectedText: "Categories",
        selectedList: 1,
        header: false,
        height: 250,
        multiple: false
    });

    $("#prices").multiselect({
        noneSelectedText: "Price",
        header: false,
        height: 250,
        multiple: true,
        position: {
            my: 'left center',
            at: 'left bottom'
        },
        selectedText: function (numChecked, numTotal, checkedItems) {
            return 'Price - ' + numChecked + ' selected';
        }
    });

    $("#colours").multiselect({
        noneSelectedText: "Colour",
        header: false,
        height: 250,
        multiple: true,
        position: {
            my: 'left center',
            at: 'left bottom'
        },
        selectedText: function (numChecked, numTotal, checkedItems) {
            return 'Colour - ' + numChecked + ' selected';
        }
    });

    $("#stores").multiselect({
        noneSelectedText: "Retailer",
        header: "None",
        height: 250,
        multiple: true,
        position: {
            my: 'left center',
            at: 'left bottom'
        },
        selectedText: function (numChecked, numTotal, checkedItems) {
            return 'Retailer - ' + numChecked + ' selected';
        }
    }).multiselectfilter({ label: 'FILTER', width: 200, placeholder: '', autoReset: true });

    $("#pounds,#pence").keydown(function (event) {
        // Allow: backspace, delete, tab, escape, and enter
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        // Allow: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });

    $("#tagImagePrev").click(function (e) {
        e.preventDefault();
        var index = parseInt($("#selectedTagImageIndex").val());
        if (index > 1) {
            var tagImageID = "#tagImage" + index;
            index = index - 1;
            var prevTagImageID = "#tagImage" + index;
            $(tagImageID).hide();
            $(prevTagImageID).show();
            $("#selectedTagImageUrl").val($(prevTagImageID).attr("src"));
            $("#selectedTagImageIndex").val(index);
            $(".tagImageGalleryCounter").html('<b>' + index + '/' + $("#tagImagesCount").val() + '</b>');
        }
    });

    $("#tagImageNext").click(function (e) {
        e.preventDefault();
        var index = parseInt($("#selectedTagImageIndex").val());
        var tagImageID = "#tagImage" + index;
        index = index + 1;
        var nextTagImageID = "#tagImage" + index;
        if ($(nextTagImageID).length > 0) {
            $(tagImageID).hide();
            $(nextTagImageID).show();
            $("#selectedTagImageUrl").val($(nextTagImageID).attr("src"));
            $("#selectedTagImageIndex").val(index);
            $(".tagImageGalleryCounter").html('<b>' + index + '/' + $("#tagImagesCount").val() + '</b>');
        }
    });

    jNewGallery = $(".tagImageGallery");

    $("#showTagImages").click(function (e) {
        e.preventDefault();

        var errDetected = false;

        if ($('#link').val().length == 0) {
            errDetected = true;
            $('#link').addClass("inputTextErrorMode");
        }
        else {
            $('#link').removeClass("inputTextErrorMode");
        }

        if (errDetected == true) {
            return;
        }

        $(this).removeClass("inputTextErrorMode");
        $(this).hide();

        var link = $('#link').val();

        parObj = { url: link };

        jNewGallery.html('<img alt="" src="' + MediaServerUrl + '/SystemPics/progress.gif" />');
        $("#selectedTagImageUrl").val("");
        $("#selectedTagImageIndex").val("");

        $.ajax({
            url: "../Services/GetTagImages",
            type: "POST",
            data: JSON.stringify(parObj),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (model) {
                //progress.remove();
                if (model.Urls.length > 0) {

                    var data = model.Urls;

                    var baseURL = '';
                    var index = -1;

                    if (link.indexOf("com") > -1) {
                        index = link.indexOf("com");
                        baseURL = link.substring(0, index + 3);
                    }
                    else if (link.indexOf("co.uk") > -1) {
                        index = link.indexOf("co.uk");
                        baseURL = link.substring(0, index + 5);
                    }

                    var counter = 1;
                    jNewGallery.html('<p class="tagImageGalleryCounter"></p><div class="clear"></div>');
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].indexOf("http") != -1
                                            || data[i].indexOf("//") != -1) {
                            jNewGallery.append('<img style="display:none;" alt="" id="tagImage' + counter + '" src="' + data[i] + '" />');
                            counter = counter + 1;
                        }
                    }

                    if (baseURL.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].indexOf("http") == -1
                                                && data[i].indexOf("//") == -1) {

                                var partialUrl = data[i];

                                if (partialUrl.indexOf("/") != 0) {
                                    partialUrl = '/' + partialUrl;
                                }

                                jNewGallery.append('<img style="display:none;" alt="" id="tagImage' + counter + '" src="' + baseURL + partialUrl + '" />');
                                counter = counter + 1;
                            }
                        }
                    }

                    jNewGallery.append('<div class="clear"></div><div class="noItemImageContainer"><input id="noitemimage" type="checkbox" value="true" name="noitemimage"><label for="noitemimage">can\'t find a perfect image</label></div><div class="clear"></div>');

                    $("#tagImagesCount").val(counter - 1);
                    if (counter == 1) {
                        $(".tagImageGalleryCounter").html('<b>0/' + $("#tagImagesCount").val() + '</b>');
                    }
                    else {
                        $(".tagImageGalleryCounter").html('<b>' + model.Index + '/' + $("#tagImagesCount").val() + '</b>');
                    }
                    var initialImageID = "#tagImage" + model.Index;
                    $(initialImageID).show();
                    $("#selectedTagImageUrl").val($(initialImageID).attr("src"));
                    $("#selectedTagImageIndex").val(model.Index);
                    $("#tagImagesCount").val(counter - 1);
                }
                else {
                    jNewGallery.html('<div class="clear"></div><div class="noItemImageContainer"><input id="noitemimage" type="checkbox" value="true" name="noitemimage" checked="checked"><label for="noitemimage">can\'t find a perfect image</label></div><div class="clear"></div>');
                }
                return true;
            },
            error: function () {
                return true;
            }
        });

    });

    $('#link').bind('paste', function () {
        var element = this;
        setTimeout(function () {
            var text = $(element).val();
            if (text.indexOf("Services/GetAffiliateProductByID?") !== -1) {
                $.ajax({
                    url: text,
                    type: "GET",
                    datatype: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $('#storeID').val(data.StoreID)
                        $('#link').val(data.Link);
                        $('#designer').val(data.ProductName);
                        if (data.Price.indexOf(".") !== -1) {
                            var index = data.Price.indexOf(".");
                            $('#pounds').val(data.Price.substring(0, index));
                            $('#pence').val(data.Price.substring(index + 1, data.Price.length));
                        }
                        else {
                            $('#pounds').val(data.Price);
                        }

                        if (data.Gender.indexOf("Male") !== -1) {
                            $("#checkmen").parent().find('input[type=checkbox]').removeAttr('checked');
                            $("#checkmen").attr('checked', 'checked');
                            $('#manualGender').val('false');
                        }

                        //image
                        $("#showTagImages").hide();
                        jNewGallery.html('<p class="tagImageGalleryCounter"></p><div class="clear"></div>');
                        jNewGallery.append('<img alt="" id="tagImage1" src="' + data.Image + '" />');
                        jNewGallery.append('<div class="clear"></div><div class="noItemImageContainer"><input id="noitemimage" type="checkbox" value="true" name="noitemimage"><label for="noitemimage">can\'t find a perfect image</label></div><div class="clear"></div>');
                        $("#selectedTagImageUrl").val(data.Image);
                        $("#selectedTagImageIndex").val(1);
                        $("#tagImagesCount").val(1);
                    }
                });
            }
            else {
                $("#showTagImages").show();
                jNewGallery.html('');
            }
        }, 100);
    });

    $("#addTagButton").click(function () {

        var errDetected = false;

        if ($('#link').val().length == 0) {
            errDetected = true;
            $('#link').addClass("inputTextErrorMode");
        }
        else {
            $('#link').removeClass("inputTextErrorMode");
        }

        if ($('#categories').multiselect("getChecked").length == 0) {
            errDetected = true;
            $(this).parent().children('button').addClass("inputTextErrorMode");
        }
        else {
            $(this).parent().children('button').removeClass("inputTextErrorMode");
        }

        if ($('#pounds').val().length == 0) {
            errDetected = true;
            $('#pounds').addClass("inputTextErrorMode");
        }
        else {
            $('#pounds').removeClass("inputTextErrorMode");
        }

        if ($("#noitemimage").is(':checked')) {
            $('#selectedTagImageUrl').val('empty');
        }

        if ($('#selectedTagImageUrl').val().length == 0) {
            errDetected = true;
            $('#showTagImages').addClass("inputTextErrorMode");
        }
        else {
            $('#showTagImages').removeClass("inputTextErrorMode");
        }

        if (errDetected == true) {
            return;
        }

        var isItemImageValue = false;
        if ($("#noitemimage").is(':checked')) {
            isItemImageValue = true;
        }

        var price = $('#pounds').val() + '.' + $('#pence').val();

        var tagObj = { imageID: $('#imageID').val(),
            link: $('#link').val(),
            designer: $('#designer').val(),
            category: ($('#categories').multiselect("getChecked")).val(),
            positionTop: $('#positionTop').val(),
            positionLeft: $('#positionLeft').val(),
            isFeedImage: true,
            tagImageUrl: $("#selectedTagImageUrl").val(),
            userFolder: $("#signedinuserfolder").val(),
            noItemImage: isItemImageValue,
            price: price,
            imagewidth: $('#imageWidth').val(),
            imageheight: $('#imageHeight').val(),
            storeID: $('#storeID').val(),
            currency: 'GBP',
            iswomen: $('#manualGender').val(),
            tagBigImagUrl: $("#selectedTagImageUrl").val()
        };

        $('.createTagWrapper').hide();
        $('.progressWrapper').show();

        $.ajax({
            url: "../Services/AddTag",
            type: "POST",
            data: JSON.stringify(tagObj),
            datatype: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('.progressWrapper').hide();
                if (data != null
                        && isEmpty(data.ErrorMessage)) {
                    $('.createTagWrapper').hide();
                    $('#addedTagID').val(data.TagID);
                    $('#manualSuccess').show();
                }
                else if (isEmpty(data.ErrorMessage) == false) {
                    $('.createTagWrapper').show();
                    $('.errorMessage').html(data.ErrorMessage);
                    $('.errorMessage').show();
                }
            },
            error: function () {
                return true;
            }
        });

    });

});

function fillSearchResults(data) {

    var itemsPerRowCount = parseInt($('.searchResults').width() / 170);
    if (itemsPerRowCount * 170 + itemsPerRowCount * 15 > $('.searchResults').width()) {
        itemsPerRowCount = itemsPerRowCount - 1;
    }

    $('.searchResults').html('');
    if (data.length > 0) {

        if (data[0].Category == 'Message') {
            $('.searchResults').append('<div class="noSearchResultsMessage">' + data[0].ProductName + '</div>');
            data.splice(0, 1);
        }

        var searchResultItemID = '';
        var counter = 1;
        for (var i = 0; i < data.length; i++) {

            var convertedPrice = convertPrice(data[i].Price, data[i].Currency);

            var cpcLogoHtml = '';
            if (data[i].CPC == 1) {
                cpcLogoHtml = '<img class="cpcLogo" src="http://tagpin.co.uk/media/systempics/cpclogo.png" width="30px" height="30px" />';
            }

            $('.searchResults').append('<div id="' + data[i].ItemID + '" class="searchResultItem">'
                                                        + '<p class="searchResultItemBrandName">' + data[i].ProductName + '</p>'
                                                        + '<div class="clear"></div><p class="searchResultItemStoreName">' + data[i].StoreName.substring(0, 28) + '</p>'
                                                        + '<div class="clear"></div><div class="searchResultItemImageWrapper">' + cpcLogoHtml + '<img class="searchResultItemMainImage" src="' + data[i].Image + '" /></div>'
                                                        + '<div class="clear"></div><p class="searchResultItemPrice">' + convertedPrice.currency + '</p><p>' + convertedPrice.price + '</p>'
            //+ '<div class="clear"></div><a class="searchResultBigImage" href="' + data[i].BigImage + '"><b>big image</b></a>'
                                                        + '</div>');
            if (counter == itemsPerRowCount) {
                $('.searchResults').append('<div class="clear"></div>');
                counter = 0;
            }
            counter += 1;
            searchResultItemID = '#' + data[i].ItemID;
            $(searchResultItemID).data('productData', data[i]);
        }

        $(".searchResultItemMainImage").click(function (e) {

            $('.searchTagRight').show();

            var parentDiv = $(this).closest('.searchResultItem');
            var data = parentDiv.data('productData');

            //we perform category restrictions just in tagging, not in store
            if ($("#taggingWindow").length > 0) {
                //if category is not set
                if ($('#searchCategories').multiselect("getChecked").length == 0) {
                    //set product's category
                    var dataarray = data.Category.split(",");
                    $('#searchCategories').val(dataarray);
                    $('#searchCategories').multiselect("refresh");
                }
                else {
                    //if product's category is different from what is set in drop down, and tags bag is filled
                    if (($('#searchCategories').multiselect("getChecked")).val() !== data.Category
                            && $('.searchResultTagBagItem').length > 0) {
                        $('#searchCategories').next('button').first().addClass("inputTextErrorMode");
                        return;
                    }
                    else if (($('#searchCategories').multiselect("getChecked")).val() !== data.Category
                            && $('.searchResultTagBagItem').length == 0) {
                        $('#searchCategories').next('button').first().removeClass("inputTextErrorMode");
                        //set product's category
                        var dataarray = data.Category.split(",");
                        $('#searchCategories').val(dataarray);
                        $('#searchCategories').multiselect("refresh");
                    }
                    else {
                        $('#searchCategories').next('button').first().removeClass("inputTextErrorMode");
                    }
                }
            }

            var divID = parentDiv.attr('id');

            //un-selecting item
            if ($(this).is('.searchResultItemSelected')) {
                $(this).removeClass('searchResultItemSelected');
                var bagDivID = '#bag' + divID;
                $(bagDivID).remove();

                //we perform category restrictions just in tagging, not in store
                if ($("#taggingWindow").length > 0) {
                    if ($(".searchResultTagBagItem").length > 0) {
                        $("#searchCategories").multiselect("disable");
                    }
                    else {
                        $("#searchCategories").multiselect("enable");
                    }
                }

            }
            else {
                $(this).addClass('searchResultItemSelected');
                var tagBagItemID = '#bag' + divID;
                $('.searchResultTagBag').append('<div id="bag' + divID + '" class="searchResultItem searchResultTagBagItem"><div class="tagRemove"><p><b>Remove</b></p></div>'
                                                                + '<div class="clear"></div><img src="' + $(this).attr("src") + '"</div>');
                if ($(".searchResultTagBagItem").length > 1) {
                    $(".searchResultTagBagItem:last").detach().insertBefore(".searchResultTagBagItem:first");
                }
                $(tagBagItemID).data('productData', parentDiv.data('productData'));
                $('.searchResultTagBag img').removeClass('searchResultItemSelected');

                $(".tagRemove").click(function (e) {
                    var parentBagDiv = $(this).parent();
                    var searchDivID = '#' + parentBagDiv.attr('id').replace("bag", "") + ' img';
                    parentBagDiv.remove();
                    $(searchDivID).removeClass('searchResultItemSelected');
                    if ($('.searchResultTagBag img').length == 1) {
                        $('.tagBagHeader p').html('<b>Tag bag</b> (1 product)');
                    }
                    else {
                        $('.tagBagHeader p').html('<b>Tag bag</b> (' + $('.searchResultTagBag img').length + ' products)');
                    }

                    //we perform category restrictions just in tagging, not in store
                    if ($("#taggingWindow").length > 0) {
                        if ($(".searchResultTagBagItem").length > 0) {
                            $("#searchCategories").multiselect("disable");
                        }
                        else {
                            $("#searchCategories").multiselect("enable");
                        }
                    }

                });

                //we perform category restrictions just in tagging, not in store
                if ($("#taggingWindow").length > 0) {
                    $("#searchCategories").multiselect("disable");
                }
            }

        });
    }
    else {
        $('.searchResults').html('<p class="searchResultsNoResults" style="margin-left:' + (progressLeftPos - 20) + 'px; margin-top:' + (progressToptPos + 10) + 'px">No results</p>');
    }
}
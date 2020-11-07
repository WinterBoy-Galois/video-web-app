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

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

function updateCurrencyRates() {
    $.ajax({
        url: "../Services/GetCurrencyRates",
        type: "GET",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                $("#UsdToGbpRate").val(data.UsdToGbpRate);
                $("#UsdToEurRate").val(data.UsdToEurRate);
                $("#EurToGbpRate").val(data.EurToGbpRate);
            }
        },
        error: function () {
            return true;
        }
    });
}

function updateUserLocation() {
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
        },
        error: function () {
            return true;
        }
    });
}

function convertPrice(price, currency) {

    if ($('#UserCountry').val() == 'US') {
        if (currency == 'GBP') {
            currency = '&#36;';
            var usdToGbpRate = $("#UsdToGbpRate").val();
            price = (price / usdToGbpRate).toFixed(2);
        }
        else if (currency == 'EUR') {
            currency = '&#36;';
            var usdToEurRate = $("#UsdToEurRate").val();
            price = (price / usdToEurRate).toFixed(2);
        }
        else {
            currency = '&#36;';
        }
    }
    else if (($('#UserCountry').val() == 'FR')
                        || ($('#UserCountry').val() == 'DE')
                        || ($('#UserCountry').val() == 'ES')
                        || ($('#UserCountry').val() == 'IT')
                        || ($('#UserCountry').val() == 'SE')
                        || ($('#UserCountry').val() == 'FI')
                        || ($('#UserCountry').val() == 'IE')
                        || ($('#UserCountry').val() == 'NL')
                        || ($('#UserCountry').val() == 'DK')) {
        if (currency == 'GBP') {
            currency = '&#128;';
            var eurToGbpRate = $("#EurToGbpRate").val();
            price = (price / eurToGbpRate).toFixed(2);
        }
        else if (currency == 'USD') {
            currency = '&#128;';
            var usdToEurRate = $("#UsdToEurRate").val();
            price = (price * usdToEurRate).toFixed(2);
        }
        else {
            currency = '&#128;';
        }
    }
    else {
        if (currency == 'EUR') {
            currency = '&#163;';
            var eurToGbpRate = $("#EurToGbpRate").val();
            price = (price * eurToGbpRate).toFixed(2);
        }
        else if (currency == 'USD') {
            currency = '&#163;';
            var usdToEurRate = $("#UsdToEurRate").val();
            price = (price * usdToEurRate).toFixed(2);
        }
        else {
            currency = '&#163;';
        }
    }

    return { price: price, currency: currency };

}
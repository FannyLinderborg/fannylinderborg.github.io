"use strict";

/*
 * Local storage could be implemented to save answers. However, the value to the
 * user would probably not be huge, since they would probably want to use
 * different browsers and/or computers.
 * An alternative, to bridge over this, is to implement log in via other
 * services (so that the user won't have to remember another u/p). The value of
 * that would be greater than local storage.
 * It is my belief that the user probably already has a way to handle saving
 * drafts to solutions to caches, so this functionality wouldn't be used that
 * much.
 */

/*
 * Check if a string is the empty string.
 * Operates on the string.
 * Returns true if the sting does not contain any characters, else false.
 */
var isEmptyString = function() {
    return this.value === "";
};

/*
 * Check if all inputs are filled.
 * Returns true if all inputs are filled, else false.
 */
var allInputsFilled = function() {
    var $emptyInputs = $("input[type=number]").filter(isEmptyString);
    return !($emptyInputs.length);
};

// Uncommented for a reason ;) Basically, nothing to help you here.
var calculate_coordinates = function(e) {
    var $coordinates = $("#coordinates");

    if (!allInputsFilled()) {
        $coordinates.text("Du har inte svarat på alla frågor än.");
        $coordinates.attr("class", "not_finished");
        return;
    }

    var c = Number($("input[name=c]").val());
    var analys = Number($("input[name=analys]").val()) + 0.34;
    var doa = Number($("input[name=doa]").val());
    var diskret = Number($("input[name=diskret]").val());
    var java = Number($("input[name=java]").val());
    var systemnara = Number($("input[name=systemnara]").val());
    var statistik = Number($("input[name=statistik]").val());
    var datorteknik = Number($("input[name=datorteknik]").val());
    var datakom = Number($("input[name=datakom_app]").val() + $("input[name=datakom_trans]").val() + $("input[name=datakom_internet]").val() + $("input[name=datakom_lank]").val());
    var linjarX = Number($("input[name=linjar_x]").val());
    var linjarY = Number($("input[name=linjar_y]").val());
    var linjarZ = Number($("input[name=linjar_z]").val());
    var darkAtkomst = Number($("input[name=dark_atkomst]").val());
    var darkFlyktighet = Number($("input[name=dark_flyktighet]").val());
    var sekant2 = Number($("input[name=sekant_2]").val());
    var sekant3 = Number($("input[name=sekant_3]").val());
    var sekantKonvergerat = Number($("input[name=sekant_konvergerat]").val());
    var haskell = Number($("input[name=haskell]").val());
    var pvtAktivitet = Number($("input[name=pvt_aktivitet]").val());
    var pvtTillstand = Number($("input[name=pvt_tillstand]").val());
    var pvtAnvandarfall = Number($("input[name=pvt_anvandarfall]").val());

    var a = sekantKonvergerat.toString() + (haskell + pvtAnvandarfall).toString() + pvtTillstand.toString() + (systemnara * systemnara + pvtAktivitet).toString() + java.toString() + doa.toString() + darkFlyktighet.toString() + sekant2.toString();

    var b = datorteknik - Number(a) - (linjarZ * statistik * 1000) - (darkAtkomst - datakom - diskret * haskell / c) * analys + sekant3;

    var north = linjarX + b - (sekant3 / (haskell * haskell * c * c)) - Math.ceil(analys + pvtTillstand) / 10;
    var east = linjarY - b - ((sekant2 + systemnara) / 1000);

    $coordinates.text("N 63 " + (north).toFixed(3) + " E 020 " + (east).toFixed(3));
    $coordinates.attr("class", "");
};

// Add event listener to submit button.
var on_load = function() {
    var $submitButton = $("input[type=submit]");
    $submitButton.click(calculate_coordinates);
};

$(document).ready(on_load);

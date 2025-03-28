"use strict";
var $ = jQuery;
$(document).ready(function() {
    $(document).on('click', '.accordionWrapper .accordionHeader', function(e) {
        e.stopImmediatePropagation();
       $(this).next().slideToggle(400);
        if ($(this).parent('.accordionWrapper').hasClass('tabClose')) {
            $(this).parent('.accordionWrapper').removeClass('tabClose').addClass('tabOpen');
        } else {
            $(this).parent('.accordionWrapper').removeClass('tabOpen').addClass('tabClose');
        }
    });
});
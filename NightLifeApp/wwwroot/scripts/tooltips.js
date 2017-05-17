$(document).ready(function () {
    $('[data-toggle=tooltip]').hover(function () {
        // on mouseenter
        $(this).tooltip('show');
    }, function () {
        // on mouseleave
        $(this).tooltip('hide');
    });
});
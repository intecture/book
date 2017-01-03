function showhide_lang_content(value) {
    $('.lang-content').hide();
    $('.' + value).show();
}

$(document).ready(function() {
    var q = document.URL.split('?')[1];
    if (q != null) {
        var l = /^inlang=(c|php|rust)/.exec(q);
    }

    if (l != null) {
        showhide_lang_content('lang-' + l[1]);
    } else {
        showhide_lang_content('lang-rust');
    }

    $('select.lang-selector').change(function() {
        showhide_lang_content(this.value);
    });
});

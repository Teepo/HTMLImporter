document.addEventListener('DOMContentLoaded', function() {

    var templates = document.querySelectorAll('template');

    (new HTMLImporter.default).run(templates);
});
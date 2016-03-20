document.addEventListener('DOMContentLoaded', function() {

    var templates = document.querySelectorAll('template');

    (new Importer).run(templates);
});
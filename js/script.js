document.addEventListener('DOMContentLoaded', function() {

    var templates = document.querySelectorAll('template');

    var $I = new Importer;

    $I.run(templates);
});
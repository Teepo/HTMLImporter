import { HTMLImporter } from './app.js';

document.addEventListener('DOMContentLoaded', function() {

    var templates = document.querySelectorAll('template');

    new HTMLImporter(templates);
});
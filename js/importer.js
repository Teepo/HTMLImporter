var Importer = function()
{
    var $this = this;

    this.onload = function(e)
    {
        if ($this.link.import == null)
            return false;

        $this.template.outerHTML = $this.link.import.documentElement.outerHTML;

        $this.process();
    };

    this.onerror = function(e)
    {
        console.error('Importer > onError', e);
    };
};

Importer.prototype = {

    templates: null,

    supportsImports: function()
    {
        return 'import' in document.createElement('link');
    },

    run: function(templates) {

        this.templates = Object.keys(templates).map(function (key) {return templates[key]});

        this.process();
    },

    process: function()
    {
        this.template = this.templates.shift();

        if (this.template == null)
            return false;

        try {

            this.link = this.emulateLink();

        } catch(e) {
            console.error('HTMLImporter > emulateLink', e);
        }
    },

    emulateLink: function()
    {
        var link = document.createElement('link');

        link.rel = "import";
        link.href = this.template.getAttribute('rel');
        link.onload = this.onload;
        link.onerror = this.onerror;

        document.head.appendChild(link);

        return link;
    }
};
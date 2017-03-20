export class HTMLImporter {

    /**
     * @param {NodeList} nodes
     *
     * @description Iterale all nodes, and store them.
     */
    constructor(nodes) {

        this.templates = Object.keys(nodes).map(key => {
            return nodes[key];
        });

        this.process();
    }

    /**
     * @method
     *
     * @description Iterate all stored templates, and load them.
     */
    process() {

        this.template = this.templates.shift();

        if (this.template == null)
            return false;

        try {

            this.link = this.emulateLink();

        } catch(e) {
            console.error(new Error('HTMLImporter > emulateLink'));
        }
    }

    /**
     * @method
     *
     * @description Create and append in document fake link node
     *
     */
    emulateLink() {

        const link = document.createElement('link');

        link.rel = "import";
        link.href = this.template.getAttribute('url');

        link.onload = this.onload.bind(this);
        link.onerror = this.onerror.bind(this);

        document.head.appendChild(link);

        return link;
    }

    /**
     * @description Test import supports in link node
     *
     * @return boolean
     */
    isSupportingImport() {

        return 'import' in document.createElement('link');
    }

    /**
     * @method
     *
     * @description Fired when link node is loaded
     *
     * @fires HTMLImporter#load
     */
    onload() {

        if (this.link.import === null)
            return false;

        this.template.outerHTML = this.link.import.documentElement.outerHTML;

        this.process();
    }

    /**
     * @param {Object} event
     *
     * @fires HTMLImporter#error
     */
    onerror(event) {
        console.error(new Error('HTMLImporter > error', event));
    }
}
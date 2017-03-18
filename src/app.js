export class HTMLImporter {

    /**
     * @param NodeList nodes
     *
     */
    run(nodes) {

        this.templates = Object.keys(nodes).map(key => {
            return nodes[key];
        });

        this.process();
    }

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
     *
     * @return boolean
     */
    isSupportingImport() {

        return 'import' in document.createElement('link');
    }

    onload() {

        if (this.link.import == null)
            return false;

        this.template.outerHTML = this.link.import.documentElement.outerHTML;

        this.process();
    }

    onerror() {
        console.error(new Error('HTMLImporter > error'));
    }
}
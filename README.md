# HTMLImporter

## Getting started

```html
<template rel="hello.html"></template>
```


```js
document.addEventListener('DOMContentLoaded', function() {

    var templates = document.querySelectorAll('template');

    (new Importer).run(templates);
});
```

All <template> tag will be replace by theirs "rel" content.

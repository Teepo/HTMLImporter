# HTMLImporter

## Getting started

```js
npm install
npm run start
```

Run your favorite browser and go to http://localhost:3000

## Example

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

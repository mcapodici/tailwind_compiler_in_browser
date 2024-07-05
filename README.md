# What this does

It exposes a global function called `tailwindify.compile` that takes html, css (with @apply/@tailwind etc. support) and tailwind config and produces the compiled CSS.

If there is a compilation error than nothing is generated.

This is because Tailwind's postcss doesn't support any kind of "if error, continue". 

However the object returned will have an error field populated.

This uses `safeParser` to allow non-perfect css. However it will still generate errors for things like @apply using non-existant classes.

It is hard coded to specific versions of Tailwind and Postcss, see package.json for details.

# How to use

## Build

```
npm run install

npm run build
```

## Use

Example code, with detection of returned error.

```javascript
tailwindify.compile(htmlString, customCss, userConfig).then(tw => {
    if ('error' in tw) {
        console.log(tw.error.message);
    }
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = tw.css;
    document.head.appendChild(styleSheet);
});
```

Or use this version:

```
tailwindify.run()
```

Which will grab the HTML in the document, and the CSS in `<style type="postcss">` and Config JS in `<script type="tailwind-config">`.

See [`index.html`](index.html) for a an example usage too.

I created this to let me compile Tailwind in the browser for https://langcss.com

# Licence 

MIT License

Copyright (c) 2024 Martin Capodici

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



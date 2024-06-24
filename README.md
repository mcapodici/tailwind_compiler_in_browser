# What this does

It exposes a global function called `tailwindify` that takes html, css (with @apply/@tailwind etc. support) and tailwind config and produces the compiled CSS.

If there is a compilation error than nothing is generated. This is because Tailwind's postcss doesn't support any kind of "if error, continue". However the object returned will have an error field populated.

This uses `safeParser` to allow non-perfect css. However it will still generate errors for things like @apply using non-existant classes.

It is hard coded to specific versions of Tailwind and Postcss, see package.json for details.

# How to use

## Build

```
npm i

npm run build
```

## Use

Example code, with detection of returned error.

```javascript
tailwindify(htmlString, customCss, userConfig).then(tw => {
    if ('error' in tw) {
        console.log(tw.error.message);
    }
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerHTML = tw.css;
    document.head.appendChild(styleSheet);
});
```

See [`index.html`](index.html) for a full example usage.





# fixedviewport.js
A polyfill to implement fixed viewport for desktop browsers. See the demo [here](http://saschanaz.github.io/fixedviewport.js/).

### API

```typescript
declare module FixedViewport {
    function polyfill(width: number, height: number): {
        onDOMContentLoaded: () => void; // to be used before DOMContentLoaded
        direct: () => void; // to be used after DOMContentLoaded
    };
}
```

### Example

```javascript
FixedViewport.polyfill(1920, 1080).onDOMContentLoaded();
```

### Note

This polyfill mocks Internet Explorer's [CSS Device Adaptation](http://dev.w3.org/csswg/css-device-adapt/) implementation. You __MUST__ add proper CSS `@viewport` rule for your fixed viewport, as this polyfill will do nothing for the browsers which natively support the CSS Device Adaptation spec.

This is an example for 1920*1080 viewport.

```css
@-ms-viewport {
  width: 1920px;
  height: 1080px;
}
@viewport {
  width: 1920px;
  height: 1080px;
}
```

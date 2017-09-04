# fixedviewport.js
A polyfill to implement fixed viewport for desktop browsers. See the demo [here](http://saschanaz.github.io/fixedviewport.js/).

### API

```typescript
declare namespace FixedViewport {
  function hasNativeSupport(): boolean;
  function polyfill(width: number, height: number): void;
}
```

### Example

```javascript
FixedViewport.polyfill(1920, 1080);
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

Also note that IE11 and Edge on Windows 10 ended CSS Device Adaptation support [since Anniversary Update](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7970618/) so this library runs in polyfill mode in that case.
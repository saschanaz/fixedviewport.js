# fixedviewport.js
A polyfill to implement fixed viewport for desktop browsers.

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

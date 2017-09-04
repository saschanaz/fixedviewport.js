namespace FixedViewport {
    export function isNativelyFixed() {
        const style = generateStyle();
        // add on head to get document-associated style sheet
        document.head.appendChild(style);
        const firstRule = (style.sheet as CSSStyleSheet).cssRules[0];

        // Checking CSS Device Adaptation support
        // Note: Do not just check existence of CSSRule.VIEWPORT_RULE
        // as MSEdge 16 does not support the spec even with the existence.
        const supportsViewportRule = (firstRule && (firstRule.type & 15) === 15);
        document.head.removeChild(style);
        return supportsViewportRule;
    }
    function generateStyle() {
        const style = document.createElement("style");
        style.textContent = "@-ms-viewport {} @-moz-viewport {} @-webkit-viewport {} @viewport {}";
        return style;
    }

    function rescale(width: number, height: number) {
        const widthRatio = window.innerWidth / width;
        const heightRatio = window.innerHeight / height;
        const min = Math.min(widthRatio, heightRatio);
        const newwidth = Math.max(width, window.innerWidth / min);
        const newheight = Math.max(height, window.innerHeight / min);

        if ("zoom" in document.documentElement.style) {
            document.documentElement.style.zoom = `${min}`;
            return;
        }
        document.documentElement.style.width = `${newwidth}px`;
        document.documentElement.style.height = `${newheight}px`;
        document.documentElement.style.transform = `scale(${min})`;
        document.documentElement.style.marginLeft = `${(min - 1) * newwidth / 2}px`;
        document.documentElement.style.marginTop = `${(min - 1) * newheight / 2}px`;
    }

    function addResizeListener(width: number, height: number) {
        window.addEventListener("resize", () => rescale(width, height));
    }

    function addDOMContentLoadedListener(width: number, height: number) {
        document.addEventListener("DOMContentLoaded", () => rescale(width, height));
    }

    export function polyfill(width: number, height: number) {
        const isNative = isNativelyFixed();
        if (!isNative)
            addResizeListener(width, height);

        return {
            onDOMContentLoaded: () => { if (!isNative) addDOMContentLoadedListener(width, height) },
            direct: () => { if (!isNative) rescale(width, height) }
        };
    }
}

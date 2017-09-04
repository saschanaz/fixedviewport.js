var FixedViewport;
(function (FixedViewport) {
    function hasNativeSupport() {
        var style = generateStyle();
        // add on head to get document-associated style sheet
        document.head.appendChild(style);
        var firstRule = style.sheet.cssRules[0];
        // Checking CSS Device Adaptation support
        // Note: Do not just check existence of CSSRule.VIEWPORT_RULE
        // as MSEdge 16 does not support the spec even with the existence.
        var supportsViewportRule = (firstRule && (firstRule.type & 15) === 15);
        document.head.removeChild(style);
        return supportsViewportRule;
    }
    FixedViewport.hasNativeSupport = hasNativeSupport;
    function generateStyle() {
        var style = document.createElement("style");
        style.textContent = "@-ms-viewport {} @-moz-viewport {} @-webkit-viewport {} @viewport {}";
        return style;
    }
    function rescale(width, height) {
        var widthRatio = window.innerWidth / width;
        var heightRatio = window.innerHeight / height;
        var min = Math.min(widthRatio, heightRatio);
        var newwidth = Math.max(width, window.innerWidth / min);
        var newheight = Math.max(height, window.innerHeight / min);
        if ("zoom" in document.documentElement.style) {
            document.documentElement.style.zoom = "" + min;
            return;
        }
        document.documentElement.style.width = newwidth + "px";
        document.documentElement.style.height = newheight + "px";
        document.documentElement.style.transform = "scale(" + min + ")";
        document.documentElement.style.marginLeft = (min - 1) * newwidth / 2 + "px";
        document.documentElement.style.marginTop = (min - 1) * newheight / 2 + "px";
    }
    function addResizeListener(width, height) {
        window.addEventListener("resize", function () { return rescale(width, height); });
    }
    function addDOMContentLoadedListener(width, height) {
        document.addEventListener("DOMContentLoaded", function () { return rescale(width, height); });
    }
    function polyfill(width, height) {
        if (!hasNativeSupport()) {
            addResizeListener(width, height);
        }
        if (document.readyState === "loading") {
            addDOMContentLoadedListener(width, height);
        }
        else {
            rescale(width, height);
        }
    }
    FixedViewport.polyfill = polyfill;
})(FixedViewport || (FixedViewport = {}));
//# sourceMappingURL=fixedviewport.js.map
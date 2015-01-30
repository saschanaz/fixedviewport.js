module FixedViewport {
    function generateStyle() {
        var style = document.createElement("style");
        style.textContent = "@-ms-viewport {} @-moz-viewport {} @-webkit-viewport {} @viewport {}";
        return style;
    }

    function rescale(width: number, height: number) {
        var widthRatio = window.innerWidth / width;
        var heightRatio = window.innerHeight / height;
        var min = Math.min(widthRatio, heightRatio);
        var newwidth = Math.max(width, window.innerWidth / min);
        var newheight = Math.max(height, window.innerHeight / min);
        document.documentElement.style.width = `${newwidth}px`;
        document.documentElement.style.height = `${newheight}px`;
        document.documentElement.style.transform = `scale(${min})`;
        document.documentElement.style.marginLeft = `${(min - 1) * newwidth / 2}px`;
        document.documentElement.style.marginTop = `${(min - 1) * newheight / 2}px`;
    }

    function addResizeListener(width: number, height: number) {
        window.addEventListener("resize", () => {
            rescale(width, height);
        });
    }

    function addDOMContentLoadedListener(width: number, height: number) {
        document.addEventListener("DOMContentLoaded", () => {
            rescale(width, height);
        });
    }

    export function polyfill(width: number, height: number) {
        var style = generateStyle();
        document.head.appendChild(style);
        var firstRule = (<CSSStyleSheet>document.styleSheets[document.styleSheets.length - 1]).cssRules[0]

        if ((!firstRule || (firstRule.type & 15) !== 15) && window.devicePixelRatio === 1)
            addResizeListener(width, height);

        document.head.removeChild(style);

        return {
            onDOMContentLoaded: () => addDOMContentLoadedListener(width, height),
            direct: () => rescale(width, height)
        };
    }
}

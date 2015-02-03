declare module FixedViewport {
    function isNativelyFixed(width: number, height: number): boolean;
    function polyfill(width: number, height: number): {
        onDOMContentLoaded: () => void;
        direct: () => void;
    };
}

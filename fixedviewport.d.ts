declare module FixedViewport {
    function isNativelyFixed(): boolean;
    function polyfill(width: number, height: number): {
        onDOMContentLoaded: () => void;
        direct: () => void;
    };
}

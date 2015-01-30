declare module FixedViewport {
    function polyfill(width: number, height: number): {
        onDOMContentLoaded: () => void;
        direct: () => void;
    };
}

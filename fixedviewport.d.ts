declare namespace FixedViewport {
    function hasNativeSupport(): boolean;
    function polyfill(width: number, height: number): void;
}

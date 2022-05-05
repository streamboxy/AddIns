export class AddInHelper {
    public static parseOriginURLFromSearchParam(paramName: string): URL {
        const url = new URL(window.location.href);
        const encodedURIComponent = url.searchParams.get(paramName) ?? "";

        try {
            return new URL(decodeURIComponent(encodedURIComponent));
        } catch {
            throw new Error('Cannot parse origin URL.');
        }
    }
}
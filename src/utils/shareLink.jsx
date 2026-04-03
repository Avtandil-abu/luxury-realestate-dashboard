export const generateShareLink = (inputs) => {
    // ვაკოდირებთ მონაცემებს, რომ ლინკში ლამაზად ჩაჯდეს
    const params = btoa(JSON.stringify(inputs));
    const url = new URL(window.location.href);
    url.searchParams.set('data', params);
    return url.toString();
};

export const parseShareLink = () => {
    const params = new URLSearchParams(window.location.search).get('data');
    if (!params) return null;
    try {
        return JSON.parse(atob(params));
    } catch (e) {
        return null;
    }
};
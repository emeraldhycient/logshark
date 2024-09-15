export const getOS = (): string => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';

    if (/android/i.test(userAgent)) {
        return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !('MSStream' in window)) {
        return 'iOS';
    }
    if (/Macintosh/.test(userAgent)) {
        return 'MacOS';
    }
    if (/Windows/.test(userAgent)) {
        return 'Windows';
    }
    if (/Linux/.test(userAgent)) {
        return 'Linux';
    }

    return 'Unknown';
};

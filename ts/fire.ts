declare let firebase: any; // this variable is declared in index.html
export function updateVisits() {
    if (typeof firebase === "undefined") {
        return;
    }
    const ref = firebase.database().ref("visits"); // eslint-disable-line no-undef
    ref.push().set({
        date: Date.now(),
        source: getSource()
    });
}

export function getSource() {
    const x = window.navigator;
    return {
        os: x.platform,
        browser: x.userAgent
    };
}

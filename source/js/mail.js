// this script provides minimal spam protection by only adding the mail address
// to the document source after user interaction

function show(user, domain, id) {
    const elem = document.getElementById(id);
    elem.innerHTML = user + '[at]' + domain;
    elem.onmouseover = undefined;
    setTimeout(() => {
        // delay slightly to avoid accidental invoke when touching to show
        elem.onclick = () => send(user, domain);
    }, 100);
}

function showPhone(num, id) {
    const elem = document.getElementById(id);
    elem.innerHTML = num;
    elem.onmouseover = undefined;
}

function send(user, domain) {
    const a = document.createElement('a');
    a.href = `mailto:${user}@${domain}`;
    a.click();
}

window.mail = {
    show,
    showPhone,
    send
}

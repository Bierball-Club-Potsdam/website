const items = [...document.getElementsByClassName("collapsible")];
items.forEach((item) => {
    const toggle = [...item.children];
    item.onclick = () => {
        toggle.forEach((t) => {
            t.classList.toggle('d-none');
            t.classList.toggle('d-inline');
        });
    };
    toggle[toggle.length - 1].children[0].classList.add('d-inline');
});

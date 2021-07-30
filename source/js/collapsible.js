const items = [...document.getElementsByClassName("collapsible")];
items.forEach((item) => {
    const children = [...item.children];
    const clickable = children.slice(0, -1);
    const content = children.slice(-1)[0];
    const contentHead = content.children[0];
    clickable.push(contentHead);
    contentHead.classList.add('d-inline');
    const onclick = () => {
        children.forEach((t) => {
            t.classList.toggle('d-none');
            t.classList.toggle('d-inline');
        });
    };
    clickable.forEach((c) => c.onclick = onclick);
});

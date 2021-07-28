const items = [...document.getElementsByClassName("collapsible")];
items.forEach((item) => {
    const heading = item.getElementsByClassName("collapsible-heading")[0];
    const content = item.getElementsByClassName("collapsible-content")[0];
    item.onclick = () => {
        heading.classList.toggle('d-none');
        content.classList.toggle('d-none');
    };
});

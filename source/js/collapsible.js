class Collapsible {
    constructor(item) {
        this.visible = false;

        const children = [...item.children];
        this.clickable = children.slice(0, -1);

        const content = children.slice(-1)[0];
        const contentHead = content.children[0];
        contentHead.classList.add('d-inline');

        this.clickable.push(contentHead);
        this.folded = this.clickable.filter((_, i) => i % 2 === 0);
        this.unfolded = [this.clickable[1], content];

        this.clickable.forEach((c) => c.onclick = () => {
            this.toggle();
            items.filter((i) => i !== this).forEach((i) => i.show(false));
        });
    }

    show(visible) {
        this.visible = visible;
        const show = visible ? this.unfolded : this.folded;
        const hide = visible ? this.folded : this.unfolded;

        show.forEach((i) => {
            i.classList.remove('d-none');
            i.classList.add('d-inline');
        })
        hide.forEach((i) => {
            i.classList.add('d-none');
            i.classList.remove('d-inline');
        })
    }

    toggle() {
        this.show(!this.visible);
    }
}

const items = [...document.getElementsByClassName("collapsible")]
    .map((i) => new Collapsible(i));

items[0].show(true);

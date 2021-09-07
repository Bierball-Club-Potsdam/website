class Collapsible {
    constructor(item) {
        this.visible = false;

        const children = [...item.children];

        const content = children.slice(-1)[0];
        const contentHead = content.children[0];
        content.removeChild(contentHead);

        const plus = children[0];
        const minus = children[1];
        this.folded = [plus];
        this.unfolded = [minus, content];

        const clickable = children.slice(0, -1);
        clickable.forEach((c) => c.onclick = () => {
            this.toggle();
            items.filter((i) => i !== this).forEach((i) => i.show(false));
        });
    }

    show(visible) {
        if (this.visible === visible) return;
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

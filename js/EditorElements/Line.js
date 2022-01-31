class Line {
    static create(index, context) {
        var line = document.createElement('span');
        line.classList.add('code__line');
        line.setAttribute("tabindex", index);
        
        var counter = document.createElement('span');
        counter.classList.add('code__counter');
        counter.innerHTML = index;

        var input = document.createElement('input');
        input.classList.add('code__input');
        input.setAttribute("tabindex", "-1");

        line.appendChild(counter);
        line.appendChild(input);

        line.counter = counter;
        line.input = input;

        line.index = index;
        return line;
    }

    static selectedLines = [];
    constructor(index) {
        this.body = Line.create(index);
        this.body.context = this;
        this.counter = this.body.counter;
        this.input = this.body.input;
        this.index = this.body.index
        this.body.onclick = this.clickHandler.bind(this);
        this.body.onfocus = this.clickHandler.bind(this);
    }

    focus() {
        Line.selectedLines.push(this);
        this.body.classList.add('code__line_selected');
        this.input.focus();
    }
    unfocus() {
        this.body.classList.remove('code__line_selected');
        let index = Line.selectedLines.indexOf(this.body);
        Line.selectedLines.splice(index, 1);
        this.input.blur();
    }
    static unfocusAll() {
        let arr = Object.assign([], Line.selectedLines)
        for(let line of arr) {
            line.unfocus();
        }
    }

    clickHandler() {
        Line.unfocusAll();
        this.focus();
    }

    getBody() {
        return this.body;
    }

    nextLine() {
        return this.body.nextElementSibling?.context;
    }
    previousLine() {
        return this.body.previousElementSibling?.context;
    }
}

export default Line;
import KeyHandler from "./KeyHandler.js";
import Line from "./EditorElements/Line.js";

class Editor {
    constructor(textFieldName) {
        this.textFieldName = textFieldName;
        this.textField = document.querySelector(textFieldName);
        this.countLine = 0;
        this.selectedLines = [];
        this.textBox = document.createElement('span');


        if (this.textField != null) {
            this.initTextField();
        }
        else {
            throw new Error("textField is Null");
        }
    }

    initTextField() {
        var firstline = new Line(1);
        this.textField.appendChild(firstline.getBody());

        let kh = new KeyHandler();

        kh.runOnKeys(() => {
            let line = this.lastSelectedLine();
            this.addLine(line);
        }, "Enter");

        kh.runOnKeys(() => {
            let fline = this.firstSelectedLine();
            let line = this.lastSelectedLine();

            let fi = Number(fline.index)
            let li = Number(line.index)

            if (fi > li) line.unfocus();
            (line.nextLine() || line).focus();
        }, "ShiftLeft", "ArrowDown");

        kh.runOnKeys(() => {
            let fline = this.firstSelectedLine();
            let line = this.lastSelectedLine();

            let fi = Number(fline.index)
            let li = Number(line.index)

            if (fi < li) line.unfocus();
            (line.previousLine() || line).focus();
        }, "ShiftLeft", "ArrowUp");

        kh.runOnKeys(() => {
            let line = this.lastSelectedLine();
            Line.unfocusAll();
            (line.previousLine() || line).focus();
        }, "ArrowUp");

        kh.runOnKeys(() => {
            let line = this.lastSelectedLine();
            Line.unfocusAll();
            (line.nextLine() || line).focus();
        }, "ArrowDown");


        // document.addEventListener("mouseup", () => {
        //     this.ismousedown = false;
        // })
    }

    firstSelectedLine = () => Line.selectedLines[0];
    lastSelectedLine = () => Line.selectedLines[Line.selectedLines.length-1];

    addLine(before) {
        var line = new Line(Number(before.index)+1);
        before.body.insertAdjacentElement('afterend', line.getBody());
        Line.unfocusAll();
        line.focus();

        while(line.nextLine() != null) {
            line = line.nextLine();
            var index = Number(line.index) + 1;
            line.index = index;
            line.counter.innerHTML = index;
        }
    }
}

export default Editor;
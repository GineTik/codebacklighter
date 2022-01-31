import BasicConvertor from "./BasicConvertor.js";

class JsConvertor extends BasicConvertor {
    static textToJson(text) {
        this.text = text;
        this.words = text.split(' ');

        this.words.forEach((word) => {
            // берем каждое слово и обрабатываем его одним из обработчиков
            this.handlers.forEach((handler) => {
                handler(word.trim())
            });
        });
    }
    reservedWords = [
        "len", "var", "const", "new", "if", "else", "function", "return"
    ]
}

export default JsConvertor;
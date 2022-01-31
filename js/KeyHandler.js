class KeyHandler {
    constructor() {

        this.configs = [];

        let pressed = new Set();

        document.addEventListener('keydown', function(event) {
            pressed.add(event.code);
    
            let response = this.checkAllConfigs(pressed);
            // response - true => событие сработало
            // response - false => никакого события не сработало
            // if (response == true) {
            //     pressed.clear();
            // }
        }.bind(this));
  
        document.addEventListener('keyup', function(event) {
            pressed.delete(event.code);
        });
    }
    runOnKeys(func, ...codes) {
        this.configs.push({
            func: func,
            codes: codes
        });
    }
    checkAllConfigs(pressed) {
        for(let config of this.configs) {
            // console.log(config, pressed);
            let codes = config.codes;

            let isKeysDowned = true;
            codes.forEach(function(code) { // все ли клавиши из набора нажаты?
                if (!pressed.has(code)) {
                    return isKeysDowned = false;
                }
            });
            if (isKeysDowned == true) { 
                config.func();
                return true;
            }
        }
    }
}

export default KeyHandler;
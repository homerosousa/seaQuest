(function() {
    Control = {
        pressedKeys: {},
        init: function() {
            this.bind();
        },
        bind: function() {
            document.addEventListener('keydown', function(e) {
                Control.set(e, true);
            });
            document.addEventListener('keyup', function(e) {
                Control.set(e, false);
            });
        },
        set: function(event, status) {
            var code = event.keyCode;
            var key;
            switch (code) {
                case 32:
                    key = 'SPACE';
                    break;
                case 37:
                    key = 'LEFT';
                    break;
                case 38:
                    key = 'UP';
                    break;
                case 39:
                    key = 'RIGHT';
                    break;
                case 40:
                    key = 'DOWN';
                    break;
                default:
                    key = String.fromCharCode(code);
            }
            this.pressedKeys[key] = status;
        },
        press: function(key) {

            return Control.pressedKeys[key];
        }
    };
})();
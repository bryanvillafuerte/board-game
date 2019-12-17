

class StorageKeys {
    static CHARACTER = 'CHARACTER';
    static CURRENT_BOARD_NUMBER = 'CURRENT_BOARD_NUMBER';
    static PREVIOUS_BOARD_NUMBER = 'PREVIOUS_BOARD_NUMBER';
    static DICE = 'DICE';
}

class ActionEvents {
    static DICE_ROLL = 'DICE_ROLL';
    static BACK_MOVE = 'BACK_MOVE';
}

class LocalStorage {
    static set(key, data) {
        const stringify = JSON.stringify(data);
        localStorage.setItem(key, stringify);
    }
    static get(key) {
        const data = localStorage.getItem(key);
        return JSON.parse(data);
    }
    static remove(key) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }
}


class PubSub {
   cache;

   constructor() {
        this.cache = {};
    }
    publish(channel, args) {
        if (this.cache[channel] && Array.isArray(this.cache[channel])) {
           this.cache[channel].forEach( callback => {
               callback.apply(null, [args || []]);
           });
        }
    };
    subscribe(channel, callback) {
        if (!this.cache[channel]) {
            this.cache[channel] = [];
        }
        this.cache[channel].push(callback);
        return [channel, callback]
    }
    unsubscribe = function (handle) {
        let t = handle[0];
        if (this.cache[t]) {
            for (let x = 0; x < this.cache[t].length; x++) {
                if (this.cache[t][x] === handle[1]) {
                    this.cache[t].splice(x, 1);
                }
            }
        }
    };
}

const PubSubInstance = (function () {
    var instance;

    function createInstance() {
        var object = new PubSub();
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


(function(){
    console.log('===== STORAGE LOADED =====');
})();


import config from './config';

let API = {
    save: function(data){
        return new Promise(function(resolve, reject) {
            resolve(data);
        });
    }

}

export default API;

"use strict";
import config from './config';
import API from './API';

// FULL OF BUGS
// livecoded version of the ES3 code :D

function noop(){}

function formatAge (age) {
    if (typeof age === 'number') {
        return age + ' years';
    } else {
        return 'Not given';
    }
}


let badTopics = new Set(['angular.js', 'XML', 'SOAP-RPC']);

class Person {
    constructor(name = 'Name', age = 'NA', location = 'Somewhere'){
        this.name = name;
        this.age = age;
        this.location = location;
        this.likes = new Set();
    }

    addLike(topic){

        if (badTopics.has(topic)) {
            throw new Error('bad topic ' + topic + ' added');
        }

        this.likes.add(topic);

    }
    addLikes(...likes) {
        likes.forEach(this.addLike.bind(this), this);
    }
    removeLikes (topic) {
        let idxOfTopic = this.likes.indexOf(topic);
        let hasTopic = idxOfTopic !== -1;
        let removedTopic;

        if (hasTopic) {
            removedTopic = this.likes.splice(idxOfTopic, 1);
        }

        return removedTopic;

    }
    templateData: function() {
        let name = this.name;
        let age = this.getAgeLabel();
        let location = this.location;
        let likesStuff = `${name} likes ${this.getLikes() in ${location}}`;
        return {
            name,
            age,
            location,
            likesStuff
        };
    }
}


/*

Person.prototype = {


    removeLike: function(topic) {

    },
    getLikes: function() {
        return this.likes.join(', ');
    },
    getAgeLabel: function getAgeLabel () {
        return formatAge(this.age);
    },
    isCloseTo: function(location) {
        return location === this.location;
    },
    templateData: function() {


    },
    save: function() {

        let name = this.name;
        let age = this.age;
        let location = this.location;

        return API.save('/user', {
            name: name,
            age: age,
            location: location
        });


        function save(uri, data){
            return new Promise(function(resolve, reject){
                // perform some kind api
                if (err){
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        }

    },
    saveLikes: function(errorHandler, done) {

        errorHandler = typeof errorHandler === 'function' || noop;
        done = typeof done === 'function' || noop;

        let likes = this.getLikes();
        API.save(config.getLikesUrl(), {
            likes: likes
        }, errorHandler, done);
    }
};
*/
export default Person;


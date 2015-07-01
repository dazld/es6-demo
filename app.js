var APP = APP || {};

(function(global, $, APP) {

    APP.models = APP.models || {};

    var config = global.config;
    var API = global.API;

    function formatAge (age) {
        if (typeof age === 'number') {
            return age + ' years';
        } else {
            return 'Not given';
        }
    }

    function Person(name, age, location) {
        name = name || 'Name';
        age = age || 'NA';
        location = location || 'Somewhere';

        this.name = name;
        this.age = age;
        this.location = location;
        this.likes = [];
    }

    Person.prototype = {
        addLike: function(topic) {
            if (this.likes.indexOf(topic) !== -1) {
                this.likes.push(topic);
            }
        },
        removeLike: function(topic) {
            var idxOfTopic = this.likes.indexOf(topic);
            var hasTopic = idxOfTopic !== -1;
            var removedTopic;

            if (hasTopic) {
                removedTopic = this.likes.splice(idxOfTopic, 1);
            }

            return removedTopic;

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
            var name = this.name;
            var age = this.getAgeLabel();
            var location = this.location;
            var likesStuff = name + ' likes ' + this.getLikes + ' in ' + location +'.';
            return {
                name: name,
                age: age,
                location: location,
                likesStuff: likesStuff
            };
        },
        save: function(errorHandler, done) {
            var name = this.name;
            var age = this.age;
            var location = this.location;
            var likes = this.getLikes;

            API.save({
                name: name,
                age: age,
                location: location,
                likes: likes
            }, errorHandler, done);
        }
    };

    APP.models.Person = Person;


})(window, jQuery, APP);

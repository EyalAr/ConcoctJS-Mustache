var should = require('should');

describe("ConcoctJS - mustache.js plugin test", function() {

    var Concoction = require('concoct'),
        options = {
            templates: './test/templates/1.tpl',
            contexts: './test/contexts/1.json',
            dest: './test/content',
            linkingRules: {
                './test/contexts/1.json': './test/templates/1.tpl'
            },
            plugins: [{
                name: 'concoct-mustache',
                handler: require('../../')
            }]
        },
        c;

    before(function(done) {

        // erase everything is the content directory

        var rimraf = require('rimraf'),
            fs = require('fs');

        rimraf(options.dest, function(err) {

            if (err) return done(err);

            fs.mkdir(options.dest, done);

        });

    });

    before(function(done) {

        c = new Concoction(options);
        c.concoct(done);

    });

    it('should compile one template', function(done) {

        var fs = require('fs');

        fs.readdir(options.dest, function(err, list) {

            if (!err) {
                list.should.be.length(1);
            }

            done(err);

        });

    });

    it('should write the correct content to disk', function(done) {

        var fs = require('fs'),
            resolve = require('path').resolve;

        fs.readFile(resolve(options.dest, '1 (1)'), function(err, data) {

            if (!err) {
                data.toString().should.be.exactly('FOO');
            }

            done(err);

        });

    });

});
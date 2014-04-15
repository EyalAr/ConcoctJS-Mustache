module.exports = function(params, templates, contexts, links, buffers, done) {

    var Mustache = require('mustache');

    buffers.forEach(function(buffer){

        var context = contexts[buffer.link.contextPath];
        var template = templates[buffer.link.templatePath];

        buffer.content = Mustache.render(template, context);

    });

    done();
    
};
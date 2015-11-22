var getName = function() {
    return $('#name').val();
};

var setOutput = function(text) {
    $('#output').text(text);
};

var onLoad = function() {
    $('#form').submit(function(e) {
        e.preventDefault();
        setOutput('Hello, ' + getName());
    });
};

$(function() {
    onLoad();
});


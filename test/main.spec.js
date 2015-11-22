fixture.setBase('src');

// Load index.html before each test run.
QUnit.module('DOM manipulation', {
    beforeEach: function() {
        var mainHtml = fixture.load('index.html')
        var container = $('<div>')
            .attr('id', 'fixture')
            .html(mainHtml[0].innerHTML);
        $(document.body).append(container);
        onLoad();
    },
    afterEach: function() {
        $('#fixture').remove();
    }
});

QUnit.test("getName", function(assert) {
    $('#name').val('Test');
    assert.equal(getName(), 'Test');
});

QUnit.test("setOutput", function(assert) {
    assert.equal('', $('#output').text());
    setOutput('test');
    assert.equal($('#output').text(), 'test');
});

QUnit.test("click submit", function(assert) {
    assert.equal('', $('#output').text());
    $('#name').val('Test');
    $('#submit').trigger('click');
    assert.equal($('#output').text(), 'Hello, Test');
});


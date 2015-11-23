## DOM manipulation testing with Karma, QUnit and jQuery.

Programatically testing DOM manipulation is non-trivial because Karma does not automatically load `index.html` into the DOM.

When testing DOM manipulation, many of the elements that the tests interact with may be specified in index.html, so it needs to be somehow loaded into the test environment.  This is done with a karma plugin called `karma-fixture` and a preprocessor called `karma-html2js-preprocessor`.

By following the instructions in this repository, you can test that your DOM manipulation works correctly with `index.html`.

### Step-by-step instructions to recreate this repository:

- `npm init`
- `npm install karma karma-cli karma-fixture karma-html2js-preprocessor karma-phantomjs-launcher karma-qunit qunitjs --save-dev`
- `npm install jquery --save`
- `./node_modules/.bin/karma init`
- Modify `karma.conf.js`:

    ```
    -    frameworks: ['qunit'],
    +    frameworks: ['qunit', 'fixture'],
    ...
         files: [
    +      'src/index.html',
    +      'node\_modules/jquery/dist/jquery.js',
           'src/**/*.js',
           'test/**/*.spec.js'
         ],
    ...
         preprocessors: {
    +      'src/index.html': ['html2js']
         },
    ```

- Create `index.html` in `src` directory
- Create test file in `test/main.spec.js` and start with the following setup:
    ```
    fixture.setBase('src');

    // Load index.html and call onLoad before each test run.
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
    ```
- Write additional test code.
- Write `main.js` and create `onLoad` function:
    ```
    var onLoad = function() {
        $('#form').submit(function(e) {
            e.preventDefault();
            setOutput('Hello, ' + getName());
        });
    };

    $(function() {
        onLoad();
    });
    ```
    (note that document on-load setup needs to be done in the `onLoad` method because I don't know a way to force `$(function() { ... })` to run between each test run)

- Run tests:
    ```
    ./node_modules/.bin/karma start
    ```
    OR if you've installed `karma-cli` globally:
    ```
    karma start
    ```


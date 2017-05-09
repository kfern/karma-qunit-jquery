fixture.setBase('src');

// Load index.html and call onLoad before each test run.
QUnit.module('DOM manipulation', {
    beforeEach: function() {
        var mainHtml = fixture.load('index.html')
        var container = $('<div>')
            .attr('id', 'fixture')
            .html(mainHtml[0].innerHTML);
        $(document.body).append(container);
    },
    afterEach: function() {
        $('#fixture').remove();
    }
});

QUnit.test("Versión 1.0.0", function(assert) {
    assert.equal($.fn.kfern.getVersion(), '1.0.0', 'La versión de los tests y del plugin coinciden.');    
});

QUnit.test( 'Objetivo 1. Si el HTML no tiene la estructura mínima no se realiza ningún cambio.', function( assert ) {
  // Arrange
  var divtest = '.wrapper_incorrecto';
  var start = $(divtest);
  // Act
  $(document).kfern.simplebox('simplebox');
  // Assert (actual, expected)
  assert.equal( $(divtest).length, 1, 'El contenido para los tests se ha cargado.' );
  assert.deepEqual( $(divtest), start, 'Si el HTML no está completo no se realiza ningún cambio.' );
});

  QUnit.test( 'Objetivo 2. Se carga una página con la estructura básica.', function( assert ) {
    // Arrange
    var filtro = 'div.wrapper_a > div.simplebox';
    // Act
    $(document).kfern.simplebox();
    // Assert (actual, expected)
    var $result = $( filtro );
    assert.ok( $result.attr('id'), 'El div contenedor tiene un id.' );
    assert.ok( $result.data('kfern') == 'simplebox', 'El div contenedor se identifica correctamente.' );
    assert.ok( $(filtro + ' > h2.simplebox-title').is(":visible")    == true, 'El título está visible.' );
    assert.ok( $(filtro + ' > h2.simplebox-title > a').length == 1, 'El título es un enlace.' );    
    assert.ok( $(filtro + ' > div.simplebox-content').is(":visible") == false, 'El contenido está oculto por defecto.' );
  });
  
  QUnit.test( 'Objetivo 3. Implementar el comportamiento del componente cuando se pulsa en el título.', function( assert ) {
    // Arrange
    var filtro = 'div.wrapper_a > div.simplebox';
    var contenido_visible;
    // Act
    $(document).kfern.simplebox();
    contenido_visible = $(filtro + ' > div.simplebox-content').is(":visible");
    $(filtro + ' > h2.simplebox-title > a').trigger('click');
    // Assert
    assert.ok( contenido_visible == false && $(filtro + ' > div.simplebox-content').is(":visible") == true, 'Si un contenido está oculto, cuando se pulse en el título se ha de mostrar el contenido asociado.' );
    
    //Si un contenido está visible, cuando se pulse en el título se ha de ocultar el contenido asociado
    // Arrange
    contenido_visible = $(filtro + ' > div.simplebox-content').is(":visible");
    //Act
    $(filtro + ' > h2.simplebox-title > a').trigger('click');
    // Assert
    assert.ok( contenido_visible && $(filtro + ' > div.simplebox-content').is(":visible") == false, 'Si un contenido está visible, cuando se pulse en el título se ha de ocultar el contenido asociado.' );

  });

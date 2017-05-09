(function ( $ ) {
    $.fn.kfern = {};
    $.fn.kfern.getVersion = function(){
        return '1.0.0';
    };
    
    $.fn.kfern.simplebox = function( selector ){
        var i;//Contador para que cada id sea diferente
        selector = selector || 'simplebox';
        $('div.' + selector).each(function(i){
            //Verificar que la estructura del contenido recibido contiene los mínimos necesarios
            if (($(this).find('> h2.simplebox-title').length == 1) && ($(this).find('> div.simplebox-content').length == 1)){
              //Realizar las tareas necesarias para pasar los tests
              //El div contenedor tiene un id y se identifica correctamente.
              $(this).attr('id', 'simplebox_' + ++i).data('kfern', 'simplebox');
              //El título es un enlace
              $(this).find('> h2.simplebox-title').html('<a href="#">' + $(this).find('> h2.simplebox-title').html() + '</a>');
              //Cuando se pulsa en el enlace se oculta o muestra el div con el contenido
              $(this).find('> h2.simplebox-title').on('click', function(){
                  $(this).parent().find('> div.simplebox-content').toggle();
              })
              //El contenido se muestra oculto por defecto
              $(this).find('div.simplebox-content').hide();
            }
        });
    };    

}( jQuery ));

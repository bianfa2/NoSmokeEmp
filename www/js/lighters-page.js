function add_lighter(){
    app.dialog.prompt('Ingrese la referencia del encendedor', 'Nuevo encendedor', function(reference){
        if(!isNaN(parseInt(reference))){
            app.dialog.preloader('Agregando...');
            $.ajax({
                url: 'http://35.239.112.72:3000/api/lighter/id='+reference,
                dataType: "json",
                type: 'GET',
                contentType: "application/jsonp;charset=utf-8",
                crossDomain: true,
                success: function (data) {
                    app.dialog.close();
                    if(data.exists){
                        save_reference(reference);
                        show_lighter(reference);
                    }else{
                        show_message('Problemas agregando encendedor', 'La referencia no existe');
                    }
                }
            });

        }else{
            show_message('Problemas agregando encendedor', 'La referencia no debe ser un número');
        }
    });
}

function remove_lighter(reference){

    var index = parseInt(localStorage.getItem("index"));
    var moveItem = false;

    for(var i = 0; i < index; i++){

        if(moveItem){
            localStorage.setItem(i-1, localStorage.getItem(i));
        }

        if(localStorage.getItem(i) == reference){
            moveItem = true;
        }

        if(i == index - 1){
            localStorage.removeItem(i);
        }

    }

    localStorage.setItem("index", index-1);
    indexLighters -= 1;
    clean_statistics();
    monitor_lighters();    

}

function save_reference(reference){
    var index = parseInt(localStorage.getItem("index"));
    localStorage.setItem(index, reference);
    localStorage.setItem("index", index+1);
    indexLighters += 1;
    monitor_lighters();    
}

function show_lighter(reference){
    $('#lightersList').append(
        `<li class="swipeout">
            <div class="item-content swipeout-content">
                <div class="item-media">
                    <i class="f7-icons">fire_fill</i>
                </div>
                <div class="item-inner">
                    <div class="item-title">`+ reference +`</div>
                </div>
            </div>
            <div class="swipeout-actions-right">
                <a href="#" onclick="remove_lighter(`+ reference +`)" class="swipeout-delete">Eliminar</a>
            </div>
        </li>`);
}

function show_message(title, message){
    app.dialog.alert (message, title);
}
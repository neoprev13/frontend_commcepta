function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    // rawFile.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var dados = [];

// Carregando o arquivo JSON e criando os cards dos colaboradores
readTextFile("Dados/dados.json", function(data){
    dados = JSON.parse(data);

    for (var i in dados) {
        var active = i == 0 ? 'active' : '';
        var new_card = '';
        
        new_card += '   <div class="col-xl-4 col-lg-6 col-md-12 my-2 pr-2">';
        new_card += '       <div id="card-' + dados[i].id + '" class="card-colaboradores bg-card py-3 mr-1 ' +  active + '">'; 
        new_card += '           <a href="#" onclick="cardColaboradores(' + dados[i].id + ');">';
        new_card += '               <div class="d-flex align-items-center">';
        // FOTO
        new_card += '                   <div class="col-4 pr-0">';
        new_card += '                       <img class="rounded-circle" src="img/' + dados[i].foto + '" alt="' + dados[i].nome + ' - ' + dados[i].cargo + '">';
        new_card += '                       <span class="badge badge-info">' + dados[i].notificacoes + '</span>';
        new_card += '                   </div>';

        new_card += '                   <div class="col-8 pl-0">';
        //NOME
        new_card += '                       <div class="row">';
        new_card += '                           <span class="info">' + dados[i].nome + '</span>';
        new_card += '                       </div>';
        
        //CARGO
        new_card += '                       <div class="row">';
        new_card += '                           <span>' + dados[i].cargo + '</span>';
        new_card += '                       </div>';

        new_card += '                   </div>';
        new_card += '               </div>';
        new_card += '           </a>';
        new_card += '       </div>';
        new_card += '    </div>';
        
        document.getElementById('cards').innerHTML += new_card;    
    }
});

function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].id === id) {
            return source[i];
        }
    }

    throw "Couldn't find object with id: " + id;
}        

function cardColaboradores(id) {
    // Gerenciando o active do card colaboradores
    $('.card-colaboradores').removeClass('active');
    $('#card-'+ id).addClass('active');

    // Atualizando os dados do card principal
    var dadosCard = findById(dados, id);
    document.getElementById("main-photo").src = 'img/' + dadosCard.foto;
    document.getElementById("main-name").innerHTML = dadosCard.nome;
    document.getElementById("main-position").innerHTML = dadosCard.cargo;
    document.getElementById("main-age").innerHTML = dadosCard.idade;
}
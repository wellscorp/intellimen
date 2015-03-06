/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var database= null;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        //alert("pronto!");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //alert("pronto!");
        var db= window.openDatabase("banco", "1.0", "banco de dados", 200000);
        //database= createOpen("teste", "1.0", "testando selecao", 200000);
        db.transaction(PopulateDatabase, errorDB, successDB);
        //alert(db);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};




// ----------------------- CAPTURAR FOTO ---------------------





function PopulateDatabase(tx){

    tx.executeSql("Create TABLE IF NOT EXISTS pessoa (ROLLNO INT, nome text, email text, senha text, dt_criacao numeric, hr_criacao numeric, dt_login numeric, dt_logout numeric )");
    tx.executeSql("Create TABLE IF NOT EXISTS nota (ROLLNO INT, titulo text, descricao text, dt_criacao numeric, hr_criacao numeric)");
    //tx.executeSql("Insert into chamado values(1,'titulo 01', 'descricao 01')");

}

function errorDB(error){
    alert("Erro ao inserir no banco: " + error);
}

function successDB(){
    //alert("Informações inseridas com sucesso!");
}


/*
db = window.sqlitePlugin.openDatabase({name: "DB"});
db.transaction(function(tx) {
    // Cria a Tabela "tabela_testes"
    tx.executeSql('CREATE TABLE IF NOT EXISTS tabela_teste (id integer primary key, titulo text)');
    // Adiciona um elemento a tabela
    tx.executeSql("INSERT INTO tabela_teste (titulo) VALUES (?)", ["Meu primeiro post."]);

    // Faz uma busca na tabela
    tx.executeSql("SELECT * FROM tabela_teste;", [], function(tx, res) {
        alert("Quantidade Resultados: " + res.rows.length);
        for (var i = 0;i<res.rows.length;i++){
            alert("Linha "+i+": "+res.rows.item(i).titulo);
        }
    });
});
*/

<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rotas — SP Leituras
|--------------------------------------------------------------------------
| Primeira passada da migração: cada rota só devolve uma view Blade
| (Route::view), sem controller nem lógica ainda — conteúdo hardcoded
| direto no Blade, igual ao site estático original. Isso muda quando o
| conteúdo virar dinâmico (banco de dados).
|
| Nomeei todas as rotas (->name(...)) de propósito: os partials do
| header/footer (resources/views/partials/) já têm um TODO pra trocar
| os hrefs hardcoded ("/novidades" etc.) por route('novidades') etc.
| assim que essas rotas existissem — agora existem.
*/

Route::view('/', 'home')->name('home');

// As 6 views abaixo já foram convertidas e existem em resources/views/
// (novidades.blade.php, novidade-detalhe.blade.php, transparencia.blade.php,
// transparencia-documento.blade.php, contato.blade.php, equipamento.blade.php).
Route::view('/novidades', 'novidades')->name('novidades');
Route::view('/novidade-detalhe', 'novidade-detalhe')->name('novidade-detalhe');
Route::view('/transparencia', 'transparencia')->name('transparencia');
Route::view('/transparencia-documento', 'transparencia-documento')->name('transparencia-documento');
Route::view('/contato', 'contato')->name('contato');
Route::view('/equipamento', 'equipamento')->name('equipamento');

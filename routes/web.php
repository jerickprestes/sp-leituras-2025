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

// TODO: as views abaixo ainda não existem — criar seguindo o mesmo
// padrão de resources/views/home.blade.php (ver o prompt de conversão
// do checklist "apontar arquivos"). Até lá, essas rotas retornam erro
// "View not found" se acessadas.
Route::view('/novidades', 'novidades')->name('novidades');
Route::view('/novidade-detalhe', 'novidade-detalhe')->name('novidade-detalhe');
Route::view('/transparencia', 'transparencia')->name('transparencia');
Route::view('/transparencia-documento', 'transparencia-documento')->name('transparencia-documento');
Route::view('/contato', 'contato')->name('contato');
Route::view('/equipamento', 'equipamento')->name('equipamento');

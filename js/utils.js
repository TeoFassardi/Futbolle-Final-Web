'use strict';
var intervaloTemporizador = null;
var segundosTranscurridos = 0;
var elementoTemporizador = document.getElementById('temporizador');
var cuerpo = document.body;
var modal = document.getElementById('modal-alerta');
var modalTitulo = document.getElementById('modal-titulo');
var modalMensaje = document.getElementById('modal-mensaje');

function mostrarModal(titulo, mensaje) {
    modalTitulo.textContent = titulo;
    modalMensaje.textContent = mensaje;
    modal.classList.remove('clase-oculta');
}

function cerrarModal() {
    modal.classList.add('clase-oculta');
}

function formatearTiempo(segundos) {
    var minutos = Math.floor(segundos/60);
    var segundosRestantes = segundos % 60;
    var strMinutos = minutos < 10 ? '0' + minutos : minutos;
    var strSegundos = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
    return strMinutos + ':' + strSegundos;
}

function actualizarTemporizador() {
    segundosTranscurridos = segundosTranscurridos + 1;
    elementoTemporizador.textContent = formatearTiempo(
        segundosTranscurridos
    );
}

function iniciarTemporizador() {
    if (intervaloTemporizador !== null) {
        clearInterval(intervaloTemporizador);
    }
    segundosTranscurridos = 0;
    elementoTemporizador.textContent = '00:00';

    intervaloTemporizador = setInterval(
        actualizarTemporizador,
        1000
    );
}

function detenerTemporizador(){
    if(intervaloTemporizador !== null){
        clearInterval(intervaloTemporizador);
        intervaloTemporizador = null;
    }
}

function obtenerSegundosTranscurridos() {
    return segundosTranscurridos;
}

function conmutarTema() {
    if (cuerpo.classList.contains('modo-claro')) {
        cuerpo.classList.remove('modo-claro');
        localStorage.setItem('futbolle_tema', 'oscuro');
    } else {
        cuerpo.classList.add('modo-claro');
        localStorage.setItem('futbolle_tema', 'claro');
    }
}

function cargarTemaPreferido() {
    var temaGuardado;
    temaGuardado = localStorage.getItem('futbolle_tema');
    if (temaGuardado === 'claro') {
        cuerpo.classList.add('modo-claro');
    } else {
        cuerpo.classList.remove('modo-claro');
    }
}

document.getElementById('modal-boton-cerrar').addEventListener('click', cerrarModal);
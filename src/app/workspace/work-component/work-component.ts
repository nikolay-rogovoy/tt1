import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {BehaviorSubject} from "rxjs/BehaviorSubject";


/***/
@Component({
  moduleId: module.id,
  selector: 'work-component',
  templateUrl: 'work-component.html'
})
export class WorkComponent implements OnInit {

    /**Сокет к серверу сообщений*/
    socket = io('http://localhost:8080/chat');

    /**Сокет к серверу ошибок*/
    socketError = io('http://localhost:8090/error');

    /**Соединение установлено*/
    socketConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /**Соединение установлено*/
    socketErrorConnected: BehaviorSubject<boolean> = new BehaviorSubject(false);

    /***/
    answer = '';

    /***/
    errors = '';

    /***/
    message = '';

    /***/
    constructor() {
    }

    /***/
    ngOnInit() {
        // Соединение с сервером установлено
        this.socket.on('connect', () => {
            this.socketConnected.next(true);
            console.log('connect');
        });

        // Прием входящих сообщений
        this.socket.on('message', (data) => {
            console.log('message', data);
            this.answer = data;
        });

        // Соединение с сервером разорвано
        this.socket.on('disconnect', () => {
            this.socketConnected.next(false);
            console.log('disconnect');
        });

        // Соединение с сервером ошибок установлено
        this.socketError.on('connect', () => {
            this.socketErrorConnected.next(true);
            console.log('socketError connected');
        });

        // Прием ошибок от сервера ошибок
        this.socketError.on('errors', (data: string) => {
            console.log('errors', data);
            if (data) {
                let errors = <{ code:number, message: string }[]>JSON.parse(data);
                this.errors = errors.map((item: { code: number, message: string }) => {
                    return `${item.code} - ${item.message}`;
                }).join(';');
            } else {
                this.errors = '';
            }
        });

        // Соединение с сервером ошибок разорвано
        this.socketError.on('disconnect', () => {
            this.socketErrorConnected.next(false);
            console.log('socketError disconnected');
        });
    }

    /**Отправить сообщение*/
    sendMessage(message) {
        this.socketConnected.subscribe((connected) => {
            if (connected) {
                this.socket.send({msg: message});
            } else {
                console.log('Соединение с сервером не установлено');
            }
        })
    }

    /**Получить последние ошибки с сервера ошибок*/
    getLastErrors() {
        this.socketErrorConnected.subscribe((connected) => {
            if (connected) {
                this.socketError.emit('get_errors');
            } else {
                console.log('Соединение с сервером ошибок не установлено');
            }
        })
    }
}

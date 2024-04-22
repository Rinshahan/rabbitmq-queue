"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const amqplib_1 = __importDefault(require("amqplib"));
const app = (0, express_1.default)();
const queueName = 'rifash';
const recieveMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect('amqp://localhost');
    const channel = yield connection.createChannel();
    yield channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for the messages from queue ${queueName}`);
    channel.consume(queueName, (msg) => {
        console.log(`Recieved the message, Mesage is : ${msg === null || msg === void 0 ? void 0 : msg.content}`);
    }, { noAck: true });
});
recieveMessage();
app.listen(4000, () => {
    console.log('running on 4000');
});

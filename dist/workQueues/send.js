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
const amqplib_1 = __importDefault(require("amqplib"));
const queue = 'task';
const message = process.argv.slice(2).join(' ') || 'helloworld';
const publish = () => __awaiter(void 0, void 0, void 0, function* () {
    const connect = yield amqplib_1.default.connect('amqp://localhost');
    const channel = yield connect.createChannel();
    yield channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    console.log('Sent : ', message);
    setTimeout(() => {
        connect.close();
        process.exit(0);
    }, 500);
});
publish();

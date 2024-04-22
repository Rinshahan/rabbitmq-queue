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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const queue = 'rifash';
const message = 'hi rifash ,';
const publishMsg = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield amqplib_1.default.connect('amqp://localhost');
    const channel = yield connection.createChannel();
    yield channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log('Message Send : ', message);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    });
});
publishMsg();
app.listen(3000, () => {
    console.log("running on 3000");
});

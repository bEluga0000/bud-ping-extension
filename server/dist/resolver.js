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
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
const create_1 = require("./query/create");
const get_1 = require("./query/get");
exports.root = {
    getUser: ({ id }, req) => __awaiter(void 0, void 0, void 0, function* () {
        const userFull = yield (0, get_1.getUser)(id);
        if (userFull) {
            const user = userFull.user;
            const room = userFull.room;
            return { id: user.id, username: user.username, email: user.email, userLink: user.userLink, password: user.password, friends: user.friends, requests: user.requests, room: room };
        }
        else {
            throw new Error("User not found");
        }
    }),
    getRoom: ({ id }, req) => __awaiter(void 0, void 0, void 0, function* () {
        const { room, subscribedUsers, messages } = yield (0, get_1.getRoom)(id);
        if (room && subscribedUsers && messages) {
            return { id: room.id, subscribedAt: room.subscribedAt, subscribedUser: subscribedUsers, messages: messages };
        }
    }),
    getAllUser: ({ id }, req) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield (0, get_1.getSuggestionUsers)({ id });
        if (users) {
            return users;
        }
    }),
    CreateUser: ({ input }, req) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, create_1.createUser)({ username: input.username, password: input.username, email: input.email });
        if (user) {
            return { id: user.id, username: user.username, email: user.email, userLink: user.userLink, password: user.password, friends: user.friends, requests: user.requests };
        }
        else {
            // throw new Error("User not found")
            return null;
        }
    })
};

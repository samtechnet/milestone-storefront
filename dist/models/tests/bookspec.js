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
// import {book, bookTable } from "../book";
const book_1 = require("../book");
const table = new book_1.bookTable();
describe('book table model', () => {
    it('should have an index method', () => {
        expect(table.index).toBeDefined();
    });
    it('index should return a list of book properties', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield table.index();
        expect(result).toEqual([]);
    }));
});

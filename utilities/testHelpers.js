"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockResponse = exports.mockRequest = void 0;
const globals_1 = require("@jest/globals");
const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body,
        params,
        query,
        get: globals_1.jest.fn(),
        headers: {}
    };
};
exports.mockRequest = mockRequest;
const mockResponse = () => {
    const res = {};
    // res.status = jest.fn().mockReturnValue(res)
    // res.json = jest.fn().mockReturnValue(res)
    // res.send = jest.fn().mockReturnValue(res)
    // res.setHeader = jest.fn().mockReturnValue(res)
    return res;
};
exports.mockResponse = mockResponse;

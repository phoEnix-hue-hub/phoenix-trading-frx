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
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = __importDefault(require("express")); // Default import
const mongoose_1 = __importDefault(require("mongoose")); // Default import
const app_module_1 = require("./app.module");
const expressApp = (0, express_1.default)();
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp), {
        logger: ['error', 'warn'],
    });
    // Connect to MongoDB with modern options (no deprecated parameters)
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        return res.status(500).json({ error: 'Database connection failed' });
    }
    yield app.init();
    yield app.getHttpAdapter().getInstance().handle(req, res);
    // Close MongoDB connection
    yield mongoose_1.default.connection.close();
});

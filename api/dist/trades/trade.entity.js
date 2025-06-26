"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.TradeSchema = new mongoose_1.Schema({
    userId: { type: String },
    date: { type: Date },
    action: { type: String, required: true },
    amount: { type: Number, required: true },
});

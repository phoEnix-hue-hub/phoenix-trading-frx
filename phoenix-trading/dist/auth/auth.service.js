"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/auth/auth.service.ts (add these imports and methods)
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(name, phone, email, password) {
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            return { success: false, message: 'Email already registered. Please use a different email or log in.' };
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new this.userModel({
            name,
            phone,
            email,
            password: hashedPassword,
            balance: 0,
            lastLogin: new Date(),
        });
        try {
            const savedUser = await newUser.save();
            return {
                success: true,
                user: {
                    name: savedUser.name,
                    email: savedUser.email,
                    username: savedUser.email,
                    balance: savedUser.balance,
                    lastLogin: savedUser.lastLogin,
                },
            };
        }
        catch (error) {
            console.error('Error saving user:', error);
            return { success: false, message: 'An error occurred during registration. Please try again.' };
        }
    }
    async login(identifier, password) {
        const user = await this.userModel.findOne({
            $or: [{ email: identifier }, { phone: identifier }],
        }).exec();
        if (!user) {
            return { success: false, message: 'Invalid email/phone or password.' };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { success: false, message: 'Invalid email/phone or password.' };
        }
        user.lastLogin = new Date();
        await user.save();
        return {
            success: true,
            user: {
                name: user.name,
                email: user.email,
                username: user.email,
                balance: user.balance,
                lastLogin: user.lastLogin,
            },
        };
    }
    async updateBalance(username, balance) {
        const user = await this.userModel.findOne({ email: username }).exec();
        if (!user) {
            return { success: false, message: 'User not found.' };
        }
        user.balance = balance;
        await user.save();
        return { success: true };
    }
    async updateCentralWallet(amount) {
        // Assuming a central wallet document or field exists
        let centralWallet = await this.userModel.findOne({ email: 'central-wallet@phoenix-trading.frx' }).exec();
        if (!centralWallet) {
            centralWallet = new this.userModel({
                email: 'central-wallet@phoenix-trading.frx',
                balance: 0,
                name: 'Central Wallet',
            });
        }
        centralWallet.balance += amount;
        await centralWallet.save();
        return { success: true };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthService);

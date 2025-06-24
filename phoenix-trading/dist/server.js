"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
console.log('MONGODB_URI:', config_1.config.mongodbUri); // Debug log
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true }); // Enable CORS for all origins
    const PORT = config_1.config.port;
    const server = await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            const nextPort = PORT + 1;
            console.log(`Port ${PORT} is in use, trying ${nextPort}...`);
            app.listen(nextPort).then(() => console.log(`Server running on port ${nextPort}`));
        }
        else {
            console.error('Server error:', err);
        }
    });
}
bootstrap();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API для управления событиями',
            version: '1.0.0',
            description:
                'Документация API для работы с событиями и пользователями',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./controllers/*.ts'],
};

export default swaggerOptions;

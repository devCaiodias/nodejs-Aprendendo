module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '28292425',
    database: 'customers',
    define: {
        timestamps: true,          // Corrigido de "timestamp"
        underscored: true,
        underscoredAll: true,
    }
};

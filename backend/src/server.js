const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Authenticate and sync database tables
    await sequelize.authenticate();
    console.log('✔ PostgreSQL Database connection verified successfully.');

    await sequelize.sync({ alter: true });
    console.log('✔ All 7 Legal database models synchronized.');

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` RESEARCH Legal Precedent Backend running on port ${PORT}`);
      console.log(` Health Check: http://localhost:${PORT}/api/health`);
      console.log(` Cases API:    http://localhost:${PORT}/api/cases`);
      console.log(` Judgments:    http://localhost:${PORT}/api/judgments`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('✘ Failed to start Node.js legal backend server:', error);
    process.exit(1);
  }
};

startServer();

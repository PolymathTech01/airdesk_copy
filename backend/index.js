const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const deskRouter = require('./src/routes/desk.routes');
const port = process.env.PORT || 8080;
const { sequelize } = require('./src/models');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

async function main() {
  await sequelize.sync({ foce: true });
  console.log('connected to the database successfully');
}
main();

app.use('/api/desk', deskRouter);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

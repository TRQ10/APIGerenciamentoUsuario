import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import connect from './DB/conection.js';
import router from './router/route.js';

const app = express();

/** middlewares  */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

/** HTTP GET Requests */
app.get('/', (req, res) => {
  res.status(201).json('Home Get Request');
});

/** API Routes */
app.use('/teste', router);

/** Iniciar o Servidor apenas quando possuir conexão válida. */
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Servidor conectado a http://localhost:${port}`);
      });
    } catch (error) {
      console.log('Não foi possívl se conectar ao servidor');
    }
  })
  .catch((error) =>
    console.log('Conexão inválida com o banco de dados...!')
  );
import route from './route/route';
import express from 'express';
import mongoose from 'mongoose';


async function connect_database(
	conn_str: string,
    conn_db: string
){
    await mongoose.connect(
		`mongodb+srv://${conn_str}/${conn_db}?retryWrites=true&w=majority`, {
		ssl: true,
		authSource: 'admin',
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
    });
    console.log(`Database, ${conn_db} is connected`);
}


async function start_server() {
    connect_database(process.env.mongodb_gdg || 'undefined', 'gdg_test');

    const app = express();

    app.use("/", route);

    // endpoint
	app.use(
		'/gql', (req, res, next) =>
		{
			const query = req.query.query || req.body.query || '';
			if (query.length > 2000)
			{
				throw new Error('Query too large');
			}
			next();
		}
	);  // prevent malicious giant query
	// await GQL(app);  // GraphQL main at /graphql

    app.listen(3000, () => {
        console.log('Server created at: ' + 3000)
    });
}

start_server();



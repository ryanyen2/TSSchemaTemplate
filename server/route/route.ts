import { Router, static as Static } from "express";
import path from 'path';

const route = Router();
route
	.use(Static(__dirname + '/../../../web/dist/production'))
	.get('*',
		async (req: any, res: any) => { res.sendFile(path.join(__dirname + '/../../../web/dist/production/index.html')); }
	);

export default route;


To build a example chat app.
```bash
npm i;
npm run serve;
```

<kbd>goto<kbd/> http://localhost:3000




start a mongodb atlas server


## Start from scratch
```bash
npm init;
npm install express mongoose apollo-server-express graphql class-validator type-graphql reflect-metadata @typegoose/typegoose --save;
npm install @types/express @types/mongoose --save-dev;
```
typescript config file.
```json
{
	"compilerOptions": {
		"outDir": "./build",
		"rootDir": ".",
		"experimentalDecorators": true,
    	"emitDecoratorMetadata": true,
		"strictPropertyInitialization": false,
	},
	"exclude": [
		"web/**/*",
	]
}
```

```
mkdir web;
cd web;
ng new ui --directory ./;
ng serve;
```

`angular.json`
```json
{
	"projects": {
		"ui": {
			"architect": {
				"build": {
					"options": {
						"outputPath": "dist/dev"
					},
					"configurations": {
						"production": {
							"outputPath": "dist/production"
						}
					}
				}
			}
		}
	}
}
```

`web/package.json`
```json
{
	"scripts": {
		"bp": "ng build --prod --aot --vendor-chunk --common-chunk --buildOptimizer"
	}
}
```

```
mkdir schema;
mkdir server;
```
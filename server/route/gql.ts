import { authChecker } from './auth';
import { UserResolver } from './resolvers/userResolver';
import type { Express } from 'express';
import { ApolloServer } from "apollo-server-express";

// Our magical TypeGraphQL and TypeGoose
import { buildSchema, MiddlewareFn } from "type-graphql";
import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';
import { getClassForDocument } from '@typegoose/typegoose';
import { GraphQLScalarType, Kind } from 'graphql';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';


type ContextType = {
	req: Express.Request,
}

export async function contextBuilder({ req, res, connection }: ExpressContext): Promise<ContextType>
{
	return {
		req,
	}
}


export const ObjectIdScalar = new GraphQLScalarType({
	name: "ObjectId",
	description: "Mongo object id scalar type",
	parseValue(value: string)
	{
		return new ObjectId(value); // value from the client input variables
	},
	serialize(value: ObjectId)
	{
		return value.toHexString(); // value sent to the client
	},
	parseLiteral(ast)
	{
		if (ast.kind === Kind.STRING)
		{
			return new ObjectId(ast.value); // value from the client query
		}
		return null;
	},
});


function convertDocument(doc: Document)
{
	const convertedDocument = doc.toObject();
	const DocumentClass = getClassForDocument(doc)!;
	Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
	return convertedDocument;
}

const TypegooseMiddleware: MiddlewareFn = async (_, next) => 
{
	const result = await next();

	if (Array.isArray(result))
	{
		return result.map(item => (item instanceof Model ? convertDocument(item) : item));
	}

	if (result instanceof Model)
	{
		return convertDocument(result);
	}

	return result;
};


export async function GQL(app: Express)
{
	async function GQL_buildSchema(): Promise<ApolloServer>
	{

		const schema = await buildSchema({
			resolvers: [
				UserResolver
			],
			emitSchemaFile: true,
			validate: false,
			globalMiddlewares: [TypegooseMiddleware],
			// use ObjectId scalar mapping
			scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
			authChecker
		});

		const server = new ApolloServer({
			schema,
			context: contextBuilder,
			introspection: true,
			playground: true,
		});
		return server;
	}

	(await GQL_buildSchema()).applyMiddleware({ app: app });
}
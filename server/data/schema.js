import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInt,
	GraphQLString,
	GraphQLNonNull
} from 'graphql';

import { 
	mutationWithClientMutationId, 
	globalIdField,
	connectionDefinitions,
	connectionArgs,
	connectionFromArray
} from 'graphql-relay';

import { createLink, getLinks } from './links';

let Schema = (data) => {
	let store = getLinks();

	let storeType = new GraphQLObjectType({
		name: 'Store',
		fields: function() {
			return {
				id: globalIdField("Store"),
				linkConnection: {
					type: linkConnection.connectionType,
					args: connectionArgs,
					resolve: (_, args) => connectionFromArray(
						data,
						args
					)
				}
			}
		}
	});

	let linkType = new GraphQLObjectType({
		name: 'Link',
		fields: function() { 
			return  {
				id: { type: GraphQLString },
				title: { type: GraphQLString },
				url: { type: GraphQLString }
			}
		}
	});

	let linkConnection = new connectionDefinitions({
		name: "Link",
		nodeType: linkType
	});

	let createLinkMutation = mutationWithClientMutationId({
		name: 'CreateLink',

		inputFields: {
			title: { type: new GraphQLNonNull(GraphQLString) },
			url: { type: new GraphQLNonNull(GraphQLString) }
		},
		outputFields: {
			linkEdge: {
				type: linkConnection.edgeType,
				resolve: (obj) => {
					return ({ node: obj, cursor: obj.id });
				}
			},
			store: {
				type: storeType,
				resolve: () => {
					console.log(store);
					return store
				}
			}
		},
		mutateAndGetPayload: ({title, url}) => {
			let newLink = createLink(title, url);
			return newLink;
		}
	});

	let schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: function() {
				return {
					store: {
						type: storeType,
						resolve: () =>  {
							store = getLinks();
							return store;
						}
					}
				}
			}
		}),

		mutation: new GraphQLObjectType({
			name: "Mutation",
			fields: function() {
				return {
					createLink: createLinkMutation
				}
			}
		})
	});

	return schema;
};

export default Schema;

import graphene
import apis.schema


class Query(apis.schema.Query, graphene.ObjectType):
    pass


class Mutation(apis.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
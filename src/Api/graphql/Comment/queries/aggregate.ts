import { queryField, arg } from '@nexus/schema'

export const CommentAggregateQuery = queryField('aggregateComment', {
  type: 'AggregateComment',
  nullable: true,
  args: {
    where: 'CommentWhereInput',
    orderBy: arg({ type: 'CommentOrderByInput', list: true }),
    cursor: 'CommentWhereUniqueInput',
    distinct: 'CommentDistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.comment.aggregate({ ...args, ...select }) as any
  },
})

import { queryField, arg } from '@nexus/schema'

export const PostAggregateQuery = queryField('aggregatePost', {
  type: 'AggregatePost',
  nullable: true,
  args: {
    where: 'PostWhereInput',
    orderBy: arg({ type: 'PostOrderByInput', list: true }),
    cursor: 'PostWhereUniqueInput',
    distinct: 'PostDistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.post.aggregate({ ...args, ...select }) as any
  },
})

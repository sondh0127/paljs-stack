import { queryField, arg } from '@nexus/schema'

export const ProjectAggregateQuery = queryField('aggregateProject', {
  type: 'AggregateProject',
  nullable: true,
  args: {
    where: 'ProjectWhereInput',
    orderBy: arg({ type: 'ProjectOrderByInput', list: true }),
    cursor: 'ProjectWhereUniqueInput',
    distinct: 'ProjectDistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.project.aggregate({ ...args, ...select }) as any
  },
})

import { queryField, arg } from '@nexus/schema'

export const ProjectFindCountQuery = queryField('findManyProjectCount', {
  type: 'Int',
  args: {
    where: 'ProjectWhereInput',
    orderBy: arg({ type: 'ProjectOrderByInput', list: true }),
    cursor: 'ProjectWhereUniqueInput',
    distinct: 'ProjectDistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.project.count(args as any)
  },
})

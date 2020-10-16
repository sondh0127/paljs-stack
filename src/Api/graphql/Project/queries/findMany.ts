import { queryField, arg } from '@nexus/schema'

export const ProjectFindManyQuery = queryField('findManyProject', {
  type: 'Project',
  nullable: true,
  list: true,
  args: {
    where: 'ProjectWhereInput',
    orderBy: arg({ type: 'ProjectOrderByInput', list: true }),
    cursor: 'ProjectWhereUniqueInput',
    distinct: 'ProjectDistinctFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.project.findMany({
      ...args,
      ...select,
    })
  },
})

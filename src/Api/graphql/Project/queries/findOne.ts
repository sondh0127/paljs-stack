import { queryField, arg } from '@nexus/schema'

export const ProjectFindOneQuery = queryField('findOneProject', {
  type: 'Project',
  nullable: true,
  args: {
    where: arg({
      type: 'ProjectWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.project.findOne({
      where,
      ...select,
    })
  },
})

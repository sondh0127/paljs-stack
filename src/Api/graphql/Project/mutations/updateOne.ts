import { mutationField, arg } from '@nexus/schema'

export const ProjectUpdateOneMutation = mutationField('updateOneProject', {
  type: 'Project',
  nullable: false,
  args: {
    where: arg({
      type: 'ProjectWhereUniqueInput',
      nullable: false,
    }),
    data: arg({
      type: 'ProjectUpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.project.update({
      where,
      data,
      ...select,
    })
  },
})

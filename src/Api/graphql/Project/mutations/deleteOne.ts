import { mutationField, arg } from '@nexus/schema'

export const ProjectDeleteOneMutation = mutationField('deleteOneProject', {
  type: 'Project',
  nullable: true,
  args: {
    where: arg({
      type: 'ProjectWhereUniqueInput',
      nullable: false,
    }),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    await prisma.onDelete({ model: 'Project', where })
    return prisma.project.delete({
      where,
      ...select,
    })
  },
})

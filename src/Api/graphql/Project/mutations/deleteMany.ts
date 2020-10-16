import { mutationField, arg } from '@nexus/schema'

export const ProjectDeleteManyMutation = mutationField('deleteManyProject', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: 'ProjectWhereInput',
      nullable: true,
    }),
  },
  resolve: async (_parent, { where }, { prisma }) => {
    await prisma.onDelete({ model: 'Project', where })
    return prisma.project.deleteMany({ where } as any)
  },
})

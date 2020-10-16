import { mutationField, arg } from '@nexus/schema'

export const ProjectUpdateManyMutation = mutationField('updateManyProject', {
  type: 'BatchPayload',
  args: {
    where: arg({
      type: 'ProjectWhereInput',
      nullable: true,
    }),
    data: arg({
      type: 'ProjectUpdateManyMutationInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.project.updateMany(args as any)
  },
})

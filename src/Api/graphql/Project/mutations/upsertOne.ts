import { mutationField, arg } from '@nexus/schema'

export const ProjectUpsertOneMutation = mutationField('upsertOneProject', {
  type: 'Project',
  nullable: false,
  args: {
    where: arg({
      type: 'ProjectWhereUniqueInput',
      nullable: false,
    }),
    create: arg({
      type: 'ProjectCreateInput',
      nullable: false,
    }),
    update: arg({
      type: 'ProjectUpdateInput',
      nullable: false,
    }),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.project.upsert({
      ...args,
      ...select,
    })
  },
})

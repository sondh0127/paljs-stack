import { mutationField, arg } from '@nexus/schema'

export const ProjectCreateOneMutation = mutationField('createOneProject', {
  type: 'Project',
  nullable: false,
  args: {
    data: arg({
      type: 'ProjectCreateInput',
      nullable: false,
    }),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.project.create({
      data,
      ...select,
    })
  },
})

import { objectType } from '@nexus/schema'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.int('id', { nullable: false })
    t.string('title', { nullable: false })
    t.string('description', { nullable: false })
    t.field('owner', {
      nullable: true,
      type: 'User',
      resolve(parent: any) {
        return parent['owner']
      },
    })
    t.int('ownerId', { nullable: true })
    t.field('createdAt', { nullable: false, type: 'DateTime' })
    t.field('updatedAt', { nullable: false, type: 'DateTime' })
  },
})

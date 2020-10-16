import AWS from 'aws-sdk'
import { arg, asNexusMethod, extendType, objectType } from '@nexus/schema'
import { GraphQLUpload } from 'apollo-server-micro'
import { v4 as uuidV4 } from 'uuid'

const s3Bucket = new AWS.S3({
  endpoint: process.env.MINIO_END_POINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  s3ForcePathStyle: true, // needed with minio?
  signatureVersion: 'v4',
})

export const Upload = asNexusMethod(GraphQLUpload!, 'upload')

export const UploadFile = objectType({
  name: 'UploadFile',
  definition(t) {
    t.string('uri')
    t.string('filename')
  },
})

export const UploadQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('uploads', {
      type: 'Project',
      nullable: true,
      list: true,
      resolve: async (_, __, { prisma, select, userId }) => {
        if (!userId) return null
        return []
      },
    })
  },
})

const singleUpload = async (createReadStream: any, filename: string) => {
  const fileStream = createReadStream()
  const fileName = filename.substr(0, filename.lastIndexOf('.'))
  const fileExtension = filename.substr(filename.lastIndexOf('.') + 1)
  const { Location } = await s3Bucket
    .upload({
      Bucket: process.env.DESTINATION_BUCKET_NAME || 'sondh0127',
      Key: `${fileName}-${uuidV4()}.${fileExtension}`,
      Body: fileStream,
    })
    .promise()

  console.log(Location)

  return Location
}

export const UploadMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('singleUpload', {
      type: 'UploadFile',
      args: {
        file: arg({
          type: 'Upload',
          nullable: false,
        }),
      },
      resolve: async (_parent, { file }, ctx) => {
        const { createReadStream, filename } = await file
        const uploadedFile = await singleUpload(createReadStream, filename)
        return {
          filename,
          uri: uploadedFile,
        }
      },
    })
  },
})

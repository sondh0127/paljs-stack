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

const singleUpload = async (createReadStream: any, filename: any) => {
  const fileStream = createReadStream()

  const { Location } = await s3Bucket
    .upload({
      Bucket: process.env.DESTINATION_BUCKET_NAME || 'sondh0127',
      Key: `${uuidV4()}-${filename}`,
      Body: fileStream,
    })
    .promise()

  // Get the link representing the uploaded file

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
        const { createReadStream, filename, mimetype, encoding } = await file
        const uploadedFile = await singleUpload(createReadStream, filename)

        return {
          filename,
          uri: uploadedFile,
        }
      },
    })
  },
})

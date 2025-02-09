import { prisma } from "./prismaSetup";

export async function createMetadata(
  senderMail: string,
  receiverMail: string,
  fileName: string,
  fileType: string,
  signedUrl: string,
  verificationCode: string
) {
  const result = await prisma.metadata.create({
    data: {
      senderMail,
      receiverMail,
      fileName,
      fileType,
      signedUrl,
      verificationCode
    },
  });

  return result.id
}

export async function confirmCode(id: string, confirmationCode: string) {
  const retrieve = await prisma.metadata.findUnique({
    where: {
      id: id
    }
  })

  if (!retrieve || !retrieve.verificationCode) {
    return false
  }

  if (retrieve.validated) {
    throw new Error("Transfer already validated.")
  }
  return retrieve.verificationCode === confirmationCode
}

export async function verifyStatus(id: string) {
  const result = await prisma.metadata.update({
    where: {
      id: id
    }, 
    data: {
      validated: true
    }
  })
  return result
}

export async function retrieveMetadata(id: string) {
  const result = await prisma.metadata.findUnique({
    where: {
      id: id
    }
  })

  return result
}
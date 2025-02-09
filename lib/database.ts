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

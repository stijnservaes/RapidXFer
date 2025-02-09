import { prisma } from "./prismaSetup";

export async function createMetadata(
  senderMail: string,
  receiverMail: string,
  fileName: string,
  fileType: string,
  signedUrl: string,
) {
  await prisma.metadata.create({
    data: {
      senderMail,
      receiverMail,
      fileName,
      fileType,
      signedUrl,
    },
  });
}

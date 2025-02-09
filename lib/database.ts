import { prisma } from "./prisma";

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

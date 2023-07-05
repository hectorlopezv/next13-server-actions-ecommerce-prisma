import { PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient | undefined;
}
const clientBase = globalThis.prisma || new PrismaClient();
const prisma = clientBase.$extends({
  query: {
    cart: {
      async update({ args, query }) {
        args.data = { ...args.data, updatedAt: new Date() };
        return query(args);
      },
    },
  },
});
if (process.env.NODE_ENV === "development") {
  globalThis.prisma = clientBase;
}
export default prisma;

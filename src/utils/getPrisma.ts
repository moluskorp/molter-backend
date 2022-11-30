import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { clients } from './clients';
import jwt_decode from 'jwt-decode';

type DecodedJwt = {
  subdomain: string;
};

export const getPrisma =(request: Request) => {
  const token = request.headers.authorization;
    if (token) {
        const tokenWithoutBearer = token.replace('Bearer ', '');
        const { subdomain } = jwt_decode(tokenWithoutBearer) as DecodedJwt;
        const databaseOptions = clients.find(
            (client) => client.subdomain === subdomain,
        );
        const prisma = new PrismaClient({
            datasources: {
                db: {
                    url: `postgresql://${databaseOptions.user}:${databaseOptions.password}@${databaseOptions.ip}:${databaseOptions.port}/${databaseOptions.subdomain}?schema=public`,
                },
            },
        });
        prisma.$connect().then(() => {})
        return prisma;
    }
  return null;
}

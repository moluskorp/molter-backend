import { PrismaClient } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';
import jwt_decode from 'jwt-decode';
import { clients } from './utils/clients';

type DecodedJwt = {
  subdomain: string;
};

export async function ConnectionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let passouPeloElse = false;
  try {
    const token = req.headers.authorization;
    if (token) {
      const tokenWithoutBearer = token
        .replace('Bearer', '')
        .replace('undefined', '')
        .trim();
      if (!tokenWithoutBearer) {
        res.locals.prisma = new PrismaClient();
      } else {
        const { subdomain } = jwt_decode(tokenWithoutBearer) as DecodedJwt;
        const databaseOptions = clients.find(
          (client) => client.subdomain === subdomain,
        );
        res.locals.prisma = new PrismaClient({
          datasources: {
            db: {
              url: `postgresql://${databaseOptions.user}:${databaseOptions.password}@${databaseOptions.ip}:${databaseOptions.port}/${databaseOptions.subdomain}?schema=public`,
            },
          },
        });
        await res.locals.prisma.$connect();
      }
    } else {
      passouPeloElse = true;
      res.send({
        type: 'error',
        message: 'Token inexistente',
      });
    }
    next();
  } catch (err) {
    if (!passouPeloElse) {
      res.send({
        type: 'error',
        message: 'Erro ao conectar ao banco de dados',
      });
    }
  }
}

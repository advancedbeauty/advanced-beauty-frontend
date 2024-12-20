import { NextRequest } from 'next/server';

export function runMiddleware(req: NextRequest, res: Response, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

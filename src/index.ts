import express, { Request, Response } from 'express';
import { PrismaClient } from './generated/prisma/index';
import cors from 'cors';

const app = express();
app.use(cors());
const prisma = new PrismaClient();
const port = 3000;

app.use(express.json())

app.get('/', (_req, res) => {
    res.send('Hello, ESM + TypeScript + Express!');
});
app.get("/hi", (_req, res) => {
    res.send("Hello, World!"+_req.query.name);
}
);

app.post('/signup', async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        // 4xx (400 till 499) - Client Error
        //return ture -> bolean; return int -> integer;
        return void res.sendStatus(422); // Unprocessable Entity
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            // 4xx (400 till 499) - Client Error
            return void res.sendStatus(409); // Conflict
        }
    } catch (error) {
        console.error('Error checking existing user:', error);
        return void res.sendStatus(500); // Internal Server Error
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password, 
        },
    });

    res.status(201).json(user);
});

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});
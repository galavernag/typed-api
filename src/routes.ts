import z from "zod";
import { FastifyTypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

export async function routes(app: FastifyTypedInstance) {
  const users: User[] = [];

  app.get(
    "/users",
    {
      schema: {
        description: "List all users",
        tags: ["users"],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
            })
          ),
        },
      },
    },
    async (req, reply) => {
      return reply.status(200).send(users);
    }
  );

  app.post(
    "/users",
    {
      schema: {
        description: "Create a new user",
        tags: ["users"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.null().describe("User created"),
        },
      },
    },
    async (req, reply) => {
      const { name, email } = req.body;

      users.push({
        id: randomUUID(),
        name,
        email,
      });
      return reply.status(201).send();
    }
  );
}

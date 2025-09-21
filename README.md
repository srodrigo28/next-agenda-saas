#### NextJS 15
#### TypeScript
#### React 19
#### TailwindCSS 4
#### ShadCN UI

#### Preview Web Home
<img src="./preview/web-home.png" alt="">

<img src="./preview/web-home-2.png" alt="">

#### Preview Mobile Home
<img src="./preview/mobile-home.png" alt="">

#### Preview Mobile Menu
<img src="./preview/mobile-menu.png" alt="">

#### Inciando Prisma
    ``` 1.
    npm i prisma --save-dev
    ```

    ``` 2.
    npx prisma init
    ```

    ``` 3. prisma client
    npm i @prisma/client
    ```

    ``` 4. src/lib/prisma.ts
    import { PrismaClient } from "@prisma/client";

        let prisma: PrismaClient;

        if (process.env.NODE_ENV === "production") {
            prisma = new PrismaClient();
        } else {
            let globalWithPrisma = global as typeof globalThis & {
                prisma: PrismaClient;
            };

            if (!globalWithPrisma.prisma) {
                globalWithPrisma.prisma = new PrismaClient();
            }

            prisma = globalWithPrisma.prisma;
        }

        export default prisma;
    ```

#### Adpter
npx auth secret
npm install next-auth@beta
npm install @auth/prisma-adapter

#### Fazendo nossa migration
npx prisma migrate dev

#### Toda vez que fazer uma migration
npx prisma generate
npx prisma generate

#### Verificar as tabelas criadas
npx prisma studio

#### Forms para Profil
form validate, zod
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select

#### 32 uma travada

* Alterar no profile.tsx
```
// import { Prisma } from "@prisma/client"
import { Prisma } from "@/generated/prisma" // 
```

* alterar no profile/page.tsx
```
import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import { getUserDate } from './_data_access/get-info-user'
import { ProfileContent } from './_components/profile'

export default async function Profile() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  const user = await getUserDate({ userId: session.user?.id })

  if (!user) {
    redirect("/") // ou outra ação
  }

  return <ProfileContent user={user} />
}
```
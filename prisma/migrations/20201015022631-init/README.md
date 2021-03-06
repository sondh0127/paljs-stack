# Migration `20201015022631-init`

This migration has been generated by Son Do Hong at 10/15/2020, 9:26:31 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "groupId" INTEGER,

    FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "authorId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contain" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "authorId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201015022631-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,54 @@
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+// models examples
+model User {
+  id        Int       @default(autoincrement()) @id
+  createdAt DateTime  @default(now())
+  email     String    @unique
+  name      String?
+  password  String
+  /// @onDelete(CASCADE)
+  posts     Post[]
+  group     Group?    @relation(fields: [groupId], references: [id])
+  groupId   Int?
+  /// @onDelete(SET_NULL)
+  comments  Comment[]
+}
+
+model Post {
+  id        Int       @default(autoincrement()) @id
+  published Boolean   @default(false)
+  title     String
+  author    User?     @relation(fields: [authorId], references: [id])
+  authorId  Int?
+  /// @onDelete(CASCADE)
+  comments  Comment[]
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+}
+
+model Comment {
+  id        Int      @default(autoincrement()) @id
+  contain   String
+  post      Post     @relation(fields: [postId], references: [id])
+  postId    Int
+  author    User?    @relation(fields: [authorId], references: [id])
+  authorId  Int?
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
+model Group {
+  id        Int      @default(autoincrement()) @id
+  name      String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  /// @onDelete(SET_NULL)
+  users     User[]
+}
```



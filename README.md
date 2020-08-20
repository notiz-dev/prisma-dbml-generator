# Prisma DBML Generator

## Getting started

```prisma
generator dbml {
  provider = "node ./dist/index.js"
}
```

Running `npx prisma generator` for the following Prisma schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  email     String   @unique
  name      String?
  posts     Post[]
  profile   Profile?
  /// user role
  role      Role
}

/// User profile
model Profile {
  id     Int     @default(autoincrement()) @id
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

/// user role
enum Role {
  ADMIN /// allowed to do everything
  USER
}
```

generates the following DBML schema

```dbml
Table User {
	id Int [pk, increment]
	createdAt DateTime [default: `now()`, not null]
	updatedAt DateTime [not null]
	email String [unique, not null]
	name String
	posts Post
	profile Profile
	role Role [not null, note: 'user role']
}

Table Profile {
	id Int [pk, increment]
	bio String
	user User [not null]
	userId Int [unique, not null]

	Note: 'User profile'
}

Table Post {
	id Int [pk, increment]
	title String [not null]
	content String
	published Boolean [not null, default: false]
	author User
	authorId Int
}

Enum Role {
	ADMIN
	USER
}

Ref: Profile.userId - User.id

Ref: Post.authorId > User.id
```

https://dbdiagram.io

https://www.dbml.org/home

## Development

```bash
npm run dev
```

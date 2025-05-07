import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create dummy users
    await prisma.user.createMany({
        data: [
            { id: '1', email: 'user1@example.com', name: 'User 1' },
            { id: '2', email: 'user2@example.com', name: 'User 2' }
        ]
    });

    // Create dummy groups
    await prisma.group.createMany({
        data: [
            { id: '1', name: 'Group A', description: 'This is Group A' },
            { id: '2', name: 'Group B', description: 'This is Group B' }
        ]
    });

    // Create dummy plans
    await prisma.plan.createMany({
        data: [
            {
                id: '1',
                groupId: '1',
                createdById: '1',
                title: 'Plan 1',
                description: 'This is Plan 1',
                status: 'queued'
            },
            {
                id: '2',
                groupId: '2',
                createdById: '1',
                title: 'Plan 2',
                description: 'This is Plan 2',
                status: 'queued'
            }
        ]
    });

    console.log('Dummy data seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
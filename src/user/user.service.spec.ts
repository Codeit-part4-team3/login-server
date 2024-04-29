import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              delete: jest.fn(),
            },
            state: {
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('유저 생성', async () => {
    await service.createUser({
      email: 'test@naver.com',
      password: 'sprint101',
      nickname: 'test',
    });
    expect(prismaService.user.create).toHaveBeenCalled();
  });

  it('유저 삭제', async () => {
    await service.deleteUser(0);
    expect(prismaService.user.delete).toHaveBeenCalled();
  });
});

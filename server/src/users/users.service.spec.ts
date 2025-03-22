import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      const result = service.create(user);
      expect(result).toEqual({ id: 1, ...user });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      service.create(user);
      const result = service.findAll();
      expect(result).toEqual([{ id: 1, ...user }]);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      service.create(user);
      const result = service.findOne(1);
      expect(result).toEqual({ id: 1, ...user });
    });

    it('should throw NotFoundException if user not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing user', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      service.create(user);
      const updateUser = { name: 'Jane Doe' };
      const result = service.update(1, updateUser);
      expect(result).toEqual({
        id: 1,
        name: 'Jane Doe',
        email: 'john@example.com',
      });
    });

    it('should throw NotFoundException if user to update not found', () => {
      const updateUser = { name: 'Jane Doe' };
      expect(() => service.update(999, updateUser)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an existing user', () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      service.create(user);
      service.remove(1);
      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if user to remove not found', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});

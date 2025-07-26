import { Test, TestingModule } from '@nestjs/testing';
import { ResenaService } from './resena.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resena } from './entities/resena.entity';
import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Repository } from 'typeorm';
import { NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { EstadoReserva } from 'src/common/enums/estadoReserva.enum';
import { CreateResenaDto } from './dto/create-resena.dto';

describe('ResenaService', () => {
  let service: ResenaService;
  let resenaRepo: Repository<Resena>;
  let reservaRepo: Repository<Reserva>;

  const mockResenaRepo = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockReservaRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResenaService,
        { provide: getRepositoryToken(Resena), useValue: mockResenaRepo },
        { provide: getRepositoryToken(Reserva), useValue: mockReservaRepo },
      ],
    }).compile();

    service = module.get(ResenaService);
    resenaRepo = module.get(getRepositoryToken(Resena));
    reservaRepo = module.get(getRepositoryToken(Reserva));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createResenaDto: CreateResenaDto = {
    puntuacion: 4.5,
    comentario: 'Muy buena experiencia',
  };

  const mockReserva = {
    idReserva: 1,
    idUsuario: 10,
    estado: EstadoReserva.FINALIZADA,
    fechasExperiencia: {
      idExperiencia2: {
        idExperiencia: 99,
      },
    },
  };

  it('lanza error si la reserva no existe', async () => {
    mockReservaRepo.findOne.mockResolvedValue(null);

    await expect(
      service.create(1, createResenaDto, 10),
    ).rejects.toThrow(NotFoundException);
  });

  it('lanza error si el usuario no es dueño de la reserva', async () => {
    mockReservaRepo.findOne.mockResolvedValue({ ...mockReserva, idUsuario: 999 });

    await expect(
      service.create(1, createResenaDto, 10),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('lanza error si la reserva no está finalizada', async () => {
    mockReservaRepo.findOne.mockResolvedValue({ ...mockReserva, estado: EstadoReserva.PENDIENTE });

    await expect(
      service.create(1, createResenaDto, 10),
    ).rejects.toThrow(BadRequestException);
  });

  it('lanza error si ya existe una reseña', async () => {
    mockReservaRepo.findOne.mockResolvedValue(mockReserva);
    mockResenaRepo.findOne.mockResolvedValue({ idResena: 1 });

    await expect(
      service.create(1, createResenaDto, 10),
    ).rejects.toThrow(BadRequestException);
  });

  it('crea una reseña si todo es válido', async () => {
    mockReservaRepo.findOne.mockResolvedValue(mockReserva);
    mockResenaRepo.findOne.mockResolvedValue(null);

    const createdResena = { idResena: 1, ...createResenaDto };
    mockResenaRepo.create.mockReturnValue(createdResena);
    mockResenaRepo.save.mockResolvedValue(createdResena);

    const result = await service.create(1, createResenaDto, 10);

    expect(resenaRepo.create).toHaveBeenCalledWith({
      idUsuario: 10,
      puntuacion: 4.5,
      comentario: 'Muy buena experiencia',
      fecha: expect.any(Date),
      idExperiencia: 99,
    });

    expect(resenaRepo.save).toHaveBeenCalledWith(createdResena);
    expect(result).toEqual(createdResena);
  });
});

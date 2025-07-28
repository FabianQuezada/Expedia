
import { BadRequestException } from '@nestjs/common';
import { ProveedorUpdateLog } from '../entities/proveedorUpdateLog.entity';


export const validarPoliticaCampo = (
  campo: string,
  logs: ProveedorUpdateLog[],
) => {
  const ahora = new Date();
  let limite: number;
  let periodoMs: number;

  switch (campo) {
    case 'nombreEmpresa':
      limite = 1;
      periodoMs = 1000 * 60 * 60 * 24 * 30 * 6; // 6 meses
      break;
    case 'descripcion':
    case 'telefono':
      limite = 5;
      periodoMs = 1000 * 60 * 60 * 24 * 7; // 1 semana
      break;
    default:
      return;
  }

  const desde = new Date(ahora.getTime() - periodoMs);
  const logsCampo = logs.filter(
    (log) => log.campo === campo && log.fecha > desde,
  );

  if (logsCampo.length >= limite) {
    throw new BadRequestException(
      `El campo "${campo}" ha alcanzado el límite de ${limite} actualizaciones en el período permitido.`,
    );
  }
};

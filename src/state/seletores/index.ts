import { selector } from 'recoil';
import { filtroDeEventos, listaDeEventosState } from '../atom';

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);
    const eventosData = todosOsEventos.filter(evt => {
      if(!filtro.data) {
        return true
      }
      const isSameDay = filtro.data.toISOString().slice(0, 10) === evt.inicio.toISOString().slice(0, 10);
      return isSameDay;
    });
    const eventos = eventosData.filter(evt => {
      switch(filtro.estado){
        case 'Completos':
          return evt.completo
        case 'Incompletos':
          return !evt.completo
        default:
          return true;
      }
    });
    return eventos;
  }
});

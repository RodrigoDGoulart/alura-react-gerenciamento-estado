import { selector } from 'recoil';
import { filtroDeEventos, listaDeEventosState } from '../atom';

export const eventosFiltradosState = selector({
  key: 'eventosFiltradosState',
  get: ({ get }) => {
    const filtro = get(filtroDeEventos);
    const todosOsEventos = get(listaDeEventosState);
    const eventos = todosOsEventos.filter(evt => {
      if(!filtro.data) {
        return true
      }
      const isSameDay = filtro.data.toISOString().slice(0, 10) === evt.inicio.toISOString().slice(0, 10);
      return isSameDay;
    });
    return eventos;
  }
});

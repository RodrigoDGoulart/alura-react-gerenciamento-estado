import { selector } from 'recoil';
import { filtroDeEventos, listaDeEventosState } from '../atom';
import { IEvento } from '../../interfaces/IEvento';

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

export const eventosAsync = selector({
  key: 'eventosAsync',
  get: async () => {
    const respostaHttp = await fetch('http://localhost:8080/eventos');
    const eventosJson: IEvento[] = await respostaHttp.json();
    return eventosJson.map(evt => ({
      ...evt,
      inicio: new Date(evt.inicio),
      fim: new Date(evt.fim)
    }));
  }
});

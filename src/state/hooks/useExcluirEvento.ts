import { IEvento } from "../../interfaces/IEvento";
import { useSetRecoilState } from 'recoil';
import { listaDeEventosState } from "../atom";

const useExcluirEvento = () => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
  
  return (evento: IEvento) => {
    return setListaDeEventos(listaAntiga => listaAntiga.filter(evt => evt.id !== evento.id));
  }
}

export default useExcluirEvento;
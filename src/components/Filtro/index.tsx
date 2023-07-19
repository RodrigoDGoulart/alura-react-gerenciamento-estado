import React, { useState } from 'react';
import style from './Filtro.module.scss';
import { useSetRecoilState } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';
import { filtroDeEventos } from '../../state/atom';
import { FormControl, Select, MenuItem } from '@mui/material';

const Filtro: React.FC = () => {
  
  const [data, setData] = useState('');
  const [estado, setEstado] = useState<'Completos' | 'Incompletos' | 'Ambos'>('Ambos');

  const setFiltroDeEvento = useSetRecoilState<IFiltroDeEventos>(filtroDeEventos)
  
  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const filtro = {} as IFiltroDeEventos;
    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }
    filtro.estado = estado;
    setFiltroDeEvento(filtro);
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por data</h3>
    <input 
      type="date" 
      name="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)} 
      placeholder="Por data"
      value={data} />
    <FormControl sx={{ m: 1, minWidth: 120, bgcolor: 'white' }}>
        <Select
          value={estado}
          onChange={e => setEstado(e.target.value as 'Completos' | 'Incompletos' | 'Ambos')}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value='Ambos'>
            <em>Ambos</em>
          </MenuItem>
          <MenuItem value={'Completos'}>Completos</MenuItem>
          <MenuItem value={'Incompletos'}>Incompletos</MenuItem>
        </Select>
      </FormControl>
    <button className={style.botao}>
      Filtrar
    </button>

  </form>)
}

export default Filtro
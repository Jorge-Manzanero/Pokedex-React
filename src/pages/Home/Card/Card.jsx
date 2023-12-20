import React, { useEffect, useState } from "react";
import css from "./card.module.scss"
import axios from "axios";
import { URL_EVOLUTIONS, URL_POKEMON, URL_SPECIES } from "../../../api/apiRest";


export default function Card({card}){

const [itemPokemon, setItemPokemon] = useState({})
const [speciePokemon, setSpeciePokemon] = useState({})
const [evolutionsPokemon, setEvolutionsPokemon] = useState([])


useEffect(() =>{
    const dataPokemon = async() => {
        const api = await axios.get(`${URL_POKEMON}/${card.name}`)
        setItemPokemon(api?.data)
    }
    dataPokemon()
},[card])

useEffect(() =>{

    const dataSpeciePokemon = async() => {
    const URL = card.url.split("/")
        const api = await axios.get(`${URL_SPECIES}/${URL[6]}`)
        setSpeciePokemon({
         urlEspecie: api?.data?.evolution_chain , 
                data: api?.data
        });
    }
    dataSpeciePokemon()
},[card])


useEffect(() =>{

async function getPokemonImg(id) {
    const response = await axios.get(`${URL_POKEMON}/${id}`)
    return(response?.data?.sprites?.other[`official-artwork`].front_default)
}



if(speciePokemon?.urlEspecie){
    const getEvolutions = async() => {

        const arrayEvolution = []
        const URL = speciePokemon?.urlEspecie?.url?.split("/")
        const api = await axios.get(`${URL_EVOLUTIONS}/${URL[6]}`)

        const URL2 = api?.data?.chain?.species?.url.split(`/`)
        const img1 = await getPokemonImg(URL2[6])


        arrayEvolution.push({
            img: img1,
            name: api?.data?.chain?.species?.name
            })

        if(api?.data?.chain?.evolves_to?.length !== 0){

            const DATA2 = api?.data?.chain?.evolves_to[0]?.species
            const ID = DATA2?.url.split(`/`)
            const img2 = await getPokemonImg(ID[6])

            arrayEvolution.push({
                img: img2,
                name: DATA2?.name
                })

            if(api?.data?.chain?.evolves_to[0]?.evolves_to?.length !== 0){
                const DATA3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species
                const ID = DATA3?.url?.split(`/`)
                const img3 = await getPokemonImg(ID[6])

                arrayEvolution.push({
                    img: img3,
                    name: DATA3?.name
                    })
            } 
    }

    setEvolutionsPokemon(arrayEvolution)

        }
        getEvolutions();
    }
},[speciePokemon])




let pokemonId = itemPokemon?.id?.toString()

if (pokemonId?.length === 1) {pokemonId = "00" + pokemonId}
else if(pokemonId?.length === 2){ pokemonId = "0" + pokemonId}

    return(
        <div className={css.card}>
            <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt="pokemon card"/>
            <div className={`bg-${speciePokemon?.data?.color?.name}  ${css.sub_card}`}>
                <strong className={css.id_card}>{pokemonId}</strong>
                <strong className={css.name_card}> {itemPokemon.name} </strong>
                <h4 className={css.height_card}>Altua: {itemPokemon.height}0 cm</h4>
                <h4 className={css.weight_card}>Peso: {itemPokemon.weight * 0.1} Kg</h4>
                <h4 className={css.habitat_card}>Habitat: {speciePokemon?.data?.habitat?.name}</h4>



                    <div className={css.div_stats}>
                    {itemPokemon?.stats?.map((sta, index) => {
                        return (
                            <h6 key={index} className={css.item_stats}>
                                <span className={css.name}> {sta.stat.name} </span>
                                <progress value={sta.base_stat} max={110}></progress>
                                <span className={css.numero}> {sta.base_stat} </span>
                            </h6>
                            );
                        })}
                    </div>

                    <div className={css.div_type_color}>
                        {itemPokemon?.types?.map((ti, index) => {
                        return (
                        <h6
                            key={index}
                            className={`color-${ti.type.name}  ${css.color_type} `}
                        >
                            {ti.type.name}
                        </h6>
                        );
                        })}
                    </div>
                    <div className={css.div_evolution}>
          {evolutionsPokemon.map((evo, index) => {
            return (
              <div key={index} className={css.item_evolution}>
                <img src={evo.img} alt="evo" className={css.img} />
                <h6> {evo.name} </h6>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
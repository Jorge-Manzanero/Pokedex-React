import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import css from "./layout.module.scss"
import axios from "axios"
import * as Faicons from "react-icons/fa"
import { URL_POKEMON } from "../../../api/apiRest"
import Card from "../Card/Card"


export default function LayoutHome(){

const  [arrayPokemon, setArrayPokemon] = useState([])
const [xpage, setXpage] = useState(1)
const [globalPokemon, setGlobalPokemon] = useState([])
const [search, setSearch] = useState([])

useEffect(() =>{
const api = async() =>{ 


    const limit = 15;
const xp = (xpage - 1) * limit;

    const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xp}&limit=${limit}`)
    setArrayPokemon(apiPoke.data.results)
}
api()
getGlobalPokemons();
    }, [xpage])

const getGlobalPokemons = async() =>{
    const response = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`)
    
const promises = response.data.results.map( (pokemon, index) =>{
    return(pokemon)})

    const results = await Promise.all(promises)
    setGlobalPokemon(results)

}


const filterPokemon = search.length > 0
? globalPokemon?.filter((pokemon) => pokemon?.name?.includes(search))
: arrayPokemon;


const getSearch = (e)=>{
 const text = e.toLowerCase()
 setSearch(text)
 setXpage(1)
}

    return( 
        <div className={css.layout}>
        <Header getSearch = {getSearch}/>

        <section className={css.section_pages}>
            <div className={css.div_pages}>
                <span className={css.item_left } onClick={() =>{ if(xpage === 1){return console.log("no puevo retroceder más allça de 1")}; setXpage(xpage - 1)
                    }}><Faicons.FaAngleLeft/></span>
                <span className={css.item}>{xpage}</span>
                <span className={css.item}>de</span>
                <span className={css.item}>{Math.round(globalPokemon?.length / 15)}</span>
                <span className={css.item_rigth} onClick={() =>{ if(xpage === 67){return console.log("ultimo")}; setXpage(xpage + 1)
                    }}
                ><Faicons.FaAngleRight/></span>

            </div>
        </section>

        <div className={css.card_content}>
            {filterPokemon.map((card, index)=>{
                return<Card key={index} card={card}/>
            })}
        </div>

        </div>)
}
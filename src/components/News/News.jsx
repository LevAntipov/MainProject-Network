import React, { useEffect, useState } from "react";
import classes from './News.module.css'
import { usersAPI } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from './../../redux/reduxStore'
import { requestUsers } from "../../redux/usersReducer";

// function deepCopy(obj) {

//     if (Array.isArray(obj)) {
//         return obj.map(deepCopy) // return obj.map((item) => deepCopy(item))
//     }

//     if (obj === null || obj.__proto__ !== Object.prototype) {
//         return obj // сюда попадет примитивный случай
//     }

//     let copy = {}

//     for (let i in obj) {
//         copy[i] = deepCopy(obj[i])
//     }
//     return copy

// }





function News() {
    const [pName, setPName] = useState("")
    const pokemons0 = [
        { id: 1, name: "charmander" },
        { id: 2, name: "pikachu" },
        { id: 4, name: "pikapikachu" },
        { id: 3, name: "bulbozavr" }]
    const [similarPokemons, setPokemos] = useState({})

    // function choosePokemon(e){
    //     let newobj = {}
    //     let partPokemonName = e.target.value
    //     pokemons0.forEach((pokemon)=>{
    //         if(partPokemonName != '' && pokemon.name.indexOf(partPokemonName) == 0){
    //             if(!similarPokemons[pokemon.id]){
    //                 newobj[pokemon.id] = pokemon
    //             }
    //         }
    //     })
    //     setPName(partPokemonName)
    //     setPokemos(newobj)
    // }
    function choosePokemon(e) {
        let partPokemonName = e.target.value;
        let newobj = {};

        if (partPokemonName !== "") {
            pokemons0.forEach((pokemon) => {
                if (pokemon.name.indexOf(partPokemonName) === 0) {
                    newobj[pokemon.id] = pokemon;
                }
            });
        }

        setPName(partPokemonName);
        setPokemos(newobj);
    }
    const obj = {
        person: {
            name: "Leva",
            surname: null,
            biologicalProp: {
                height: 185,
                weight: null
            },
            location: {
                country: "Russia"
            }
        },
        id: null
    }
    let arr = []
    function detectNull(obj, parentKey = '') {
        let arrOfNull = [];

        for (let key in obj) {
            const value = obj[key];
            const path = parentKey ? `${parentKey}.${key}` : key; // собираем путь

            if (value === null) {
                arrOfNull.push(path);
            } else if (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            ) {
                arrOfNull = arrOfNull.concat(detectNull(value, path));
            }
        }

        return arrOfNull;
    }
    
    function findNull(obj, parentKey=''){
        let newArr = [] //person.surname
        for(let i in obj){
            let newPath = parentKey ? `${parentKey}.${i}` : i
            if(obj[i] == null){
                newArr.push(newPath)
            }
            if(obj[i] !== null && obj[i].__proto__ === Object.prototype){
                newArr = newArr.concat(findNull(obj[i],newPath))
            }
        }
        return newArr
    }


    console.log(findNull(obj))
    return (
        <div>
            <input value={pName}
                onChange={(e) => choosePokemon(e)}
                placeholder="Введите покемона"
            ></input>
            <div>
                {Object.values(similarPokemons).map((item) => {
                    return <div key={item.id}>{item.name}</div>
                })}
            </div>
        </div>
    )




    // function useArray(arr) {
    //     const [value, setValue] = useState(arr);
    //     return {
    //         value,
    //         push() {
    //             let newArr = [...value, value.length + 1];
    //             setValue(newArr);
    //         },
    //         removeByIndex(index1) {
    //             setValue(value.filter((item, index) => index !== index1));
    //         }
    //     };
    // }

    // const { value, push, removeByIndex } = useArray([1, 2, 3]);

    // const [flag,setFlag] = useState()
    // useEffect(()=>{
    //     console.log('effect')
    // },[flag])
    // console.log('12')
    // return <div>
    //     {value.map((item, index) => {
    //         return <>
    //             {item}
    //             <button onClick={() => removeByIndex(index)}>Удалить</button>
    //         </>;
    //     })}
    //     <br />
    //     <button onClick={push}>Добавить</button>
    //     <br />
    //     <div>--------------</div>
    //     <span>{String(flag)}</span>
    //     <button onClick={()=>setFlag(!flag)}>Нажми на кнопку</button>
    // </div>;
}



export default News
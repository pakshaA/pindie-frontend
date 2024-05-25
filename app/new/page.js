'use client'

import { useGetDataBtCategory } from "../api/api-hooks";
import { CardsListSection } from "../components/CardsListSection/CardListSection";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    const newGames = useGetDataBtCategory(endpoints.games, "new")

    return (
        <main className={"main-inner"}>
            { newGames ? (
                <CardsListSection type='slider' id='new' title="Новинки" data={newGames}/> 
            ) : (
                <Preloader/>
            )}
        </main>
    )
}
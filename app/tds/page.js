'use client'

import { CardsListSection } from "../components/CardsListSection/CardListSection";
import { useGetDataBtCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
import { endpoints } from "../api/config";


export default function New() {
    const tdsGames = useGetDataBtCategory(endpoints.games, "TDS");

    return (
        <main className={"main-inner"}>
            {tdsGames ? (
                <CardsListSection type='slider' id='tds' title="TDS" data={tdsGames}/>
            ) : (
                <Preloader />
            )}
        </main>
    )
}
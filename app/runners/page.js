'use client'

import { CardsListSection } from "../components/CardsListSection/CardListSection";
import { useGetDataBtCategory } from "../api/api-hooks";
import { endpoints } from "../api/config";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    const runnerGames = useGetDataBtCategory(endpoints.games, "runner");

    return (
        <main className={"main-inner"}>
            { runnerGames ? (
                <CardsListSection type='slider' id='runner' title="Ранеры" data={runnerGames}/>
            ) : (
                <Preloader />
            )}
        </main>
    )
}
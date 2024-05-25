'use client'

import { CardsListSection } from "../components/CardsListSection/CardListSection";
import { endpoints } from "../api/config";
import { useGetDataBtCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    const pixelGames = useGetDataBtCategory(endpoints.games, "pixel");

    return (
        <main className={"main-inner"}>
            {pixelGames ? (
            <CardsListSection type='slider' id='pixel' title="Пиксельные" data={pixelGames}/>
            ) : (
                <Preloader />
            )}
        </main>
    )
}
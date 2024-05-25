'use client'

import { CardsListSection } from "../components/CardsListSection/CardListSection";
import { useGetDataBtCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
import { endpoints } from "../api/config";

export default function New() {
    const shooterGames = useGetDataBtCategory(endpoints.games, "shooter")

    return (
        <main className={"main-inner"}>
            {shooterGames ? (
                <CardsListSection type='slider' id='shooter' title="Шутеры" data={shooterGames}/>
            ) : (
                <Preloader />
            )}
        </main>
    )
}
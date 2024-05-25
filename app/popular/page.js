'use client'

import { endpoints } from "../api/config";
import { CardsListSection } from "../components/CardsListSection/CardListSection";
import { useGetDataBtCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function New() {
    const popularGames = useGetDataBtCategory(endpoints.games, "popular")
    
    return (
        <main className={"main-inner"}>
            { popularGames ? (
                <CardsListSection type='slider' id='popular' title="Популярные" data={popularGames} />
            ) : (
                <Preloader/>
            )}
        </main>
    )
}
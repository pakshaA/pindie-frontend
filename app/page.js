'use client'

import { useGetDataBtCategory } from "./api/api-hooks";

import {Banner} from "./components/Banner/Banner";
import {Promo} from "./components/Promo/Promo";
import { CardsListSection } from "./components/CardsListSection/CardListSection";
import { Preloader } from "./components/Preloader/Preloader";
import { endpoints } from "./api/config";


export default function Home() {
  const popularGames = useGetDataBtCategory(endpoints.games, "popular");
  const newGames = useGetDataBtCategory(endpoints.games, "new");
  return (
    <div>
      <main>
        <Banner />
        {popularGames && newGames ? (
          <>
            <CardsListSection type='slider' id="popular" title="Популярные" data={popularGames}/>
            <CardsListSection type='slider' id="new" title="Новинки" data={newGames}/>
          </>
        ) : (
          <Preloader />
        )}
        <Promo />
      </main>
    </div>
  );
}

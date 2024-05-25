"use client"

import { getNormalizedGameDataById } from "@/app/api/api-utils";
import Styles from "./Game.module.css";
import { useEffect } from "react";
import { endpoints } from "@/app/api/config";
import { useState, useContext } from "react";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { GameNotFound } from "@/app/components/GameNotFound/GameNotFound";
import { isResponseOk } from "@/app/isResponseOk/isResponseOk";
import { checkIfUserVoted } from "@/app/api/api-utils";
import { vote } from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";
import { getJWT } from "@/app/api/api-utils";


export default function GamePage(props) {
    const authContext = useStore()
    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const [isVoted, setIsVoted] = useState(false);
    const [game, setGame] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setPreloaderVisible(true);
          const game = await getNormalizedGameDataById(
            endpoints.games,
            props.params.id
          );
          isResponseOk(game) ? setGame(game) : setGame(null);
          setPreloaderVisible(false);
        }
        fetchData();
      }, []);
        
      useEffect(() => { 
          authContext.user && game ? setIsVoted(checkIfUserVoted(game, authContext.user.id)) : setIsVoted(false);
      }, [authContext.user, game]);
    useEffect(() => {
    }, [authContext.user, game]);

    const handleVote = async () => {
        const jwt = getJWT()
        if (jwt) {
            let usersIdArray = game.users.length ? game.users.map((user) => user.id) : []
            usersIdArray.push(authContext.user.id)
            const response = await vote(
                `${endpoints.games}/${game.id}`,
            jwt,
            usersIdArray
            );
            if (isResponseOk(response)) {
                setIsVoted(true)
                setGame(() => {
                    return {
                        ...game,
                        users: [...game.users, authContext.user],
                    }
                })
            }
        }
    }

  return (
    <main className="main">
      {
        game ? (
            <>
                <section className={Styles['game']}>
                    <iframe className={Styles['game__iframe']} src={game.link}></iframe>
                </section>
                <section className={Styles['about']}>
                    <h2 className={Styles['about__title']}>{game.title}</h2>
                    <div className={Styles['about__content']}>
                    <p className={Styles["about__description"]}>{game.description}</p>
                    <div className={Styles["about__author"]}>
                        <p>Автор: <span className={Styles["about__accent"]}>{game.developer}</span></p>
                    </div>
                    </div>
                    <div className={Styles["about__vote"]}>
                    <p className={Styles["about__vote-amount"]}>За игру уже проголосовали: 
                        <span className={Styles["about__accent"]}>
                            {game.users.length}
                        </span>
                    </p>
                    <button onClick={handleVote} disabled={!authContext.isAuth || isVoted} className={`button ${Styles["about__vote-button"]}`}>{isVoted ? "Голос учтен" : "Голосовать"}</button>
                    </div>
                </section>
            </>
            ) : preloaderVisible ? (
                <Preloader />
            ) : (
                <GameNotFound />
            )
        }
    </main>
  );
}
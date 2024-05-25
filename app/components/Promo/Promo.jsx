"use client"

import { useState, useEffect } from 'react'
import Style from './Promo.module.css'

export const Promo = () => {

    const [codeIsVisible, setCodeVisibility] = useState(false)

    const handleButtonClick = () => {
        setCodeVisibility(true)
    }

    useEffect(() => {
        let timeout
        if (codeIsVisible) {
            timeout = setTimeout(() => {
                setCodeVisibility(false)
            }, 5000)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [codeIsVisible])

    return(
        <section className={Style["promo"]}>
            <div className="promo__description-block">
                <h2 className={Style["promo__title"]}>Твой промо-код</h2>
                <p className={Style["promo__description"]}>Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!</p>
                <button className={`button ${Style["promo__button"]}`} onClick={handleButtonClick}>
                    {codeIsVisible ? <span className={Style["promo-code"]}>WEBTEENS10</span> : `Получить код`}
                </button>
            </div>
            <img src="./images/promo-illustration.svg" alt="Собака" className={Style["promo__image"]} />
        </section>
    )
}
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { types } from "@/types";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { numbersAndColors } from "./numbers-and-colors";

export default function RouletteGame() {
  const [betAmount, setBetAmount] = useState(2);
  const [bets, setBets] = useState<z.infer<typeof types.rouletteBet>>({
    numbers: [],
    red: 0,
    black: 0,
    even: 0,
    odd: 0,
    firstHalf: 0,
    secondHalf: 0,
    firstDozen: 0,
    secondDozen: 0,
    thirdDozen: 0,
    firstColumn: 0,
    secondColumn: 0,
    thirdColumn: 0,
    firstAndSecondDozen: 0,
    secondAndThirdDozen: 0,
    firstAndSecondColumn: 0,
    secondAndThirdColumn: 0,
    onHorseBack: [],
    sixains: [],
    transversales: [],
    squares: [],
  });

  useEffect(() => {
    console.log(bets);
  }, [bets]);

  const retrieveCoins = (amount: number) => {
    return amount;
  };

  function OnHorseBackButton(props: { numbersInHorseBack: number[]; top: string; left: string }) {
    return (
      <div
        onClick={() => {
          if (bets.onHorseBack.find((horseBack) => JSON.stringify(horseBack.numbers) === JSON.stringify(props.numbersInHorseBack))) {
            const newBets = { ...bets };
            newBets.onHorseBack = bets.onHorseBack
              .map((horseBack) => {
                if (JSON.stringify(horseBack.numbers) === JSON.stringify(props.numbersInHorseBack)) {
                  horseBack.bet += retrieveCoins(betAmount);
                }
                return horseBack;
              })
              .filter((horseBack) => horseBack.bet > 0);
            setBets(newBets);
            return;
          }
          setBets((c) => ({
            ...c,
            onHorseBack: [...c.onHorseBack, { numbers: props.numbersInHorseBack, bet: betAmount }].filter((horseBack) => horseBack.bet > 0),
          }));
        }}
        className="absolute h-7 w-7 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:bg-accent-foreground/30 z-10"
        style={{
          top: props.top,
          left: props.left,
        }}
      >
        {bets.onHorseBack.find((onHorseBack) => JSON.stringify(onHorseBack.numbers) === JSON.stringify(props.numbersInHorseBack)) && (
          <span className="absolute right-1 text-xs bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
            {bets.onHorseBack.find((onHorseBack) => JSON.stringify(onHorseBack.numbers) === JSON.stringify(props.numbersInHorseBack))?.bet}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-[608px] mx-auto">
      <div className="flex flex-col gap-2">
        <Label htmlFor="betAmount">Mise</Label>
        <div className="flex items-center gap-2">
          <Input className="max-w-20" id="betAmount" type="number" value={betAmount || ""} onChange={(e) => setBetAmount(parseInt(e.target.value))} />
          <Coins />
        </div>
        <p className="text-muted-foreground text-xs">Saisissez une mise négative pour retirer vos mises sur le plateau</p>
      </div>
      <div className="flex justify-center text-white select-none font-head">
        <div className="grid grid-cols-[11rem,1fr,11rem]">
          <div className="max-w-44 grid grid-rows-[1fr,1fr,1fr,4rem] bg-white p-1 pr-0 gap-1 text-xl font-bold cursor-default text-center">
            <div
              className="bg-green-800 flex items-center justify-center group relative"
              onClick={() => {
                setBets((c) => ({ ...c, firstHalf: Math.max(c.firstHalf + retrieveCoins(betAmount), 0) }));
              }}
            >
              PASSE
              <br />
              (19 à 36)
              <div
                className={`absolute bottom-5 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                  bets.firstHalf <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                }`}
              >
                {bets.firstHalf > 0 && (
                  <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.firstHalf}</span>
                )}
              </div>
            </div>
            <div
              className="bg-green-800 flex items-center justify-center group relative"
              onClick={() => {
                setBets((c) => ({ ...c, even: Math.max(c.even + retrieveCoins(betAmount), 0) }));
              }}
            >
              PAIR
              <div
                className={`absolute bottom-5 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                  bets.even <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                }`}
              >
                {bets.even > 0 && (
                  <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.even}</span>
                )}
              </div>
            </div>
            <div
              className="bg-green-800 flex items-center justify-center group relative"
              onClick={() => {
                setBets((c) => ({ ...c, black: Math.max(c.black + retrieveCoins(betAmount), 0) }));
              }}
            >
              <div className="bg-black h-14 w-14 rounded-full"></div>
              <div
                className={`absolute bottom-5 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                  bets.black <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                }`}
              >
                {bets.black > 0 && (
                  <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.black}</span>
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-[1fr,1fr,1fr] gap-1 bg-white *:flex *:items-center *:justify-center relative">
              <div
                className="relative group bg-green-800"
                onClick={() => {
                  setBets((c) => ({ ...c, firstDozen: Math.max(c.firstDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                12
                <br />P
                <div
                  className={`absolute left-1/2 -translate-x-1/2 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.firstDozen <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.firstDozen > 0 && (
                    <span className="bg-white border text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                      {bets.firstDozen}
                    </span>
                  )}
                </div>
              </div>
              <div
                className="relative group bg-green-800"
                onClick={() => {
                  setBets((c) => ({ ...c, secondDozen: Math.max(c.secondDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                12
                <br />M
                <div
                  className={`absolute left-1/2 -translate-x-1/2 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.secondDozen <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.secondDozen > 0 && (
                    <span className="bg-white border text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                      {bets.secondDozen}
                    </span>
                  )}
                </div>
              </div>
              <div
                className="relative group bg-green-800"
                onClick={() => {
                  setBets((c) => ({ ...c, thirdDozen: Math.max(c.thirdDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                12
                <br />D
                <div
                  className={`absolute left-1/2 -translate-x-1/2 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.thirdDozen <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.thirdDozen > 0 && (
                    <span className="bg-white border text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                      {bets.thirdDozen}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`absolute left-1/3 top-[calc(50%-2px)] -translate-y-1/2 -translate-x-1/2 min-w-7 h-7 rounded-full z-30 ${
                  bets.firstAndSecondDozen <= 0 ? "hover:bg-accent-foreground/30" : ""
                }`}
                onClick={() => {
                  setBets((c) => ({ ...c, firstAndSecondDozen: Math.max(c.firstAndSecondDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                {bets.firstAndSecondDozen > 0 && (
                  <span className="bg-white text-xs text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                    {bets.firstAndSecondDozen}
                  </span>
                )}
              </div>
              <div
                className={`absolute left-2/3 top-[calc(50%-2px)] -translate-y-1/2 -translate-x-1/2 min-w-7 h-7 rounded-full z-30 ${
                  bets.secondAndThirdDozen <= 0 ? "hover:bg-accent-foreground/30" : ""
                }`}
                onClick={() => {
                  setBets((c) => ({ ...c, secondAndThirdDozen: Math.max(c.secondAndThirdDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                {bets.secondAndThirdDozen > 0 && (
                  <span className="bg-white text-xs text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                    {bets.secondAndThirdDozen}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-3 bg-white gap-1 p-1 relative">
              {numbersAndColors.map((numberAndColor) => (
                <div
                  key={numberAndColor.number}
                  className={
                    (numberAndColor.color === "red" ? "bg-red-800" : "bg-black") +
                    " h-10 w-20 flex items-center justify-center relative cursor-default group z-10"
                  }
                  onClick={() => {
                    if (bets.numbers.find((n) => n.number === numberAndColor.number)) {
                      const newBets = { ...bets };
                      newBets.numbers = bets.numbers
                        .map((number) => {
                          if (number.number === numberAndColor.number) {
                            number.bet += retrieveCoins(betAmount);
                          }
                          return number;
                        })
                        .filter((number) => number.bet > 0);
                      setBets(newBets);
                      return;
                    }
                    setBets((c) => ({
                      ...c,
                      numbers: [...c.numbers, { number: numberAndColor.number, bet: retrieveCoins(betAmount) }].filter((number) => number.bet > 0),
                    }));
                  }}
                >
                  {numberAndColor.number}
                  <div
                    className={`absolute right-0 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                      !bets.numbers.find((n) => n.number === numberAndColor.number) ? "group-hover:bg-accent-foreground/30" : ""
                    }`}
                  >
                    {bets.numbers.find((n) => n.number === numberAndColor.number) && (
                      <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                        {bets.numbers.find((n) => n.number === numberAndColor.number)?.bet}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div className="absolute top-5 bottom-5 left-20 right-20 mx-[6px] my-[4px]">
                {Array.from({ length: 24 }).map((_, i) => {
                  const numbersInHorseBack = (() => {
                    const row = Math.floor(i / 2);
                    const col = i % 2;

                    const topLeftNumberInHorseBack = 1 + row * 3 + col;
                    return [topLeftNumberInHorseBack, topLeftNumberInHorseBack + 1];
                  })();

                  return (
                    <OnHorseBackButton
                      key={i}
                      numbersInHorseBack={numbersInHorseBack}
                      left={`${i % 2 === 0 ? 0 : 100}%`}
                      top={`${i % 2 === 0 ? (i / 2 / 11) * 100 : ((i - 1) / 2 / 11) * 100}%`}
                    />
                  );
                })}
              </div>
              <div className="absolute top-10 bottom-10 left-10 right-10 mx-[4px] my-[6px]">
                {Array.from({ length: 33 }).map((_, i) => {
                  const numbersInHorseBack = (() => {
                    const row = Math.floor(i / 3);
                    const col = i % 3;

                    const topLeftNumberInHorseBack = 1 + row * 3 + col;
                    return [topLeftNumberInHorseBack, topLeftNumberInHorseBack + 3];
                  })();

                  return (
                    <OnHorseBackButton
                      key={i}
                      numbersInHorseBack={numbersInHorseBack}
                      left={`${((i % 3) / 2) * 100}%`}
                      top={`${((Math.round((i - 1) / 3) * 3) / 3 / 10) * 100}%`}
                    />
                  );
                })}
              </div>
              <div className="absolute top-5 bottom-5 -right-5 w-10 my-[4px] mx-[2px]">
                {Array.from({ length: 12 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (bets.transversales.find((transversale) => transversale.line === i)) {
                          const newBets = { ...bets };
                          newBets.transversales = bets.transversales
                            .map((transversale) => {
                              if (transversale.line === i) {
                                transversale.bet += retrieveCoins(betAmount);
                              }
                              return transversale;
                            })
                            .filter((transversale) => transversale.bet > 0);
                          setBets(newBets);
                          return;
                        }
                        setBets((c) => ({
                          ...c,
                          transversales: [...c.transversales, { line: i, bet: retrieveCoins(betAmount) }].filter(
                            (transversale) => transversale.bet > 0
                          ),
                        }));
                      }}
                      className="absolute h-7 w-7 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:bg-accent-foreground/30 z-10 left-1/2"
                      style={{
                        top: `${(i / 11) * 100}%`,
                      }}
                    >
                      {bets.transversales.find((transversale) => transversale.line === i) && (
                        <span className="absolute right-1 text-xs bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                          {bets.transversales.find((transversale) => transversale.line === i)?.bet}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-10 bottom-10 -right-5 w-10 my-[4px] mx-[2px]">
                {Array.from({ length: 11 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (bets.sixains.find((sicain) => sicain.startingLine === i)) {
                          const newBets = { ...bets };
                          newBets.sixains = bets.sixains
                            .map((sicain) => {
                              if (sicain.startingLine === i) {
                                sicain.bet += retrieveCoins(betAmount);
                              }
                              return sicain;
                            })
                            .filter((sicain) => sicain.bet > 0);
                          setBets(newBets);
                          return;
                        }
                        setBets((c) => ({
                          ...c,
                          sixains: [...c.sixains, { startingLine: i, bet: retrieveCoins(betAmount) }].filter((sixain) => sixain.bet > 0),
                        }));
                      }}
                      className="absolute h-7 w-7 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:bg-accent-foreground/30 z-10 left-1/2"
                      style={{
                        top: `${(i / 10) * 100}%`,
                      }}
                    >
                      {bets.sixains.find((sixain) => sixain.startingLine === i) && (
                        <span className="absolute right-1 text-xs bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                          {bets.sixains.find((sixain) => sixain.startingLine === i)?.bet}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-10 bottom-10 left-20 right-20 m-[6px]">
                {Array.from({ length: 22 }).map((_, i) => {
                  const numbersInSquare = (() => {
                    const row = Math.floor(i / 2);
                    const col = i % 2;

                    const topLeftNumberInSquare = 1 + row * 3 + col;
                    return [topLeftNumberInSquare, topLeftNumberInSquare + 1, topLeftNumberInSquare + 3, topLeftNumberInSquare + 4];
                  })();

                  return (
                    <div
                      key={i}
                      onClick={() => {
                        if (bets.squares.find((square) => JSON.stringify(square.numbers) === JSON.stringify(numbersInSquare))) {
                          const newBets = { ...bets };
                          newBets.squares = bets.squares
                            .map((square) => {
                              if (JSON.stringify(square.numbers) === JSON.stringify(numbersInSquare)) {
                                square.bet += retrieveCoins(betAmount);
                              }
                              return square;
                            })
                            .filter((square) => square.bet > 0);
                          setBets(newBets);
                          return;
                        }
                        setBets((c) => ({
                          ...c,
                          squares: [...c.squares, { numbers: numbersInSquare, bet: retrieveCoins(betAmount) }].filter((square) => square.bet > 0),
                        }));
                      }}
                      className="absolute h-7 w-7 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:bg-accent-foreground/30 z-10"
                      style={{
                        top: `${i % 2 === 0 ? (i / 2 / 10) * 100 : ((i - 1) / 2 / 10) * 100}%`,
                        left: `${i % 2 === 0 ? 0 : 100}%`,
                      }}
                    >
                      {bets.squares.find((square) => JSON.stringify(square.numbers) === JSON.stringify(numbersInSquare)) && (
                        <span className="absolute right-1 text-xs bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                          {bets.squares.find((square) => JSON.stringify(square.numbers) === JSON.stringify(numbersInSquare))?.bet}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-3 bg-white gap-1 p-1 pt-0 relative">
              <div
                onClick={() => {
                  setBets((c) => ({ ...c, firstColumn: Math.max(c.firstColumn + retrieveCoins(betAmount), 0) }));
                }}
                className="flex items-center justify-center group z-10 relative bg-green-800 h-16"
              >
                <div
                  className={`text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.firstColumn <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.firstColumn > 0 && (
                    <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.firstColumn}</span>
                  )}
                </div>
              </div>
              <div
                onClick={() => {
                  setBets((c) => ({ ...c, secondColumn: Math.max(c.secondColumn + retrieveCoins(betAmount), 0) }));
                }}
                className="flex items-center justify-center group z-10 relative bg-green-800 h-16"
              >
                <div
                  className={`text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.secondColumn <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.secondColumn > 0 && (
                    <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.secondColumn}</span>
                  )}
                </div>
              </div>
              <div
                onClick={() => {
                  setBets((c) => ({ ...c, thirdColumn: Math.max(c.thirdColumn + retrieveCoins(betAmount), 0) }));
                }}
                className="flex items-center justify-center group z-10 relative bg-green-800 h-16"
              >
                <div
                  className={`text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.thirdColumn <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.thirdColumn > 0 && (
                    <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.thirdColumn}</span>
                  )}
                </div>
              </div>
              <div
                className={`absolute left-1/3 top-[calc(50%-2px)] -translate-y-1/2 -translate-x-1/2 min-w-7 h-7 rounded-full flex items-center justify-center z-30 ${
                  bets.firstAndSecondColumn <= 0 ? "hover:bg-accent-foreground/30" : ""
                }`}
                onClick={() => {
                  setBets((c) => ({ ...c, firstAndSecondColumn: Math.max(c.firstAndSecondColumn + retrieveCoins(betAmount), 0) }));
                }}
              >
                {bets.firstAndSecondColumn > 0 && (
                  <span className="bg-white text-xs text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                    {bets.firstAndSecondColumn}
                  </span>
                )}
              </div>
              <div
                className={`absolute left-2/3 top-[calc(50%-2px)] -translate-y-1/2 -translate-x-1/2 min-w-7 h-7 rounded-full flex items-center justify-center z-30 ${
                  bets.secondAndThirdColumn <= 0 ? "hover:bg-accent-foreground/30" : ""
                }`}
                onClick={() => {
                  setBets((c) => ({ ...c, secondAndThirdColumn: Math.max(c.secondAndThirdColumn + retrieveCoins(betAmount), 0) }));
                }}
              >
                {bets.secondAndThirdColumn > 0 && (
                  <span className="bg-white text-xs text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                    {bets.secondAndThirdColumn}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="max-w-44 grid grid-rows-[1fr,1fr,1fr,4rem] bg-white p-1 pl-0 gap-1 text-xl font-bold cursor-default text-center">
            <div
              className="bg-green-800 flex items-center justify-center group relative"
              onClick={() => {
                setBets((c) => ({ ...c, secondHalf: Math.max(c.secondHalf + retrieveCoins(betAmount), 0) }));
              }}
            >
              MANQUE
              <br />
              (1 à 18)
              <div
                className={`absolute bottom-5 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                  bets.secondHalf <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                }`}
              >
                {bets.secondHalf > 0 && (
                  <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.secondHalf}</span>
                )}
              </div>
            </div>
            <div
              className="bg-green-800 flex items-center justify-center group relative"
              onClick={() => {
                setBets((c) => ({ ...c, odd: Math.max(c.odd + retrieveCoins(betAmount), 0) }));
              }}
            >
              IMPAIR
              <div
                className={`absolute bottom-5 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                  bets.odd <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                }`}
              >
                {bets.odd > 0 && (
                  <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.odd}</span>
                )}
              </div>
            </div>
            <div
              className="bg-green-800 flex items-center justify-center group relative"
              onClick={() => {
                setBets((c) => ({ ...c, red: Math.max(c.red + retrieveCoins(betAmount), 0) }));
              }}
            >
              <div className="bg-red-800 h-14 w-14 rounded-full"></div>
              <div
                className={`absolute bottom-5 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                  bets.red <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                }`}
              >
                {bets.red > 0 && (
                  <span className="bg-white text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">{bets.red}</span>
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-[1fr,1fr,1fr] gap-1 bg-white *:flex *:items-center *:justify-center relative">
              <div
                className="relative group bg-green-800"
                onClick={() => {
                  setBets((c) => ({ ...c, thirdDozen: Math.max(c.thirdDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                12
                <br />D
                <div
                  className={`absolute left-1/2 -translate-x-1/2 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.thirdDozen <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.thirdDozen > 0 && (
                    <span className="bg-white border text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                      {bets.thirdDozen}
                    </span>
                  )}
                </div>
              </div>
              <div
                className="relative group bg-green-800"
                onClick={() => {
                  setBets((c) => ({ ...c, secondDozen: Math.max(c.secondDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                12
                <br />M
                <div
                  className={`absolute left-1/2 -translate-x-1/2 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.secondDozen <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.secondDozen > 0 && (
                    <span className="bg-white border text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                      {bets.secondDozen}
                    </span>
                  )}
                </div>
              </div>
              <div
                className="relative group bg-green-800"
                onClick={() => {
                  setBets((c) => ({ ...c, firstDozen: Math.max(c.firstDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                12
                <br />P
                <div
                  className={`absolute left-1/2 -translate-x-1/2 text-xs min-w-7 h-7 rounded-full flex items-center justify-center ${
                    bets.firstDozen <= 0 ? "group-hover:bg-accent-foreground/30" : ""
                  }`}
                >
                  {bets.firstDozen > 0 && (
                    <span className="bg-white border text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                      {bets.firstDozen}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`absolute left-1/3 top-[calc(50%-2px)] -translate-y-1/2 -translate-x-1/2 min-w-7 h-7 rounded-full z-30 ${
                  bets.secondAndThirdDozen <= 0 ? "hover:bg-accent-foreground/30" : ""
                }`}
                onClick={() => {
                  setBets((c) => ({ ...c, secondAndThirdDozen: Math.max(c.secondAndThirdDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                {bets.secondAndThirdDozen > 0 && (
                  <span className="bg-white text-xs text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                    {bets.secondAndThirdDozen}
                  </span>
                )}
              </div>
              <div
                className={`absolute left-2/3 top-[calc(50%-2px)] -translate-y-1/2 -translate-x-1/2 min-w-7 h-7 rounded-full z-30 ${
                  bets.firstAndSecondDozen <= 0 ? "hover:bg-accent-foreground/30" : ""
                }`}
                onClick={() => {
                  setBets((c) => ({ ...c, firstAndSecondDozen: Math.max(c.firstAndSecondDozen + retrieveCoins(betAmount), 0) }));
                }}
              >
                {bets.firstAndSecondDozen > 0 && (
                  <span className="bg-white text-xs text-black rounded-full min-w-5 px-1 h-5 flex items-center justify-center">
                    {bets.firstAndSecondDozen}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

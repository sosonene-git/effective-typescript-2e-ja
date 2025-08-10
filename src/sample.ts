// TypeScriptのサンプルコード

export type TState = {
  name: string;
  capital: string;
};

export interface IState {
  name: string;
  capital: string;
}

const wyoming: TState = {
  name: 'Wyoming',
  capital: 'Cheyenne',
};

console.log(wyoming);

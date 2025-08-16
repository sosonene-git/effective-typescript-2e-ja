// # 項目43  可能なかぎり狭いスコープで`any`型を使う

/**
 * ## 覚えておくべきこと
 * 1. **`any`型のスコープを狭くする**
 *    - `any`型を広いスコープで使うと、型安全性が損なわれ、バグの原因になる
 *    - 使うとしても、必要な箇所だけで一時的に使うようにすること！
 *
 * 2. **関数から`any`型を返さない**
 *    - `any`型を返すと、その関数を呼び出すコード全体で型チェックが効かなくなってしまう
 *    - 型安全性を保つため、具体的な型を返すようにすること！
 *
 * 3. **オブジェクト全体ではなくプロパティに限定する**
 *    - 大きなオブジェクト全体に`as any`を使うのではなく、必要なプロパティだけに適用すること。
 *    - 他のプロパティの型チェックを無効にしないため
 *
 * 4. **そもそも`any`型を使わないようにする**
 *    - `any`型は型チェックを無効化するため、基本的には避けること
 *    - どうしても必要な場合にのみ、最終手段として使うこと
 */

type Pizza = {
    name: string;
    toppings: string[];
};

type Salad = {
    name: string;
    ingredients: string[];
};

declare function getPizza(): Pizza;
function eatSalad(salad: Salad) { /* ... */ }

function eatDinner() {
    const pizza = getPizza();
    eatSalad(pizza);
    //       ~~~~~
    // Argument of type 'Pizza' is not assignable to parameter of type 'Salad'
    // 型 'Pizza' の引数を型 'Salad' のパラメーターに割り当てることはできません
    pizza.slice();
}

// NGな例
function eatDinner1() {
    // 広いスコープで、any型を使用することになってしまう
    // これにより、コードの他の部分で型安全性が損なわれる

    const pizza: any = getPizza();  // これをやらないこと
    eatSalad(pizza);  // OK
    pizza.slice();  // この呼び出しはチェックされず、エラーにならない
}

// OKな例
// any型が関数の引数として渡されroute１つの式にスコープされ、この引数やこの行以外の場所には何の影響もないから
function eatDinner2() {
    const pizza = getPizza();
    // ここでのany型はこの行の式にのみ影響する
    // よって、他のコードには影響しない
    eatSalad(pizza as any);  // こちらのほうが好ましい
    pizza.slice();  // 安全な呼び出し。エラーになる。
}

type Config = {
    a: number;
    b: number;
    c: {
        key: string;
    };
};

const config1: Config = {
    a: 1,
    b: 2,
    c: {
        key: value
        // ~~~ Property ... missing in type 'Bar' but required in type 'Foo'
        //     プロパティ ... は型 'Bar' にありませんが、型 'Foo' では必須です。
    }
};

// NGな例
const config2: Config = {
    a: 1,
    b: 2,
    c: {
        key: value
    }
} as any;  // これをやらないこと！これは他のプロパティの型チェックを無効にしてしまう


// OKな例
const config3: Config = {
    a: 1,
    b: 2,  // これらのプロパティは依然としてチェックされる
    c: {
        key: value as any
    }
};
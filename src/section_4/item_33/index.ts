// # 項目33  `null`値を型の外側に押しやる
// このセクションで要するに言いたいことは、要するに、型の中には null を含めてないようにして、処理の中にnullに対するガード説を作成しようねって理解


/**
 * 
 * min の初期化ミス
 * if (!min) では、min が 0 の場合もfalse になる
 *
 * 型の曖昧さ
 * let min, max; は型が明確でなく、undefined や any が混ざる可能性がある
 *
 * 空の入力に対応していない
 * 空の Iterable を渡すと、結果が [undefined, undefined] になる
 *
 */
function extent(nums: Iterable<number>) {
    let min, max;
    for (const num of nums) {
        if (!min) {
            min = num;
            max = num;
        } else {
            min = Math.min(min, num);
            max = Math.max(max, num);
            // ここでエラーが発生する
            //型 'number | undefined' の引数を型 'number' のパラメーターに割り当てることはできません。
            //型 'undefined' を型 'number' に割り当てることはできません。
        }
    }
    return [min, max];
}

// const [min, max] = extent([0, 1, 2]);
// const span = max - min;
// ここでエラーが発生する
//'max' は 'undefined' の可能性があります。ts(18048)

// 改善
function extent_(nums: Iterable<number>): [number, number] | undefined {
    // 初期値を明確に設定
    // 明示的にnullを指定している
    // よって、minMaxが未定義の状態や肩の曖昧さを避けることができる
    let minMax: [number, number] | null = null;

    for (const num of nums) {
        if (minMax === null) {
            minMax = [num, num];
        } else {
            const [oldMin, oldMax]: [number, number] = minMax;
            minMax = [Math.min(num, oldMin), Math.max(num, oldMax)];
        }
    }

    // 空の入力に対応
    return minMax ?? undefined; // またはエラーをスローする
}

// このコードは、`null` を型の外側に押しやることで、型の一貫性と安全性を向上させている。
// 補足；ちなみに、「null を型の外側に押しやる」というのは、null をそのまま型に含めるのではなく、コードの中でしっかり処理して、最終的には null を使わないようにすることを意味する。

// 1. 初期値として `null` を使用:
//    - `minMax` を初期状態で `null` に設定し、未初期化の曖昧さを排除。
//    - 初回ループで `null` をチェックし、適切に初期化。
//
// 2. 戻り値で `null` を型から排除:
//    - 最終的に `null` を `undefined` に変換することで、戻り値の型を `[number, number] | undefined` に統一。
//    - これにより、利用者は `null` を特別扱いする必要がなくなる。
//
// 3. TypeScript の慣習に従う:
//    - `undefined` を「値が存在しない」ことを表す標準的な方法として使用。
//    - これにより、他のコードやライブラリとの互換性が向上。
//
// このアプローチにより、コードの可読性と安全性が向上し、長期的なメンテナンスが容易になる。


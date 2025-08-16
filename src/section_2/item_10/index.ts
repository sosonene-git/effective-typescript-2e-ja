// # 項目10  ラッパーオブジェクト型（`String`、`Number`、`Boolean`、`Symbol`、`BigInt`）を使用しない

/**
 * ## 覚えておくべきこと
 * 1. **ラッパーオブジェクト型を使用しない**
 *    - `String`ではなく`string`、`Number`ではなく`number`、`Boolean`ではなく`boolean`、`Symbol`ではなく`symbol`、`BigInt`ではなく`bigint`を使う。
 *    - ラッパーオブジェクト型は型の違いによるエラーやパフォーマンス低下を引き起こす可能性がある。
 *
 * 2. **プリミティブ型で十分**
 *    - プリミティブ型でもメソッドを使うときに自動的にラッパーオブジェクトが生成されるため、明示的にラッパーオブジェクトを使う必要はない。
 *    - 例: `"hello".toUpperCase()` は問題なく動作する。
 *
 * 3. **例外的に`Symbol`と`BigInt`はラッパーオブジェクト型を使用する場合がある**
 *    - ただし、これも必要最小限に留める。
 */

function getStringLen(foo: String) {
    return foo.length;
}

getStringLen("hello");  // OK
getStringLen(new String("hello"));  // OK

function isGreeting(phrase: String) {
    return ['hello', 'good day'].includes(phrase);
    //                                    ~~~~~~
    // Argument of type 'String' is not assignable to parameter of type 'string'.
    // 'string' is a primitive, but 'String' is a wrapper object.
    // Prefer using 'string' when possible.
    // 型 'String' の引数を型 'string' のパラメーターに割り当てることはできません。
    // 'string' はプリミティブですが、'String' はラッパー オブジェクトです。
    // できれば 'string' をご使用ください。
}

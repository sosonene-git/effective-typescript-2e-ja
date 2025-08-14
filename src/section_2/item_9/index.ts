// 項目9  型アノテーションを型アサーションより優先的に使用する
// 型アサーションは、プログラマーの意図を優先してその型をTypeScriptに伝える

/**
 * 覚えておくべきことメモ
 *  型アノテーション(:Type)を型アサーション(as)より優先的に使用する
srtting * 型について、」TODOでが知らない情報をプログラマーが知っている場合にのみ型アサーションと非nullアサーションを使用する
 * 型アサーションウィ使用する場合は、コメントでなぜそれが適切なのかを説明する
 */


interface Person { name: string };

const alice: Person = { name: 'Alice' };
//    ^? const alice: Person
const bob = { name: 'Bob' } as Person;
//    ^? const bob: Person


const emily: Person = {};
//    ~~~~~ Property 'name' is missing in type '{}' but required in type 'Person'
//          プロパティ 'name' は型 '{}' にありませんが、型 'Person' では必須です。
const maika = {} as Person;  // エラーなし!!



const alice: Person = {
    name: 'Alice',
    occupation: 'TypeScript developer'
    // ~~~~~~~~~ Object literal may only specify known properties,
    //           and 'occupation' does not exist in type 'Person'
    //           オブジェクト リテラルは既知のプロパティのみ指定できます。
    //           'occupation' は型 'Person' に存在しません。
};

const Takeshi = {
    name: 'Bob',
    occupation: 'JavaScript developer'
} as Person;  // エラーなし


const people_a = ['alice', 'bob', 'jan'].map(name => ({ name }));
// Person[]であってほしいが、{ name: string; }[]と推論される


const people_b = ['alice', 'bob', 'jan'].map(
    name => ({ name } as Person)
); // 型がPerson[]になる


const people_c = ['alice', 'bob', 'jan'].map(name => {
    const person: Person = { name };
    return person
});

const people_d: Person[] = ['alice', 'bob', 'jan'].map(name => ({ name })); // OK

// 型アサーションを使用できるケース
// TypeScriptは、アプリのDOMにアクセスできない。
// #myButtonが、button要素であることをTypeScriptに伝えるために型アサーションを使用できる

// 型アサーションを使用するときは、なぜ型アサーションにしているのかをコメントで残すと良い
document.querySelector('#myButton')?.addEventListener('click', e => {
    e.currentTarget
    // ^? (property) Event.currentTarget: EventTarget | null
    // #myButtonのcurrentTargetはbutton要素である
    const button = e.currentTarget as HTMLButtonElement;
    //    ^? const button: HTMLButtonElement
});

//
const elNull = document.getElementById('foo');
//    ^? const elNull: HTMLElement | null
const el_a = document.getElementById('foo') as HTMLElement;
//    ^? const el: HTMLElement


// 非nullアサーション演算子を使用する
// 設備時に! を使用することで、TypeScriptにこの値がnullではないことを伝える
const el_b = document.getElementById('foo')!;
//    ^? const el: HTMLElement

interface Person { name: string; }
const body = document.body;
const el_c = body as Person;
//         ~~~~~~~~~~~~~~
// Conversion of type 'HTMLElement' to type 'Person' may be a mistake because
// neither type sufficiently overlaps with the other. If this was intentional,
// convert the expression to 'unknown' first.
// 型 'HTMLElement' から型 'Person' への変換は、互いに十分に重複できないため間違っている
// 可能性があります。意図的にそうする場合は、まず式を 'unknown' に変換してください。

const e_d = document.body as unknown as Person;  // OK

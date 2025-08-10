// 項目32  `null`や`undefined`を型エイリアスに含めない

// ダメな例
// type User = { id: string; name: string; } | null;

//次のコードでオプショナルは必要か？
// function getCommentsForUser(comments: readonly Comment[], user: User) {
//     return comments.filter(comment => comment.userId === user?.id);
// }

// 良い例
// 何らかの理由で、`null`や`undefined`を含める必要がある場合は、曖昧さのない名前にする
type NullableUser = { id: string; name: string; } | undefined;

// nullを含むNGな型
type BirthdayMap = {
    [name: string]: Date | undefined;
} | null;

const birthdays: BirthdayMap = {
    "太郎": new Date("1990-01-01"),
    "ボブ": undefined,
    "チャーリー": new Date("1992-02-02"),
    "花子": new Date("1995-05-05")
};

// 例）2月生まれの人を取得する関数
function getFebruaryBorn(birthdays: BirthdayMap) {
    // BirthdayMapがnullを許容する場合、エラーになる。{}が必要になる。
    return Object.entries(birthdays || {}).filter(([name, date]) => {
        return date && date.getMonth() === 1; // 2月は0から始まるので1
    });
}
const februaryBorn = getFebruaryBorn(birthdays);
console.log(februaryBorn);
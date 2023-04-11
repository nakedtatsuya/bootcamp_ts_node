// ---------- 型の定義 ----------

// Q1: 変数 a の定義のしかたを修正して型エラーを直してください
// ヒント: const の使い方を調べてみましょう

// ここを変更する
//#if ANSWER
let a: number = 1;
// ここがエラーにならないようにする
a++;

// Q2: 変数 c の定義を修正して型エラーを直してください
const b: number = 2;

// ここの型を修正する
//#if ANSWER
const c: number = b;

// Q3: 変数 d の定義を修正して型エラーを直してください

// ここの型を修正する
//#if ANSWER
const d: "hello" = "hello";

// ここがエラーにならないようにする
const e: "hello" = d;

// ---------- 型推論 (Type Inference) ----------

// Q4: 変数 g の定義を修正して型エラーを直してください
const f = 1;

//#if ANSWER
const g: number = f;

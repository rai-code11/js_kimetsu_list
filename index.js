// キャラクター取得
async function getCharacters(value) {
  const response = await fetch(
    `https://ihatov08.github.io/kimetsu_api/api/${value}.json`,
  );
  const data = await response.json();
  renderCharacters(data);
}

// DOM操作
function renderCharacters(list) {
  const container = document.querySelector("#characterRows");
  container.textContent = "";

  // キャラを表示させるために箱を配列の数作成する
  for (const c of list) {
    const row = document.createElement("div");
    row.classList.add("row");

    // 名前の枠
    const nameCell = document.createElement("div");
    nameCell.classList.add("cell");

    // 名前
    nameCell.textContent = c.name;

    // 画像の枠
    const imgCell = document.createElement("div");
    imgCell.classList.add("imgcell");

    //画像
    const img = document.createElement("img");
    img.classList.add("thumb");
    //値がない場合に落ちないようにNull演算子を利用する
    //画像が相対パスで保存されていたためURLを組み立て絶対パスを指定
    const base = "https://ihatov08.github.io";
    img.src = new URL(c.image, base).href;
    img.alt = c.name ?? "";
    imgCell.appendChild(img);

    //カテゴリーの枠
    const categoryCell = document.createElement("div");
    categoryCell.classList.add("categorycell");

    // カテゴリー
    categoryCell.textContent = c.category;

    row.append(nameCell, imgCell, categoryCell);
    container.appendChild(row);
  }
}

//name属性によって表示するデータを切り替える
const menu = document.querySelector("#categoryMenu");
const load = document.querySelector("#loading");

const showLoading = () => load.classList.remove("loaded");
const hideLoading = () => load.classList.add("loaded");

menu.addEventListener("change", async (e) => {
  //category以外を取得しないため
  if (e.target.name !== "category") return;

  const category = e.target.value;

  try {
    showLoading();
    await getCharacters(category);

    // 1秒待ってから出す
    await new Promise((r) => setTimeout(r, 1000));
  } finally {
    hideLoading();
  }
});

getCharacters("all");

function check() {
  //postをクラス名に持つ要素を取得できる(この時すべてのpost要素を取得しているため定数はpostsにしてある)
  const posts = document.querySelectorAll(".post");
  //複数要素を取得しているためforEachメソッドで要素一つずつに対して処理を行う
  posts.forEach( (post) =>{
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () =>{
      //属性値(メモのid)を取得することができる
      const postId = post.getAttribute("data-id");
      //オブジェクト生成
      const XHR = new XMLHttpRequest();
      //リクエスト内容を指定する記述
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンスの形式を指定する記述
      XHR.responseType = "json";
      //リクエストを送信する記述
      XHR.send();
      //レスポンス受診が成功した場合に呼び出すための記述
      XHR.onload = () => {
        //受診が失敗した場合の処理
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          //javascriptの処理から抜け出す
          return null;
        }
        const item = XHR.response.post;
        //既読であれあばtrueをセット
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
          //未読であれば属性ごと削除
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
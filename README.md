# kadai04_dev21_08_naoyaohzawa

dev21_kadai03_naoyaohzawa_08 API

①課題内容（どんな作品か） (JS2 - メモ帳アプリ)：シンガポールからフライト情報

②工夫した点・こだわった点 ・
航空機の出発、到着がrealtimeで表示されるAPIを利用。Realtimeのフライトを１つpick upしその日の行き先を決めてくれるアプリ。
行き先のairport名を取得したら、OpenWeather APIを利用して、その場所のRealtimeな天気を表示するようにした。
またSingapore空港の出発便をリストで表示できるようにして、空港の搭乗ボードを再現してみた。
行き先の場所の画像をunsplashから自動で検索してhtmlに表示することで、行き先の風景を表示。（ただし、unsplashに保存されている画像の中から、検索ワードでランダムに画像が表示されるので、たまに関係ない画像が表示されてしまうが。。）

金額的な問題で飛行機のrealtime APIは検索できる数に限りがあった。もし自分でサービスを開始して情報が多く撮れる場合、APIでmonetizeするのも面白いなと思った。

本当はrealtimeの飛行機の位置をmapに表示したかったが、緯度、経度を取得するにはもっと高価なsubscriptionを利用しないといけないので、断念。また本当は船の位置を取得したかったが、個人利用が認められておらず、会社としか利用できなかった。

fetchの使い方が概ねわかった。JSONの中身を取得するのに相当手こずったが、配列がオブジェクト型なのか、配列型で保存されているかよく理解できた。

CSSもなんだかんだだいぶ時間がかかったが、flexなど一通り基本的なことがよく理解できた気がする。

課題関係なくYoutubeで見つけた外人のアプリ制作動画をみているだけでも色々なcoding方法があり面白い。そして、知らないcodeが沢山あり、何か打ちのめされた気分になる。

③質問・疑問（あれば） ・
特になし。

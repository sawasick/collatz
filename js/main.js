//実行ボタン
$('#js-run').on('click', function () {
	//コラッツ予想を実行
	const $input_val = $('#js-input').val();
	let progress;
	let times = 0; //試行を繰り返した回数
	let str_insert = '';

	//入力値が数値かチェック
	if (!isNaN($input_val)) {
		//正の数かチェック
		if ($input_val >= 1) {
			//整数かチェック
			if ($input_val.indexOf('.') === -1) {
				//BigInt型に変換
				progress = BigInt($input_val);
				//すでにエラー文があった場合は、それを削除してから
				$('.js-error').remove();
				//コラッツ操作を繰り返していく
				do {
					if (progress % 2n === 0n) {
						//偶数なら
						progress /= 2n;
					} else {
						//奇数なら
						progress *= 3n;
						progress += 1n;
					}
					times++;
					str_insert += `<p class="progress disp--none">${progress}</p>`;
				} while (progress != 1n);
				//結果をhtmlに要素として追加
				$('#js-result-wrapper').prepend(
					`<div class="js-result">
			    <p>
				    <span class="text-large text-highlight">${$input_val}</span>の実行結果 : 試行回数<span
					    class="text-large text-highlight">${times}</span>回
			    </p>
          <p class="js-more more">計算過程を表示v</p>
          <p class="js-more more disp--none">計算過程を非表示^</p>
          ${str_insert}
          <p>ーーーーーーーーーーーーー</p>
		      </div>`
				);
				//テキストエリアのvalueを削除
				$('#js-input').val('');
			} else {
				messageError();
			}
		} else {
			messageError();
		}
	} else {
		messageError();
	}
});

//結果履歴削除ボタン
$('#js-delete').on('click', function () {
	$('.js-result').remove();
});

//乱数生成ボタン
$('#js-random').on('click', function () {
	const rand = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1) + 1);
	$('#js-input').val(rand);
});

//計算過程の表示切り替え
//バブリング
$('body').on('click', '.js-more', function () {
	const $parent = $(this).parent();
	$($parent).children('.progress').toggleClass('disp--none');
	$($parent).children('.js-more').toggleClass('disp--none');
});
//<span>progress</span>がラッパーの幅を超えた場合のレイアウト調整
//テキストエリアの自動リサイズ
$(function () {
	$('textarea.auto-resize').on('change keyup keydown paste cut', function () {
		if ($(this).outerHeight() > this.scrollHeight) {
			$(this).height(28);
		}
		while ($(this).outerHeight() < this.scrollHeight) {
			$(this).height($(this).height() + 28);
		}
	});
});

//入力された値が正しくなかった場合のエラ〜メッセージ
function messageError() {
	//数字を赤くしてエラー文
	//すでにエラー文があった場合は、それを削除してから
	$('.js-error').remove();
	$('#js-form').after(
		'<p class="js-error error-message">正しい値を入力してください</p>'
	);
}

function myFunction(){
  //指定のドキュメントから指定のマッチをとりだし，同名のspreadsheetに書き出す
  var docId = "someidpattern";

  // 学籍番号マッチ
  var regExIn = /(\d\d\d).?(.)(\d\d\d\d)/g;
  var regExOut = "$1-$2$3";
  copyDoc(docId, regExIn, regExOut);
}

function copyDoc( DocId, regExIn, regExOut ) {

  // 処理対象ファイルからテキストの抜き出し
  var docOp = DocumentApp.openById(DocId);
  var docText = docOp.getBody().getText();

  var docFolders = DriveApp.getFileById(DocId).getParents();
  FolderId = docFolders.next().getId();
  
  // 書き出し用Spreadsheetの用意
  var SpId = SpreadsheetApp.create(docOp.getName()).getId();
  var SpFi = DriveApp.getFileById(SpId);
  var CuFo = DriveApp.getFolderById(FolderId);
  CuFo.addFile(SpFi); //フォルダの移動
  var SpSh = SpreadsheetApp.openById(SpId).getActiveSheet();
  
  // マッチした文字のリプレイスとSpreadsheetへの書き込み
  var cell ="";
  var docMatches = docText.match(regExIn);
  for (i = 0 ; i < docMatches.length ; i++ ){
    cell = docMatches[i].replace(regExIn,regExOut).toUpperCase();
    SpSh.getRange(i+1,1).setValue(cell);
    //newtext = newtext + cell + "\n";
  }
  //Logger.log(newtext);
}
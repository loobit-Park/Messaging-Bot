const scriptName="test.js";

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
    DataBase.setDataBase("MealforHome","찌개");
    DataBase.setDataBase("MealforHome","특식");
    DataBase.setDataBase("MealforHome","밑반찬");
    DataBase.setDataBase("MealforHome","덮/볶음밥");
    DataBase.setDataBase("MealforHome","간식");
    DataBase.setDataBase("MealforHome","국");
    DataBase.setDataBase("MealforHome","야식/술안주");
    DataBase.setDataBase("MealforHome","면");

    DataBase.setDataBase("MealByMaterial","식이조절");
    DataBase.setDataBase("MealByMaterial","초스피드");
    DataBase.setDataBase("MealByMaterial","해장");
    DataBase.setDataBase("MealByMaterial","간식/야식");
    DataBase.setDataBase("MealByMaterial","도시락");
    DataBase.setDataBase("MealByMaterial","영양식");
    DataBase.setDataBase("MealByMaterial","브런치");


    DataBase.setDataBase("DB_test", "테스트 1");
    DataBase.setDataBase("DB_test2", "테스트 2");
    replier.reply(DataBase.getDataBase("DB_test"));
    replier.reply(DataBase.getDataBase("DB_test2"));
} // 함수 종료

function onStartCompile(){
    /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     *제안하는 용도: 리로드시 자동 백업*/
    
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState,activity) {
    var layout=new android.widget.LinearLayout(activity);
    layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var txt=new android.widget.TextView(activity);
    txt.setText("액티비티 사용 예시입니다.");
    layout.addView(txt);
    activity.setContentView(layout);
}
function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
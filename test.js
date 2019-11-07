const scriptName = "test.js";

var preChat = null;
var preChat_delay = 10;
var preChat_flag = false;
var preChat_flag2 = false;

var main_com_list = ["운영진", "안내", "공지"];
const com_list = Array(
    Array("운영진", "목록", "추가", "삭제"),
    Array("공지"),
    Array("안내")
);

var getDB = DataBase.getDataBase("op_list");

var op_list;

if (getDB === "") {
    op_list = ["엘또/남"];
} else {
    op_list = getDB.split(",");
}
//var op_list = ["어미새 / 남", "추노꾼/남", "뺌/남", "홍냥/여", "엘또/남"];
var op_com_list = ["목록", "추가", "해제"];

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {

//    if(preChat == msg) {
    if (preChat_flag === true && preChat_flag2 === true) {
        return;
    }
    preChat = msg;
    preChat_flag = true;

    // 채팅방 필터
    if (room === "Korea EDM Festival" || room === "Test") {

        /*
        if(msg.indexOf("봇") != -1 || msg.indexOf("안내님") != -1 ) {

            // 봇 or 안내양 이라는 단어와 정체 가 함께 들어가있을 경우
            if(msg.indexOf("정체") != -1) {
                var num = getRandom(3);
                if(num <= 1)
                    replier.reply("안내님이요? 제가 아는 봇중에 최고였어요.");
            }

            // 봇 or 안내양 이라는 단어만 들어가있을 경우
            else {
                var num = getRandom(8);
                if(num <= 1)
                    replier.reply("저 부르셨어요?");
                else if(num <= 2)
                    replier.reply("귀찮게..키알 자제좀요");
            }
        } else if(msg === "야") {
            var num = getRandom(4);
            if(num <= 1)
                replier.reply("네? 저요?");
        } else if(msg.indexOf("개웃기네") != -1 || msg.indexOf("개웃기넼") != -1) {
            var num = getRandom(3);
            if(num <= 1)
                replier.reply("그러게요 ㅋㅋㅋ 개웃기네");
        } else if(msg.indexOf("소주") != -1) {
            var num = getRandom(5);
            if(num <= 1)
                replier.reply("소주얘기 하니까 소주 마시고 싶네..");
        } else if(msg.indexOf("술파티") != -1) {
            var num = getRandom(5);
            if(num <= 1)
                replier.reply("술파티 조하♥");
        }
        */

        // 운영진 목록에 있는지 확인
        if (op_list.indexOf(sender) !== -1) {
            
            ////////// 도움말 호출
            if (msg === "/?" || msg === "/명령어" || msg === "/help") {
                command_explain(replier);
            }
            //////////// 올바른 포맷의 명령어일 경우
            else if (msg.indexOf("/") === 0) {

                ////////////////// // 공지
                if (msg === "/공지") {
                    replier.reply("❣️공지 필독❣️닉네임양식 (닉네임/성별)\n\n" +
                        "👉닉네임양식대로 안할시 강퇴\n" +
                        "👉미성년자 참여 강퇴\n" +
                        "👉현금거래 금지(이득을 취하는 것)\n" +
                        "👉티켓 양도/거래 책임은 본인의 몫\n" +
                        "👉홍보는 강퇴\n" +
                        "👉상대지목성 욕설은 강퇴(싸움 or 트러블 발생 시)\n" +
                        "👉말 곱게 안써도 강퇴\n" +
                        "    (친분도 없는데 하면 사람들 빡친다)\n" +
                        "👉파벌형성이나 파벌유도시 강퇴\n" +
                        "👉개인간 트러블은 당사자들끼리 해결 할 것\n" +
                        "    (3자 개입하여 문제발생시 강퇴)\n" +
                        "👉7일간 생존투표를 진행하여 투표 미참여자 강퇴\n" +
                        "    (인싸,존버,눈팅 세개 아무거나 선택하면됨)");
                    preChat_flag2 = true;
                } // 공지 main_com 끝
                else if(msg === "/정보") {
                    replier.reply("10월 30일 처음 구동된 KEF 전용 봇입니다.\n" +
                        "모델명 : " + Device.getPhoneBrand() + " " + Device.getPhoneModel() + "\n" +
                        "안드로이드 버전 : " + Device.getAndroidVersionName() + "\n" +
                        "현재 배터리 온도 : " + Device.getBatteryTemperature() + "\n" +
                        "충전 상태 : " + Device.isCharging() + "\n" +
                        "헌재 배터리 상태 : " + Device.getBatteryLevel() + "\n"
                    )
                } // 정체 main_com 끝
                else if(msg === "/호출") {
                    replier.reply("어미새/남", "호출 테스트입니다.");
                    replier.reply("추노꾼/남", "호출 테스트입니다.");
                    replier.reply("엘또/남", "호출 테스트입니다.");
                    replier.reply("뺌/남", "호출 테스트입니다.");
                    replier.reply("홍냥/여", "호출 테스트입니다.");
                }
                else if (msg.indexOf("-") > -1) {
                    var main_com = msg.split("-")[0].substring(1);  // - 앞부분을 자르고 /을 제거
                    var sub_com = msg.split("-")[1].split(" ")[0]; // - 뒷부분에서 공백 앞까지 만 자르고
//                     var input_value = msg.split("-")[1].split(" ")[1];

                    var value_arr = msg.split("-")[1].split(" ");
                    var value_arr2 = value_arr.splice(0, 1);
                    var input_value = value_arr.join(" ");

                    //////// main_com 이 들어있는지 확인
                    if (main_com_list.indexOf(main_com) !== -1) {

                        /////////////// // 안내
                        if (main_com === "안내") {
                            if (sub_com === "외국인") {
                                replier.reply("한국인을 위한 페스티벌 방이므로\n한국어를 사용하지 못한다면\n이 방에서 활동하실 수가 없습니다.\n----------------------------------\n" +
                                    "This GroupChat is For People\nWho Can Speak Korean.\n\nIf You Can't Speak Korean,\n" +
                                    "You Can't Hang out Here.\n\nI'm Sorry, But Plz Leave This Chat");
                                preChat_flag2 = true;
                            } else {
                                command_error(replier);
                            }
                        } // 안내 main_com 끝


                        ////////////////// // 운영진 CRUD
                        else if (main_com === "운영진") {
                            if (sub_com === "목록") {
                                replier.reply(op_list.join("\n"));
                            } else if (sub_com === "추가") {
                                op_list.push(input_value);
                                DataBase.setDataBase("op_list", op_list);
                                replier.reply(input_value + " 님이 운영진으로 추가되었습니다.");
                            } else if (sub_com === "제거") {
                                op_list.splice(op_list.indexOf(input_value), 1);
                                DataBase.setDataBase("op_list", op_list);
                                replier.reply(input_value + " 님이 운영진 목록에서 제거 되었습니다.");
                            } else {
                                command_error(replier);
                            }
                        } // 운영진 main_com 끝


                        /////////////////// main_com 이 잘못됬을경우
                    } else {
                        command_error(replier);
                    }

                } else {
                    command_error(replier);
                }

            } // command인지
        } // 운영진인지

    } // KEF방인지, /가 있는지

    java.lang.Thread.sleep(preChat_delay * 1000);
    preChat = null;
    preChat_flag = false;
    preChat_flag2 = false;
} // 함수 종료

function getDate() {
    var d = new Date();
    var currentDate = d.getFullYear() + "년 " + (d.getMonth() + 1) + "월 " + d.getDay() + "일";
    var currentTime = d.getHours() + "시 " + d.getMinutes() "분 " + d.getSeconds() + "초";
    return currentDate + " " + currentTime;
}


function getRandom(percent) {
    var random = Math.floor(Math.random() * percent) + 1;
    Log.info(random);
    
    return random;
}

function command_error(replier) {
    replier.reply("없는 명령어입니다.[] 는 변수입니다.\n명령어 목록 :\n" +
        "운영진\n" +
        "-목록\n" +
        "-추가 [닉네임]\n" +
        "-제거 [닉네임]\n" +
        "안내\n" +
        "-외국인\n" +
        "공지\n\n" +
        "예시:\n" +
        "/운영진-목록\n" +
        "/운영진-추가 엘또/남"
    );
}

function command_explain(replier) {
    replier.reply("명령어 안내창입니다. .[] 는 변수입니다.\n명령어 목록 :\n" +
        "운영진\n" +
        "   -목록\n" +
        "   -추가 [닉네임]\n" +
        "   -제거 [닉네임]\n" +
        "안내\n" +
        "   -외국인\n" +
        "공지\n\n" +
        "예시:\n" +
        "/운영진-목록\n" +
        "/운영진-추가 엘또/남"
    );
}

function onStartCompile() {
    /*컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     *제안하는 용도: 리로드시 자동 백업*/
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.
function onCreate(savedInstanceState, activity) {
    var layout = new android.widget.LinearLayout(activity);
    layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var txt = new android.widget.TextView(activity);
    txt.setText("액티비티 사용 예시입니다.");
    layout.addView(txt);
    activity.setContentView(layout);
}

function onResume(activity) {
}

function onPause(activity) {
}

function onStop(activity) {
}